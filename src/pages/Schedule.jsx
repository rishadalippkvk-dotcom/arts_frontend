import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { getPrograms } from '../services/api';

const posterData = [
  { day: 'DAY 01', date: '06 JAN 2026', sport: 'VOLLEYBALL', color: 'var(--poster-blue)' },
  { day: 'DAY 02', date: '07 JAN 2026', sport: 'CRICKET, CHESS', color: 'var(--poster-yellow)' },
  { day: 'DAY 03', date: '08 JAN 2026', sport: 'BADMINTON', color: 'var(--poster-red)' },
  { day: 'DAY 04', date: '09 JAN 2026', sport: 'FOOTBALL', color: 'var(--poster-blue)' },
  { day: 'DAY 05', date: '12 JAN 2026', sport: 'DODGE BALL, ARM WRESTLING', color: 'var(--poster-teal)' },
  { day: 'FINALS', date: '14 JAN 2026', sport: 'ATHLETIC MEET', color: 'var(--poster-red)' },
];

const Schedule = () => {
  const [programs, setPrograms] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPrograms = async () => {
      try {
        const res = await getPrograms();
        if (res.data && res.data.length > 0) {
          setPrograms(res.data);
        }
      } catch (err) {
        console.error('Failed to fetch programs:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchPrograms();
  }, []);

  const displayData = programs.length > 0 ? programs : posterData;

  return (
    <div className="schedule-container">
      <div className="schedule-header">
        <h2 className="title-red">Sports & Games<br />Schedule</h2>
      </div>

      <div className="timeline-wrapper">
        <div className="v-line"></div>
        {displayData.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: index % 2 === 0 ? 50 : -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className={`timeline-node ${index % 2 === 0 ? 'right' : 'left'}`}
          >
            <div className="marker" style={{ borderColor: item.color }}></div>
            <div className="schedule-card-wrapper">
              <div className="schedule-card shadow-sm">
                <div
                  className="card-ribbon"
                  style={{
                    background: item.color,
                    textAlign: index % 2 === 0 ? 'left' : 'right'
                  }}
                >
                  {item.day}
                </div>
                <div className="card-content">
                  <p className="card-date">{item.date}</p>
                  <h3 className="card-sport">{item.sport}</h3>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="final-banner">
        <h2 className="red">14 - JAN - 2026</h2>
        <h1 className="navy">Athletic Meet</h1>
      </div>

      <style>{`
        .schedule-container {
            padding: 4rem 2rem;
            max-width: 1100px;
            margin: 0 auto;
            background: #fff;
            overflow-x: hidden;
        }
        .schedule-header {
            text-align: center;
            margin-bottom: 5rem;
        }
        .title-red {
            color: var(--poster-red);
            font-size: 3.5rem;
            line-height: 1.1;
            font-weight: 800;
        }
        
        .timeline-wrapper {
            position: relative;
            padding: 4rem 0;
        }
        .v-line {
            position: absolute;
            left: 50%;
            top: 0;
            bottom: 0;
            width: 3px;
            background: #e0e0e0;
            transform: translateX(-50%);
        }
        .timeline-node {
            display: flex;
            width: 100%;
            margin-bottom: 4rem;
            position: relative;
            align-items: center;
        }
        .timeline-node.right { justify-content: flex-end; padding-left: 50%; }
        .timeline-node.left { justify-content: flex-start; padding-right: 50%; }
        
        .marker {
            position: absolute;
            left: 50%;
            width: 20px;
            height: 20px;
            border: 4px solid;
            background: #fff;
            border-radius: 50%;
            z-index: 2;
            transform: translateX(-50%);
        }
        
        .schedule-card-wrapper {
            width: 100%;
            display: flex;
            justify-content: center;
            padding: 0 40px;
        }
        .timeline-node.left .schedule-card-wrapper { justify-content: flex-end; }
        .timeline-node.right .schedule-card-wrapper { justify-content: flex-start; }

        .schedule-card {
            width: 400px;
            background: #fff;
            border-radius: 12px;
            overflow: hidden;
            box-shadow: 0 10px 25px rgba(0,0,0,0.05);
            transition: transform 0.3s ease;
        }
        .schedule-card:hover { transform: translateY(-5px); }
        
        .card-ribbon {
            padding: 12px 24px;
            color: white;
            font-weight: 800;
            font-size: 1.1rem;
            font-family: var(--font-display);
            letter-spacing: 0.5px;
        }
        .card-content {
            padding: 2rem 1.5rem;
            text-align: center;
        }
        .card-date {
            color: #d32f2f;
            font-weight: 700;
            margin-bottom: 0.75rem;
            font-size: 0.9rem;
            letter-spacing: 1px;
        }
        .card-sport {
            font-size: 1.8rem;
            color: #2c3e50;
            font-weight: 800;
            line-height: 1.2;
        }

        .final-banner {
            text-align: center;
            margin-top: 6rem;
            padding: 4rem;
            border-top: 2px solid #f0f0f0;
        }
        .final-banner h2 { font-size: 3rem; margin-bottom: 1rem; color: var(--poster-red); }
        .final-banner h1 { font-size: 5rem; text-transform: uppercase; color: var(--poster-blue); font-weight: 900; }

        @media (max-width: 850px) {
            .v-line { left: 30px; transform: none; }
            .marker { left: 30px; transform: translateX(-50%); }
            .timeline-node.left, .timeline-node.right {
                justify-content: flex-start;
                padding-left: 60px;
                padding-right: 0;
            }
            .schedule-card-wrapper { padding: 0; justify-content: flex-start !important; }
            .schedule-card { width: 100%; max-width: 500px; }
            .final-banner h1 { font-size: 3rem; }
            .title-red { font-size: 2.5rem; }
        }
      `}</style>
    </div>
  );
};

export default Schedule;
