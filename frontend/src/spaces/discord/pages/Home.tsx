import { discordApi } from '../../../utils/api/discord';
import { useEffect, useState } from 'react';

function Home() {
  // Welcome the user first, if logged in, else just say hello to the guest
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    async function fetchProfile() {
      const profile = await discordApi.getProfile();
      setUser(profile);
    }
    fetchProfile();
  }, []);

  return (
    <div>
      <h2 style={{ color: 'var(--color-space-discord)' }}>Welcome to the Discord Space</h2>
      {user ? (
        <p>Hello, {user.globalName}!</p>
      ) : (
        <p>Hello, guest! You can browse the guilds and all their public information!</p>
      )}
      <p>This space should help you manage your discord Guild internal affairs like events</p>

      {user ? (
        <>
          {/* This is where the user's information will show up at a glance */}
          <div>Guilds you're in:</div>
          <div>Events you're Hosting:</div>
          <div>Events you're Co-Hosting:</div>
        </>
      ) : (
        <p>If you would like to see more, make sure to log in so that we can show you relevant information and data</p>
      )}
    </div>
  );
}

export default Home;