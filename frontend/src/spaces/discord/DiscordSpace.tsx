import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Events from './pages/Events';
import DiscordNav from './components/DiscordNav';

function DiscordSpace() {
  return (
    <div>
      <DiscordNav />
      <Routes>
        <Route index element={<Home />} />
        <Route path="events" element={<Events />} />
      </Routes>
    </div>
  );
}

export default DiscordSpace;