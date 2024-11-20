import { useState, useEffect } from 'react';
import axios from 'axios';
import { API_PATHS } from '../apiConfig';
import Popup from '../../utils/Popup';

const ThreatIntelligenceDetails = ({ 
  showThreatPopup, 
  threatId, 
  setShowThreatPopup, 
}) => {
  const [threatDetails, setThreatDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchThreatDetails = async () => {
      if (!threatId) return;

      try {
        setLoading(true);
        // Fetch the threat details using the API
        const response = await axios.get(API_PATHS.THREAT_DETAIL(threatId));
        setThreatDetails(response.data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching threat details:', err);
        setError('Failed to fetch threat details.');
        setLoading(false);
      }
    };

    fetchThreatDetails();
  }, [threatId]);


  if (!showThreatPopup || !threatDetails) return null;

  if (loading) return <Popup>Loading threat details...</Popup>;

  if (error) return <Popup>{error}</Popup>;

  return (
    <Popup>
      <>
        <h3>Threat Details</h3>
        <div className="threat-details">
          <p><strong>ID:</strong> {threatDetails.id}</p>
          <p><strong>Source:</strong> {threatDetails.source}</p>
          <p><strong>Description:</strong> {threatDetails.description}</p>
          <p><strong>Severity:</strong> {threatDetails.severity}</p>
          <p><strong>Classification:</strong> {threatDetails.classification}</p>
        </div>
        <button onClick={() => setShowThreatPopup(false)}>Close</button>
      </>
    </Popup>
  );
};

export default ThreatIntelligenceDetails;