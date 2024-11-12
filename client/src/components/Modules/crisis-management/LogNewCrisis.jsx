import { useState } from 'react';
import './LogNewCrisis.css';

const LogNewCrisis = ({ showLogNewCrisisPopup, setShowLogNewCrisisPopup, onLogNewCrisisSubmit }) => {
  const [newCrisis, setNewCrisis] = useState({
    description: '',
    impact: '',
    crisis_report: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewCrisis({ ...newCrisis, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogNewCrisisSubmit(newCrisis);
    setNewCrisis({ description: '', impact: '', crisis_report: '' });
  };

  if (!showLogNewCrisisPopup) return null;

  return (
    <div className="popup-overlay">
      <div className="popup">
        <h3>Log New Crisis</h3>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="description"
            placeholder="Enter Crisis Description"
            value={newCrisis.description}
            onChange={handleInputChange}
            required
          />
          <input
            type="text"
            name="impact"
            placeholder="Enter Impact Level"
            value={newCrisis.impact}
            onChange={handleInputChange}
            required
          />
          <textarea
            className='crisis-report-textarea'
            name="crisis_report"
            placeholder="Enter Crisis Report"
            value={newCrisis.crisis_report}
            onChange={handleInputChange}
            required
          />
          <button type="submit">Log Crisis</button>
          <button type="button" onClick={() => setShowLogNewCrisisPopup(false)}>Cancel</button>
        </form>
      </div>
    </div>
  );
};

export default LogNewCrisis;
