import type { DiscordUserProfile } from '../types';
import { useUser } from "../context/UserContext";

function LoggedOut() {
  return (
    <div>Hello World</div>
  )
}

function LoggedIn({ user }: { user: DiscordUserProfile }) {
  return (
    <div>Hello {user.globalName}</div>
  )
}

function Home() {
  // Welcome the user first, if logged in, else just say hello to the guest
  // const [user, setUser] = useState<DiscordUserProfile | undefined>(undefined);
  
  // useEffect(() => {
  //   async function fetchProfile() {
  //     const profile = await discordApi.getProfile();
  //     setUser(profile);
  //   }
  //   fetchProfile();
  // }, []);

  const { user } = useUser();

  return (
    <div>
      <h2 style={{ color: 'var(--color-space-discord)' }}>Welcome to the Discord Space</h2>
      {user ?
      <LoggedIn user={user}/> :
      <LoggedOut/>}
    </div>
  );
}

export default Home;