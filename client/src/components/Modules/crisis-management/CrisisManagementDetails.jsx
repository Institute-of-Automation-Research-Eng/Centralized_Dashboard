import { useState, useEffect } from 'react';
import axios from 'axios';
import Popup from '../../utils/Popup';

const CrisisManagementDetails = ({ 
    showCrisisPopup, 
    selectedCrisisId, 
    setShowCrisisPopup 
}) => {
  const [crisisDetails, setCrisisDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch crisis details when selectedCrisis changes
  useEffect(() => {
    const fetchCrisisDetails = async () => {
      if (!selectedCrisisId) return; // If no crisis is selected, do nothing

      try {
        setLoading(true);
        const response = await axios.get(`/api/crisis_events/${selectedCrisisId}`);
        setCrisisDetails(response.data);  // Assuming the API returns the detailed crisis data
        setLoading(false);
      } catch (err) {
        console.error('Error fetching crisis details:', err);
        setError('Failed to fetch crisis details.');
        setLoading(false);
      }
    };

    fetchCrisisDetails();
  }, [selectedCrisisId]); // Trigger the effect when selectedCrisis changes

  // If the popup is not visible, return null
  if (!showCrisisPopup) return null;

  // Show loading state if details are still loading
  if (loading) return <Popup>Loading crisis details...</Popup>;

  // Show error state if there was an issue fetching the details
  if (error) return <Popup>{error}</Popup>;

  // Render the crisis details if available
  return (
    <Popup>
      <>
        <h3>Crisis Details</h3>
        <div className="crisis-details">
          <p><strong>ID:</strong> {crisisDetails.id}</p>
          <p><strong>Description:</strong> {crisisDetails.description}</p>
          <p><strong>Impact:</strong> {crisisDetails.impact}</p>
          <p><strong>Status:</strong> {crisisDetails.status}</p>
          <p><strong>Report:</strong> {crisisDetails.crisis_report}</p>
        </div>
        <button onClick={() => setShowCrisisPopup(false)}>Close</button>
      </>
    </Popup>
  );
};

export default CrisisManagementDetails;