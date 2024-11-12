import { useState } from 'react';
import './ReportNewIncident.css';

const ReportNewIncident = ({ 
    setShowAddIncidentPopup, 
    setIncidents, 
    incidents 
}) => {
  const [newIncident, setNewIncident] = useState({
    description: '',
    severity: '',
    status: 'Open',
    response_playbook: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewIncident({ ...newIncident, [name]: value });
  };

  const handleAddIncidentSubmit = (e) => {
    e.preventDefault();
    setIncidents([...incidents, { ...newIncident, id: incidents.length + 1 }]);
    setShowAddIncidentPopup(false);
    setNewIncident({
      description: '',
      severity: '',
      status: 'Open',
      response_playbook: ''
    });
  };

  return (
    <div className="popup-overlay">
      <div className="popup">
        <h3>Report New Incident</h3>
        <form onSubmit={handleAddIncidentSubmit}>
          <input
            type="text"
            name="description"
            placeholder="Incident Description"
            value={newIncident.description}
            onChange={handleInputChange}
            required
          />
          <input
            type="text"
            name="severity"
            placeholder="Severity (e.g., Low, Medium, High)"
            value={newIncident.severity}
            onChange={handleInputChange}
            required
          />
          <textarea
            className='playbook-textarea'
            name="response_playbook"
            placeholder="Response Playbook"
            value={newIncident.response_playbook}
            onChange={handleInputChange}
          />
          <button type="submit">Submit</button>
          <button className="button-cancel" type="button" onClick={() => setShowAddIncidentPopup(false)}>Cancel</button>
        </form>
      </div>
    </div>
  );
};

export default ReportNewIncident;