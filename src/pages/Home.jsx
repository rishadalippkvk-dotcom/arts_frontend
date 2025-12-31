import React from 'react';
import { motion } from 'framer-motion';

const Home = () => {
  return (
    <div className="home">
      <section className="hero">
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="sub-header"
        >
          EVORIC Student's Union 2025–26
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="main-title"
        >
          <span className="red">ANNUAL</span><br />
          SPORTS & GAMES<br />
          <span className="navy">MEET 2025-26</span>
        </motion.h1>

        <div className="cta-group">
          <button className="btn-primary">View Schedule</button>
          <button className="btn-outline">Tournament Rules</button>
        </div>
      </section>

      <section className="college-footer glass">
        <div className="logos">
          <div className="logo-item">
            <span className="logo-text">EVORIC</span>
          </div>
          <div className="divider"></div>
          <div className="logo-item">
            <span className="logo-text">DUXFORD</span>
            <small>COLLEGE FOR ADVANCED STUDIES</small>
          </div>
        </div>
        <div className="contact">
          <p>Duxford College for Advanced Studies</p>
          <p>+91 4931 214 400 | +91 92 35 400 800</p>
        </div>
      </section>

      <style>{`
        .home {
            padding-bottom: 2rem;
            display: flex;
            flex-direction: column;
            align-items: center;
            background: #fff;
            min-height: 80vh;
        }
        .hero {
            text-align: center;
            padding: 6rem 0;
            max-width: 900px;
        }
        .sub-header {
            font-weight: 700;
            color: #333;
            letter-spacing: 1px;
            margin-bottom: 1rem;
            font-size: 1.2rem;
        }
        .main-title {
            font-size: 5rem;
            line-height: 1;
            margin-bottom: 3rem;
        }
        .red { color: var(--poster-red); }
        .navy { color: var(--poster-blue); }
        
        .cta-group {
            display: flex;
            gap: 1.5rem;
            justify-content: center;
        }
        .btn-outline {
            background: transparent;
            padding: 12px 28px;
            border: 2px solid var(--poster-blue);
            color: var(--poster-blue);
            border-radius: 4px;
            font-weight: 700;
            cursor: pointer;
            transition: var(--transition);
        }
        .btn-outline:hover {
            background: var(--poster-blue);
            color: white;
        }

        .college-footer {
            margin-top: auto;
            width: 100%;
            padding: 2rem;
            display: flex;
            justify-content: space-between;
            align-items: center;
            background: #fdfdfd;
        }
        .logos {
            display: flex;
            align-items: center;
            gap: 2rem;
        }
        .logo-text {
            font-family: var(--font-display);
            font-weight: 800;
            font-size: 1.5rem;
            display: block;
        }
        .logo-item small {
            display: block;
            font-size: 0.7rem;
            color: #666;
        }
        .divider {
            width: 1px;
            height: 40px;
            background: #ddd;
        }
        .contact {
            text-align: right;
            font-size: 0.9rem;
            color: #666;
            font-weight: 500;
        }

        @media (max-width: 768px) {
            .main-title { font-size: 3rem; }
            .college-footer { flex-direction: column; gap: 2rem; text-align: center; }
            .contact { text-align: center; }
        }
      `}</style>
    </div>
  );
};

export default Home;
