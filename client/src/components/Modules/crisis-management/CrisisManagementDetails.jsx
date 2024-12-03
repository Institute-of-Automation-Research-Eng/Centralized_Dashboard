import { useState, useEffect } from 'react';
import { API_PATHS } from '/Users/sainithin/Desktop/Centralized_Dashboard/client/src/components/apiConfig.js';
import axios from 'axios';
import Popup from '../../utils/Popup';

const CrisisManagementDetails = ({ 
  showCrisisPopup, 
  eventId, 
  setShowCrisisPopup 
}) => {
  const [crisisDetails, setCrisisDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch crisis details when component mounts or eventId changes
  useEffect(() => {
    const fetchCrisisDetails = async () => {
      if (!eventId) return;

      try {
        setLoading(true);
        const response = await axios.get(API_PATHS.CRISIS_DETAIL(eventId));
        setCrisisDetails(response.data); // Set the crisis details from the response
        setLoading(false);
      } catch (err) {
        console.error('Error fetching crisis details:', err);
        setError('Failed to fetch crisis details.');
        setLoading(false);
      }
    };

    fetchCrisisDetails();
  }, [eventId]);

  if (!showCrisisPopup) return null;

  if (loading) return <Popup>Loading crisis details...</Popup>;

  if (error) return <Popup>{error}</Popup>;

  return (
    <Popup>
      <>
        <h3>Crisis Details</h3>
        <div className="crisis-details">
          <p><strong>Event ID:</strong> {crisisDetails.event_id}</p>
          <p><strong>Title:</strong> {crisisDetails.title}</p>
          <p><strong>Description:</strong> {crisisDetails.description}</p>
          <p><strong>Timestamp:</strong> {new Date(crisisDetails.timestamp).toLocaleString()}</p>
        </div>
        <button onClick={() => setShowCrisisPopup(false)}>Close</button>
      </>
    </Popup>
  );
};

export default CrisisManagementDetails;