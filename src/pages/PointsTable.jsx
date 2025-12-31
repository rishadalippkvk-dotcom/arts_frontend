import React from 'react';
import { motion } from 'framer-motion';
import { getPoints } from '../services/api';

const PointsTable = () => {
  const [pointsData, setPointsData] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const fetchPoints = async () => {
      try {
        const res = await getPoints();
        setPointsData(res.data);
      } catch (err) {
        console.error('Failed to fetch points:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchPoints();
  }, []);

  return (
    <div className="points-page">
      <header className="page-header">
        <h1>Points <span className="accent">Table</span></h1>
        <p>Real-time department rankings and medal counts</p>
      </header>

      {loading ? (
        <div className="loading">Loading Rankings...</div>
      ) : (
        <div className="table-container glass">
          <table className="points-table">
            <thead>
              <tr>
                <th>Rank</th>
                <th>Department</th>
                <th>Gold</th>
                <th>Silver</th>
                <th>Bronze</th>
                <th>Total Points</th>
              </tr>
            </thead>
            <tbody>
              {pointsData.map((dept, index) => (
                <motion.tr
                  key={dept.department}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <td><span className={`rank-number ${index < 3 ? 'top' : ''}`}>{dept.rank}</span></td>
                  <td>{dept.department}</td>
                  <td><div className="medal gold">{dept.gold}</div></td>
                  <td><div className="medal silver">{dept.silver}</div></td>
                  <td><div className="medal bronze">{dept.bronze}</div></td>
                  <td><span className="total-points">{dept.total}</span></td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <style>{`
        .points-page {
          max-width: 1000px;
          margin: 0 auto;
        }
        .loading {
          text-align: center;
          padding: 3rem;
          font-size: 1.2rem;
          color: var(--text-secondary);
        }
        .table-container {
          padding: 2rem;
          margin-top: 2rem;
        }
        .points-table {
          width: 100%;
          border-collapse: collapse;
        }
        .points-table th {
          text-align: left;
          padding: 1.5rem;
          color: var(--text-secondary);
          border-bottom: 2px solid var(--glass-border);
        }
        .points-table td {
          padding: 1.5rem;
          border-bottom: 1px solid var(--glass-border);
        }
        .rank-number {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background: var(--glass-border);
          font-weight: 700;
        }
        .rank-number.top {
          background: var(--accent-color);
          color: var(--bg-color);
          box-shadow: 0 0 15px var(--accent-glow);
        }
        .medal {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 32px;
          height: 32px;
          border-radius: 50%;
          font-weight: 700;
          font-size: 0.9rem;
          color: white;
        }
        .gold { background: #FFD700; color: #000; }
        .silver { background: #C0C0C0; color: #000; }
        .bronze { background: #CD7F32; color: #000; }
        .total-points {
          font-weight: 800;
          font-size: 1.25rem;
          color: var(--accent-color);
        }
      `}</style>
    </div>
  );
};

export default PointsTable;
