import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './spaces/root/pages/Home';
import About from './spaces/root/pages/About';
import Portfolio from './spaces/root/pages/Portfolio';
import Spaces from './spaces/root/pages/Spaces';
import IslamSpace from './spaces/islam/IslamSpace';
import DiscordSpace from './spaces/discord/DiscordSpace';
import styles from './App.module.css';

function App() {
  return (
    <Router>
      <div className={styles.app}>
        <main className={styles.main}>
          <Routes>
            {/* Root Space Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/portfolio" element={<Portfolio />} />
            <Route path="/spaces" element={<Spaces />} />
            
            {/* Other Spaces */}
            <Route path="/islam/*" element={<IslamSpace />} />
            <Route path="/discord/*" element={<DiscordSpace />} />

          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;