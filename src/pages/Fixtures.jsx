import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { getFixtures } from '../services/api';

const Fixtures = () => {
  const [fixtures, setFixtures] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFixtures = async () => {
      try {
        const res = await getFixtures();
        setFixtures(res.data);
      } catch (err) {
        console.error('Err:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchFixtures();
  }, []);

  // Group by round
  const rounds = fixtures.reduce((acc, fix) => {
    const roundName = fix.round;
    if (!acc[roundName]) acc[roundName] = { round: roundName, matches: [] };
    acc[roundName].matches.push(fix);
    return acc;
  }, {});

  const displayRounds = Object.values(rounds).length > 0 ? Object.values(rounds) : [
    { round: 'PENDING FIXTURES', matches: [] }
  ];

  return (
    <div className="fixtures-page">
      <header className="page-header">
        <h1 className="navy">Games <span className="red">Fixtures</span></h1>
        <p>Tournament Brackets and Knockout Schedules</p>
      </header>

      <div className="filters glass">
        <select className="sport-select">
          <option>CHOOSE SPORT</option>
          <option>FOOTBALL</option>
          <option>CRICKET</option>
          <option>VOLLEYBALL</option>
          <option>BADMINTON</option>
        </select>
      </div>

      {loading ? (
        <div className="loading">Loading Fixtures...</div>
      ) : (
        <div className="bracket-container">
          {displayRounds.map((round, idx) => (
            <div key={idx} className="round">
              <h3 className="round-header">{round.round}</h3>
              <div className="matches">
                {round.matches.length > 0 ? (
                  round.matches.map(match => (
                    <motion.div
                      key={match._id}
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="match-card glass"
                    >
                      <div className="team">
                        <span className="team-name">{match.teamA}</span>
                        <span className="score">{match.scoreA}</span>
                      </div>
                      <div className="vs">VS</div>
                      <div className="team">
                        <span className="team-name">{match.teamB}</span>
                        <span className="score">{match.scoreB}</span>
                      </div>
                      <div className={`match-status ${match.status?.toLowerCase()}`}>
                        {match.status}
                      </div>
                    </motion.div>
                  ))
                ) : (
                  <p className="no-matches">No matches scheduled for this round.</p>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      <style>{`
        .fixtures-page {
          max-width: 1200px;
          margin: 0 auto;
          padding: 2rem 1rem;
        }
        .page-header { text-align: center; margin-bottom: 3rem; }
        .navy { color: var(--poster-blue); }
        .red { color: var(--poster-red); }
        
        .filters {
          padding: 1.5rem;
          margin-bottom: 3rem;
          display: flex;
          justify-content: center;
        }
        .sport-select {
          padding: 10px 20px;
          border: 1px solid #ddd;
          border-radius: 4px;
          font-weight: 700;
          font-family: var(--font-display);
        }

        .bracket-container {
          display: flex;
          gap: 4rem;
          overflow-x: auto;
          padding: 2rem 0;
        }
        .round {
          min-width: 300px;
        }
        .round-header {
          text-align: center;
          background: var(--poster-blue);
          color: white;
          padding: 10px;
          border-radius: 4px;
          margin-bottom: 2rem;
          font-size: 0.9rem;
          text-transform: uppercase;
        }
        .matches {
          display: flex;
          flex-direction: column;
          gap: 2rem;
        }
        .match-card {
          padding: 1.5rem;
          position: relative;
          background: #fff;
          border-left: 5px solid var(--poster-red);
        }
        .team {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin: 0.5rem 0;
        }
        .team-name { font-weight: 700; color: #333; }
        .score { 
          background: #f5f5f5; 
          padding: 4px 10px; 
          border-radius: 4px; 
          font-weight: 800;
          min-width: 35px;
          text-align: center;
        }
        .vs {
          text-align: center;
          font-size: 0.7rem;
          color: #999;
          font-weight: 900;
          margin: 10px 0;
        }
        .match-status {
          font-size: 0.7rem;
          text-transform: uppercase;
          font-weight: 800;
          margin-top: 1rem;
          text-align: right;
        }
        .match-status.completed { color: #4caf50; }
        .match-status.upcoming { color: var(--poster-blue); }
        .loading, .no-matches { text-align: center; color: #666; margin-top: 2rem; }

        @media (max-width: 768px) {
          .bracket-container { flex-direction: column; }
        }
      `}</style>
    </div>
  );
};

export default Fixtures;
