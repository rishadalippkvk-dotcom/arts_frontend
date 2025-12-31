import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import Schedule from './pages/Schedule';
import PointsTable from './pages/PointsTable';
import Admin from './pages/Admin';
import Fixtures from './pages/Fixtures';

function App() {
  return (
    <Router>
      <div className="app-container">
        <nav className="navbar glass">
          <div className="nav-logo">
            <span className="red">ANNUAL</span> SPORTS & GAMES
          </div>
          <div className="nav-links">
            <Link to="/">Home</Link>
            <Link to="/schedule">Schedule</Link>
            <Link to="/fixtures">Fixtures</Link>
            <Link to="/points">Points Table</Link>
            <Link to="/admin" className="admin-link">Admin</Link>
          </div>
        </nav>

        <main className="content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/schedule" element={<Schedule />} />
            <Route path="/fixtures" element={<Fixtures />} />
            <Route path="/points" element={<PointsTable />} />
            <Route path="/admin" element={<Admin />} />
          </Routes>
        </main>
      </div>

      <style>{`
        .app-container {
          min-height: 100vh;
          max-width: 1400px;
          margin: 0 auto;
          background: #fff;
        }
        .navbar {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1.5rem 2rem;
          border-bottom: 1px solid #eee;
          background: #fff;
          position: sticky;
          top: 0;
          z-index: 100;
        }
        .nav-logo {
          font-family: var(--font-display);
          font-weight: 800;
          font-size: 1.25rem;
          letter-spacing: 1px;
          color: var(--poster-blue);
        }
        .red { color: var(--poster-red); }
        
        .nav-links {
          display: flex;
          gap: 2rem;
          align-items: center;
        }
        .nav-links a {
          color: #666;
          text-decoration: none;
          font-weight: 700;
          text-transform: uppercase;
          font-size: 0.9rem;
          transition: var(--transition);
        }
        .nav-links a:hover {
          color: var(--poster-red);
        }
        .admin-link {
          padding: 8px 18px;
          border-radius: 4px;
          border: 1px solid var(--poster-blue);
          color: var(--poster-blue) !important;
        }
        .admin-link:hover {
          background: var(--poster-blue);
          color: white !important;
        }
        .content {
            padding: 0;
        }
      `}</style>
    </Router>
  );
}

export default App;
