import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Events from './pages/Events';
import Guilds from './pages/Guilds';
import Login from './pages/Login';
import OAUTH2Callback from './pages/OAUTH2Callback';
import Profile from './pages/Profile';
import DiscordNav from './components/DiscordNav';

function DiscordSpace() {
  return (
    <div>
      <DiscordNav />
      <Routes>
        <Route index element={<Home />} />
        <Route path="guilds/" element={<Guilds />} />
        <Route path="guilds/:guildId/events" element={<Events />} />
        <Route path="login/" element={<Login />} />
        <Route path="profile" element={<Profile />} />
        <Route path="auth/callback/" element={<OAUTH2Callback />} />

      </Routes>
    </div>
  );
}

export default DiscordSpace;