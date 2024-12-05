import { useState } from 'react';
import axios from 'axios';
// import { API_PATHS } from '../apiConfig';

const ReportNewIncident = ({ 
  setShowAddIncidentPopup, 
  setIncidents, 
  refreshIncidentsList 
}) => {
  const [newIncident, setNewIncident] = useState({
    description: '',
    severity: ''  // Removed status and response_playbook
  });

  const [loading, setLoading] = useState(false);  // Loading state
  const [error, setError] = useState(null);  // Error state

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewIncident({ ...newIncident, [name]: value });
  };

  const handleAddIncidentSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);  // Set loading state when starting the API request
    setError(null);  // Reset any previous errors

    try {
      // Sending the POST request to the backend to create a new incident
      const response = await axios.post(API_PATHS.REPORT_INCIDENT, {
        description: newIncident.description,
        severity: newIncident.severity,
      });

      alert('New Incident Reported successfully');

      // Reset the form fields
      setNewIncident({
        description: '',
        severity: ''  // Reset only description and severity
      });

      // Refresh the Incidents list
      refreshIncidentsList();

      // Close the popup and reset the form
      setShowAddIncidentPopup(false);
    } catch (err) {
      console.error('Error reporting new incident:', err);
      alert('Failed to report incident. Please try again.');
    } finally {
      setLoading(false);  // Reset loading state after API call
    }
  };

  return (
    <div className="popup-overlay">
      <div className="popup">
        <h3>Report New Incident</h3>
        
        {/* Display error message if there is any */}
        {error && <p className="error-message">{error}</p>}

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
          <button type="submit" disabled={loading}>Submit</button>

          {/* Disable cancel button while loading */}
          <button 
            className="button-cancel" 
            type="button" 
            onClick={() => setShowAddIncidentPopup(false)}
            disabled={loading}
          >
            Cancel
          </button>
        </form>
        
        {/* Show loading spinner while the request is in progress */}
        {loading && <div className="loading">Submitting...</div>}
      </div>
    </div>
  );
};

export default ReportNewIncident;