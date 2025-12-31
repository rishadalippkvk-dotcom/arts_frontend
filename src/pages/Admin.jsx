import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Plus, Edit2, Trash2, Save, X, Trophy } from 'lucide-react';
import { getPrograms, createProgram, deleteProgram, updateProgram, getFixtures, createFixture, updateFixture, deleteFixture, getPoints, createPoint, updatePoint, deletePoint } from '../services/api';

const Admin = () => {
  const [programs, setPrograms] = useState([]);
  const [fixtures, setFixtures] = useState([]);
  const [points, setPoints] = useState([]);
  const [view, setView] = useState('programs');
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);
  const [formData, setFormData] = useState({ day: '', date: '', sport: '', venue: '', category: 'Group', status: 'Upcoming' });
  const [fixtureData, setFixtureData] = useState({ sport: '', round: '', teamA: '', teamB: '', scoreA: '-', scoreB: '-', status: 'Upcoming' });
  const [pointData, setPointData] = useState({ department: '', gold: 0, silver: 0, bronze: 0, total: 0 });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [progRes, fixRes, pointRes] = await Promise.all([getPrograms(), getFixtures(), getPoints()]);
      setPrograms(progRes.data);
      setFixtures(fixRes.data);
      setPoints(pointRes.data);
    } catch (err) {
      console.error('Failed to fetch data:', err);
    }
  };

  const handleCreate = () => {
    setEditId(null);
    setIsEditing(true);
    setFormData({ day: '', date: '', sport: '', venue: '', category: 'Group', status: 'Upcoming' });
    setFixtureData({ sport: '', round: '', teamA: '', teamB: '', scoreA: '-', scoreB: '-', status: 'Upcoming' });
    setPointData({ department: '', gold: 0, silver: 0, bronze: 0, total: 0 });
  };

  const handleEdit = (item) => {
    setEditId(item._id);
    setIsEditing(true);
    if (view === 'programs') {
      setFormData({ day: item.day, date: item.date, sport: item.sport, venue: item.venue, category: item.category, status: item.status });
    } else if (view === 'fixtures') {
      setFixtureData({ sport: item.sport, round: item.round, teamA: item.teamA, teamB: item.teamB, scoreA: item.scoreA, scoreB: item.scoreB, status: item.status });
    } else {
      setPointData({ department: item.department, gold: item.gold, silver: item.silver, bronze: item.bronze, total: item.total });
    }
  };

  const handleSave = async () => {
    try {
      if (view === 'programs') {
        if (editId) {
          await updateProgram(editId, formData);
        } else {
          await createProgram(formData);
        }
      } else if (view === 'fixtures') {
        if (editId) {
          await updateFixture(editId, fixtureData);
        } else {
          await createFixture(fixtureData);
        }
      } else {
        const payload = { ...pointData, total: (pointData.gold * 10) + (pointData.silver * 5) + (pointData.bronze * 2) };
        if (editId) {
          await updatePoint(editId, payload);
        } else {
          await createPoint(payload);
        }
      }
      fetchData();
      setIsEditing(false);
      setEditId(null);
    } catch (err) {
      alert('Failed to save');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure?')) {
      if (view === 'programs') {
        await deleteProgram(id);
      } else if (view === 'fixtures') {
        await deleteFixture(id);
      } else {
        await deletePoint(id);
      }
      fetchData();
    }
  };

  return (
    <div className="admin-page">
      <header className="page-header glass">
        <h1 className="navy">Admin <span className="red">Dashboard</span></h1>
        <div className="admin-nav">
          <button onClick={() => setView('programs')} className={`tab ${view === 'programs' ? 'active' : ''}`}>Programs</button>
          <button onClick={() => setView('fixtures')} className={`tab ${view === 'fixtures' ? 'active' : ''}`}>Fixtures</button>
          <button onClick={() => setView('points')} className={`tab ${view === 'points' ? 'active' : ''}`}>Points Table</button>
        </div>
        <button onClick={handleCreate} className="btn-primary"><Plus size={18} /> New {view === 'programs' ? 'Entry' : view === 'fixtures' ? 'Match' : 'Department'}</button>
      </header>

      <div className="admin-content">
        {view === 'programs' && (
          <section className="program-management glass">
            <h2>Program List</h2>
            <div className="table-responsive">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Day</th>
                    <th>Date</th>
                    <th>Sport</th>
                    <th>Venue</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {programs.map(prog => (
                    <tr key={prog._id}>
                      <td data-label="Day"><span className="ribbon-mini">{prog.day}</span></td>
                      <td data-label="Date" className="date-cell">{prog.date}</td>
                      <td data-label="Sport" className="sport-cell">{prog.sport}</td>
                      <td data-label="Venue">{prog.venue}</td>
                      <td data-label="Actions">
                        <div className="actions">
                          <button className="icon-btn edit" onClick={() => handleEdit(prog)}><Edit2 size={16} /></button>
                          <button className="icon-btn delete" onClick={() => handleDelete(prog._id)}><Trash2 size={16} /></button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        )}

        {view === 'fixtures' && (
          <section className="fixture-management glass">
            <h2>Match Fixtures</h2>
            <div className="table-responsive">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Sport</th>
                    <th>Round</th>
                    <th>Match Up</th>
                    <th>Score</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {fixtures.map(fix => (
                    <tr key={fix._id}>
                      <td data-label="Sport" className="navy-cell">{fix.sport}</td>
                      <td data-label="Round">{fix.round}</td>
                      <td data-label="Match Up">{fix.teamA} VS {fix.teamB}</td>
                      <td data-label="Score" className="red-cell">{fix.scoreA} - {fix.scoreB}</td>
                      <td data-label="Actions">
                        <div className="actions">
                          <button className="icon-btn edit" onClick={() => handleEdit(fix)}><Edit2 size={16} /></button>
                          <button className="icon-btn delete" onClick={() => handleDelete(fix._id)}><Trash2 size={16} /></button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        )}

        {view === 'points' && (
          <section className="points-management glass">
            <h2>Department Rankings</h2>
            <div className="table-responsive">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Department</th>
                    <th>Gold</th>
                    <th>Silver</th>
                    <th>Bronze</th>
                    <th>Total</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {points.map(pt => (
                    <tr key={pt._id}>
                      <td data-label="Dept" className="sport-cell">{pt.department}</td>
                      <td data-label="Gold"><div className="ribbon-mini" style={{ background: '#FFD700', color: '#000' }}>{pt.gold}</div></td>
                      <td data-label="Silver"><div className="ribbon-mini" style={{ background: '#C0C0C0', color: '#000' }}>{pt.silver}</div></td>
                      <td data-label="Bronze"><div className="ribbon-mini" style={{ background: '#CD7F32', color: '#000' }}>{pt.bronze}</div></td>
                      <td data-label="Total" className="red-cell">{pt.total}</td>
                      <td data-label="Actions">
                        <div className="actions">
                          <button className="icon-btn edit" onClick={() => handleEdit(pt)}><Edit2 size={16} /></button>
                          <button className="icon-btn delete" onClick={() => handleDelete(pt._id)}><Trash2 size={16} /></button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        )}

        {isEditing && (
          <div className="modal-overlay">
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="modal glass">
              <h3 className="navy">{editId ? 'Edit' : 'Add New'} {view === 'programs' ? 'Program' : view === 'fixtures' ? 'Fixture' : 'Point'}</h3>

              {view === 'programs' && (
                <div className="form-grid">
                  <div className="form-group">
                    <label htmlFor="prog-day">Day (e.g., DAY 01)</label>
                    <input id="prog-day" name="day" type="text" value={formData.day} onChange={e => setFormData({ ...formData, day: e.target.value.toUpperCase() })} />
                  </div>
                  <div className="form-group">
                    <label htmlFor="prog-date">Date</label>
                    <input id="prog-date" name="date" type="text" placeholder="06 JAN 2026" value={formData.date} onChange={e => setFormData({ ...formData, date: e.target.value.toUpperCase() })} />
                  </div>
                  <div className="form-group">
                    <label htmlFor="prog-sport">Sport(s)</label>
                    <input id="prog-sport" name="sport" type="text" placeholder="VOLLEYBALL" value={formData.sport} onChange={e => setFormData({ ...formData, sport: e.target.value.toUpperCase() })} />
                  </div>
                  <div className="form-group">
                    <label htmlFor="prog-venue">Venue</label>
                    <input id="prog-venue" name="venue" type="text" placeholder="MAIN GROUND" value={formData.venue} onChange={e => setFormData({ ...formData, venue: e.target.value })} />
                  </div>
                  <div className="form-group">
                    <label htmlFor="prog-status">Status</label>
                    <select id="prog-status" value={formData.status} onChange={e => setFormData({ ...formData, status: e.target.value })}>
                      <option value="Upcoming">Upcoming</option>
                      <option value="Ongoing">Ongoing</option>
                      <option value="Completed">Completed</option>
                    </select>
                  </div>
                </div>
              )}

              {view === 'fixtures' && (
                <div className="form-grid">
                  <div className="form-group">
                    <label htmlFor="fix-sport">Sport</label>
                    <input id="fix-sport" name="sport" type="text" placeholder="FOOTBALL" value={fixtureData.sport} onChange={e => setFixtureData({ ...fixtureData, sport: e.target.value.toUpperCase() })} />
                  </div>
                  <div className="form-group">
                    <label htmlFor="fix-round">Round</label>
                    <input id="fix-round" name="round" type="text" placeholder="SEMI FINALS" value={fixtureData.round} onChange={e => setFixtureData({ ...fixtureData, round: e.target.value.toUpperCase() })} />
                  </div>
                  <div className="form-group">
                    <label htmlFor="fix-teamA">Team A</label>
                    <input id="fix-teamA" name="teamA" type="text" placeholder="MECHANICAL" value={fixtureData.teamA} onChange={e => setFixtureData({ ...fixtureData, teamA: e.target.value.toUpperCase() })} />
                  </div>
                  <div className="form-group">
                    <label htmlFor="fix-teamB">Team B</label>
                    <input id="fix-teamB" name="teamB" type="text" placeholder="CS" value={fixtureData.teamB} onChange={e => setFixtureData({ ...fixtureData, teamB: e.target.value.toUpperCase() })} />
                  </div>
                  <div className="form-group">
                    <label htmlFor="fix-scoreA">Score A</label>
                    <input id="fix-scoreA" type="text" value={fixtureData.scoreA} onChange={e => setFixtureData({ ...fixtureData, scoreA: e.target.value })} />
                  </div>
                  <div className="form-group">
                    <label htmlFor="fix-scoreB">Score B</label>
                    <input id="fix-scoreB" type="text" value={fixtureData.scoreB} onChange={e => setFixtureData({ ...fixtureData, scoreB: e.target.value })} />
                  </div>
                  <div className="form-group">
                    <label htmlFor="fix-status">Status</label>
                    <select id="fix-status" value={fixtureData.status} onChange={e => setFixtureData({ ...fixtureData, status: e.target.value })}>
                      <option value="Upcoming">Upcoming</option>
                      <option value="Ongoing">Ongoing</option>
                      <option value="Completed">Completed</option>
                    </select>
                  </div>
                </div>
              )}

              {view === 'points' && (
                <div className="form-grid">
                  <div className="form-group" style={{ gridColumn: 'span 2' }}>
                    <label htmlFor="pt-dept">Department Name</label>
                    <input id="pt-dept" type="text" value={pointData.department} onChange={e => setPointData({ ...pointData, department: e.target.value.toUpperCase() })} />
                  </div>
                  <div className="form-group">
                    <label htmlFor="pt-gold">Gold Medals</label>
                    <input id="pt-gold" type="number" value={pointData.gold} onChange={e => setPointData({ ...pointData, gold: parseInt(e.target.value) || 0 })} />
                  </div>
                  <div className="form-group">
                    <label htmlFor="pt-silver">Silver Medals</label>
                    <input id="pt-silver" type="number" value={pointData.silver} onChange={e => setPointData({ ...pointData, silver: parseInt(e.target.value) || 0 })} />
                  </div>
                  <div className="form-group">
                    <label htmlFor="pt-bronze">Bronze Medals</label>
                    <input id="pt-bronze" type="number" value={pointData.bronze} onChange={e => setPointData({ ...pointData, bronze: parseInt(e.target.value) || 0 })} />
                  </div>
                </div>
              )}
              <div className="modal-actions">
                <button onClick={() => setIsEditing(false)} className="btn-outline glass"><X size={18} /> Cancel</button>
                <button onClick={handleSave} className="btn-primary">
                  {editId ? 'Update' : 'Save'} {view === 'programs' ? 'Program' : view === 'fixtures' ? 'Fixture' : 'Point'}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </div>

      <style>{`
        .admin-page {
            max-width: 1200px;
            margin: 2rem auto;
            padding: 0 1rem;
        }
        .page-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 1.5rem 2rem;
            border-radius: 12px;
            margin-bottom: 2rem;
            background: #fff;
        }
        .admin-nav {
            display: flex;
            gap: 1rem;
        }
        .tab {
            background: none;
            border: none;
            padding: 8px 16px;
            font-weight: 700;
            cursor: pointer;
            color: #666;
            border-bottom: 3px solid transparent;
            transition: var(--transition);
        }
        .tab.active {
            color: var(--poster-red);
            border-bottom-color: var(--poster-red);
        }
        .navy-cell { color: var(--poster-blue); font-weight: 700; }
        .red-cell { color: var(--poster-red); font-weight: 800; }
        .navy { color: var(--poster-blue); }
        .red { color: var(--poster-red); }
        
        .program-management, .fixture-management, .points-management {
            padding: 2rem;
            background: #fff;
        }
        .admin-table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 1rem;
        }
        .admin-table th {
            text-align: left;
            padding: 1rem;
            border-bottom: 2px solid #eee;
            color: #666;
            text-transform: uppercase;
            font-size: 0.8rem;
        }
        .admin-table td {
            padding: 1.5rem 1rem;
            border-bottom: 1px solid #eee;
        }
        .ribbon-mini {
            background: var(--poster-blue);
            color: white;
            padding: 4px 10px;
            font-weight: 700;
            border-radius: 3px;
            font-size: 0.8rem;
        }
        .date-cell { color: var(--poster-red); font-weight: 700; }
        .sport-cell { font-weight: 600; font-size: 1.1rem; }
        
        .actions { display: flex; gap: 0.5rem; }
        .icon-btn {
            background: #f5f5f5;
            border: none;
            padding: 10px;
            border-radius: 6px;
            cursor: pointer;
            transition: var(--transition);
        }
        .icon-btn:hover { background: #eee; }
        .icon-btn.delete { color: #ff4d4d; }
        .icon-btn.delete:hover { background: #ffebeb; }

        .modal-overlay {
            position: fixed;
            top: 0; left: 0; right: 0; bottom: 0;
            background: rgba(0,0,0,0.5);
            display: flex; justify-content: center; align-items: center;
            z-index: 1000;
            backdrop-filter: blur(4px);
        }
        .modal {
            width: 600px;
            max-width: 95%;
            padding: 2.5rem;
            background: #fff;
            border-radius: 12px;
        }
        .form-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 1.5rem;
            margin: 2rem 0;
        }
        .form-group label {
            display: block;
            margin-bottom: 0.5rem;
            font-weight: 600;
            font-size: 0.9rem;
        }
        .form-group input, .form-group select {
            width: 100%;
            padding: 12px;
            border: 1px solid #ddd;
            border-radius: 6px;
            background: #f9f9f9;
        }
        .modal-actions {
            display: flex;
            gap: 1rem;
            justify-content: flex-end;
            margin-top: 2rem;
        }
        .btn-outline {
            background: transparent;
            border: 1px solid #ddd;
            padding: 10px 20px;
            border-radius: 6px;
            cursor: pointer;
            display: flex;
            align-items: center;
            gap: 0.5rem;
        }

        @media (max-width: 900px) {
            .page-header { flex-direction: column; gap: 1.5rem; text-align: center; padding: 1.5rem 1rem; }
            .admin-nav { width: 100%; overflow-x: auto; padding-bottom: 5px; -webkit-overflow-scrolling: touch; justify-content: flex-start; }
            .tab { white-space: nowrap; flex: 0 0 auto; }
            .btn-primary { width: 100%; justify-content: center; }
            
            .admin-content { padding: 0; }
            .program-management, .fixture-management, .points-management { padding: 1.5rem 1rem; border-radius: 0; }
            
            .admin-table th, .admin-table td { padding: 1rem 0.5rem; font-size: 0.85rem; }
            .table-responsive { overflow-x: auto; -webkit-overflow-scrolling: touch; }
            
            .modal { padding: 2rem 1.5rem; max-height: 90vh; overflow-y: auto; }
            .form-grid { grid-template-columns: 1fr; gap: 1rem; }
            .modal-actions { flex-direction: column; }
            .modal-actions button { width: 100%; order: 1; }
            .modal-actions button:first-child { order: 2; }
        }

        @media (max-width: 600px) {
            .admin-table th { display: none; }
            .admin-table tr { display: block; padding: 1.5rem 0; border-bottom: 2px solid #eee; position: relative; }
            .admin-table td { display: flex; justify-content: space-between; align-items: center; padding: 0.5rem 0; border: none; text-align: right; }
            .admin-table td:before { content: attr(data-label); font-weight: 700; text-transform: uppercase; font-size: 0.75rem; color: #999; text-align: left; margin-right: 1rem; }
            .actions { width: 100%; justify-content: center; margin-top: 1rem; }
            .ribbon-mini { margin-left: auto; }
            .date-cell, .sport-cell, .navy-cell, .red-cell { text-align: right; }
        }
      `}</style>
    </div>
  );
};

export default Admin;
