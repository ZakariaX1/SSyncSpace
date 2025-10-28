import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import DiscordNav from './components/DiscordNav';

function DiscordSpace() {
  return (
    <div>
      <DiscordNav />
      <Routes>
        <Route index element={<Home />} />
      </Routes>
    </div>
  );
}

export default DiscordSpace;