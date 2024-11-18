import { useState } from 'react';
import axios from 'axios';

const LogNewCrisis = ({ 
  showLogNewCrisisPopup, 
  setShowLogNewCrisisPopup, 
  onLogNewCrisisSubmit 
}) => {
  const [newCrisis, setNewCrisis] = useState({
    description: '',
    impact: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewCrisis({ ...newCrisis, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // Make the POST request to log the new crisis
      const response = await axios.post('/api/crisis_events', {
        description: newCrisis.description,
        impact: newCrisis.impact
      });

      // Assuming the API responds with the newly created crisis, or just a success message
      alert('New Crisis logged successfully');

      // Clear the form fields
      setNewCrisis({ description: '', impact: '' });

      // Refreshthe crisis list
      onLogNewCrisisSubmit

      // Close the popup
      setShowLogNewCrisisPopup(false);

    } catch (err) {
      console.error('Error logging crisis:', err);
      setError('Failed to log the crisis. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (!showLogNewCrisisPopup) return null;

  return (
    <div className="popup-overlay">
      <div className="popup">
        <h3>Log New Crisis</h3>
        {error && <p className="error">{error}</p>}
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
          <button type="submit" disabled={loading}>
            {loading ? 'Logging Crisis...' : 'Log Crisis'}
          </button>
          <button 
            type="button" 
            onClick={() => setShowLogNewCrisisPopup(false)}
            disabled={loading}
          >
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
};

export default LogNewCrisis;