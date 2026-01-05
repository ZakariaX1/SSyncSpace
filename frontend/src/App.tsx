import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useMemo } from 'react';
import IslamSpace from './spaces/islam/IslamSpace';
import DiscordSpace from './spaces/discord/DiscordSpace';
import styles from './App.module.css';
import RootSpace from './spaces/root/RootSpace';

function App() {
  // Detect subdomain and determine which space to render
  // NOTE: Very hacky way of splitting subdomains, but for now as a small app it's fine,
  //   but in the future will use a reverse proxy which should also look nicer in the code.
  const currentSpace = useMemo(() => {
    const rootHost = import.meta.env.VITE_ROOT_WEBURL ?? window.location.host;
    const rootHostname = rootHost.split(':')[0]; // e.g., "localhost" from "localhost:5173"
    const currentHostname = window.location.hostname;
    
    // Check if we're on a subdomain
    if (currentHostname !== rootHostname && currentHostname.endsWith(`.${rootHostname}`)) {
      const subdomain = currentHostname.slice(0, currentHostname.length - rootHostname.length - 1);
      return subdomain;
    }
    
    return 'root'; // Default to root space
  }, []);

  // Render the appropriate space based on subdomain
  if (currentSpace === 'islam') {
    return (
      <Router>
        <div className={styles.app}>
          <main className={styles.main}>
            <IslamSpace />
          </main>
        </div>
      </Router>
    );
  }

  if (currentSpace === 'discord' || currentSpace === 'discordtools') {
    return (
      <Router>
        <div className={styles.app}>
          <main className={styles.main}>
            <DiscordSpace />
          </main>
        </div>
      </Router>
    );
  }

  // Root space (default)
  return (
    <Router>
      <div className={styles.app}>
        <main className={styles.main}>
          <Routes>            
            {/* Fallback path-based routing for development */}
            <Route path="/islam/*" element={<IslamSpace />} />
            <Route path="/discord/*" element={<DiscordSpace />} />

            {/* Root Space Routes */}
            <Route path="/*" element={<RootSpace />} />

          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;