import { Routes, Route, useNavigate } from 'react-router-dom';
import Home from './pages/Home';
import SimplePage from './pages/SimplePage';
import DoublePage from './pages/DoublePage';

function App() {
  const navigate = useNavigate();

  return (
    <div>
      <header>
        <h1>Challenge - 07</h1>
        <div style={{ marginBottom: '1rem' }}>
          <button onClick={() => navigate('/')}>Inicio</button>
          <button onClick={() => navigate('/simple')}>Lista Simple</button>
          <button onClick={() => navigate('/double')}>Lista Doble</button>
        </div>
      </header>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/simple" element={<SimplePage />} />
        <Route path="/double" element={<DoublePage />} />
      </Routes>
    </div>
  );
}

export default App;