import { useState } from 'react';
import axios from 'axios';
import { API_PATHS } from '/Users/sainithin/Desktop/Centralized_Dashboard/client/src/components/apiConfig.js';

const NewCrisis = ({ 
  showNewCrisisPopup, 
  setShowNewCrisisPopup, 
  onNewCrisisSubmit 
}) => {
  const [newCrisis, setNewCrisis] = useState({
    title: '',
    description: '',
    severity: '',
    status: '',
    reported_by: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewCrisis({ ...newCrisis, [name]: value });
  };

  // Handle the form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // Make the POST request to log the new crisis with all fields
      const response = await axios.post(API_PATHS.CRISIS_LIST, {
        title: newCrisis.title,
        description: newCrisis.description,
        severity: newCrisis.severity,
        status: newCrisis.status,
        reported_by: newCrisis.reported_by
      });

      console.log(response);
      debugger
      

      // If the backend responds with the newly created crisis or a success message
      alert('New Crisis logged successfully');
      
      // Reset the form
      setNewCrisis({
        title: '',
        description: '',
        severity: '',
        status: '',
        reported_by: ''
      });

      // Refresh the crisis list
      if (onNewCrisisSubmit) {
        onNewCrisisSubmit();
      }

      // Close the popup
      setShowNewCrisisPopup(false);

    } catch (err) {
      console.error('Error logging crisis:', err);
      setError('Failed to log the crisis. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // If the popup is not visible, return null
  if (!showNewCrisisPopup) return null;

  return (
    <div className="popup-overlay">
      <div className="popup">
        <h3>New Crisis Event</h3>
        {error && <p className="error">{error}</p>}
        <form onSubmit={handleSubmit}>
          {/* Title input */}
          <input
            type="text"
            name="title"
            placeholder="Enter Crisis Title"
            value={newCrisis.title}
            onChange={handleInputChange}
            required
          />
          
          {/* Description input */}
          <input
            type="text"
            name="description"
            placeholder="Enter Crisis Description"
            value={newCrisis.description}
            onChange={handleInputChange}
            required
          />
          
          {/* Severity input */}
          <input
            type="text"
            name="severity"
            placeholder="Enter Crisis Severity"
            value={newCrisis.severity}
            onChange={handleInputChange}
            required
          />
          
          {/* Status input */}
          <input
            type="text"
            name="status"
            placeholder="Enter Crisis Status"
            value={newCrisis.status}
            onChange={handleInputChange}
            required
          />
          
          {/* Reported By input */}
          <input
            type="text"
            name="reported_by"
            placeholder="Enter Name of Reporter"
            value={newCrisis.reported_by}
            onChange={handleInputChange}
            required
          />
          
          {/* Submit button */}
          <button type="submit" disabled={loading}>
            {loading ? 'Logging Crisis...' : 'Add Crisis'}
          </button>
          
          {/* Cancel button */}
          <button 
            type="button" 
            onClick={() => setShowNewCrisisPopup(false)}
            disabled={loading}
          >
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
};

export default NewCrisis;