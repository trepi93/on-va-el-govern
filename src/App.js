import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import IndexPage from './pages/IndexPage';
import StatsPage from './pages/StatsPage';
import './styles/index.css';
import './styles/styles_index.css'; 
import './styles/styles_stats.css';
import ReactGA from 'react-ga4';
import usePageTracking from './usePageTracking'; // Importa el hook personalitzat

function App() {
  useEffect(() => {
    ReactGA.initialize('G-JXFT01DHQD'); // Substitueix 'G-XXXXXXXXXX' per l'ID de mesura de Google Analytics
  }, []);

  usePageTracking(); // Utilitza el hook per fer el seguiment de les pàgines

  return (
    <Router>
      <Routes>
        <Route path="/" element={<IndexPage />} />
        <Route path="/stats" element={<StatsPage />} />
      </Routes>
    </Router>
  );
}

export default App;
