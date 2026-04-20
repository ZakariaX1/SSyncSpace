import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import IslamNav from './components/IslamNav';

function IslamSpace() {
  return (
    <div>
      <IslamNav />
      <Routes>
        <Route index element={<Home />} />
      </Routes>
    </div>
  );
}

export default IslamSpace;