import React, {
  createContext,
  useContext,
  useEffect,
  useState
} from "react";

import type { DiscordUserProfile, UserContextValue } from "../types";
import { api } from "../../../utils/api";


const UserContext = createContext<UserContextValue | undefined>(undefined);

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<DiscordUserProfile | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  async function refreshUser() {
    try {
      const profile = await api.discord.getProfile();
      setUser(profile ?? null); // Incase undefined is returned, just set to null
      console.log(user)
      console.log(profile)
    } catch (error) {
      setUser(null);
    } finally {
      setLoading(false);
    }
  }

  function login(profile: DiscordUserProfile | null) {
    setUser(profile);
  }

  function logout() {
    setUser(null);
  }

  useEffect(() => {
    refreshUser();
  }, []);

  const value: UserContextValue = {
    user,
    loading,
    login,
    logout,
    refreshUser
  };

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser(): UserContextValue {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
}
