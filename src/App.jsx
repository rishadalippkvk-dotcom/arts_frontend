import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Menu, X as CloseIcon } from 'lucide-react';
import Home from './pages/Home';
import Schedule from './pages/Schedule';
import PointsTable from './pages/PointsTable';
import Admin from './pages/Admin';
import Fixtures from './pages/Fixtures';

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  return (
    <Router>
      <div className="app-container">
        <nav className="navbar glass">
          <div className="nav-logo">
            <span className="red">ANNUAL</span> SPORTS & GAMES
          </div>

          <button className="mobile-menu-btn" onClick={toggleMenu}>
            {isMenuOpen ? <CloseIcon size={24} /> : <Menu size={24} />}
          </button>

          <div className={`nav-links ${isMenuOpen ? 'open' : ''}`}>
            <Link to="/" onClick={closeMenu}>Home</Link>
            <Link to="/schedule" onClick={closeMenu}>Schedule</Link>
            <Link to="/fixtures" onClick={closeMenu}>Fixtures</Link>
            <Link to="/points" onClick={closeMenu}>Points Table</Link>
            <Link to="/admin" className="admin-link" onClick={closeMenu}>Admin</Link>
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
          padding: 1rem 2rem;
          border-bottom: 1px solid #eee;
          background: #fff;
          position: sticky;
          top: 0;
          z-index: 1000;
        }
        .nav-logo {
          font-family: var(--font-display);
          font-weight: 800;
          font-size: 1.25rem;
          letter-spacing: 1px;
          color: var(--poster-blue);
          z-index: 1001;
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

        .mobile-menu-btn {
          display: none;
          background: none;
          border: none;
          cursor: pointer;
          color: var(--poster-blue);
          z-index: 1001;
        }

        @media (max-width: 768px) {
          .navbar {
            padding: 1rem 1.5rem;
          }
          .mobile-menu-btn {
            display: block;
          }
          .nav-links {
            position: fixed;
            top: 0;
            right: -100%;
            height: 100vh;
            width: 80%;
            max-width: 300px;
            background: #fff;
            flex-direction: column;
            padding: 5rem 2rem;
            box-shadow: -5px 0 25px rgba(0,0,0,0.1);
            transition: right 0.3s ease;
          }
          .nav-links.open {
            right: 0;
          }
          .nav-links a {
            font-size: 1.1rem;
            width: 100%;
            text-align: center;
            padding: 1rem;
          }
          .admin-link {
            border: none;
            background: var(--poster-blue);
            color: white !important;
          }
        }
      `}</style>
    </Router>
  );
}

export default App;
