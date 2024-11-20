import { useState, useEffect } from 'react';
import axios from 'axios';  
import { API_PATHS } from '../apiConfig';
import Popup from '../../utils/Popup';

const IncidentResponseDetails = ({ 
  showIncidentPopup, 
  selectedIncidentId, 
  setShowIncidentPopup 
}) => {
  const [incidentDetails, setIncidentDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchIncidentDetails = async () => {
      if (!selectedIncidentId) return;

      try {
        setLoading(true);
        // Replace this with the actual API call to fetch incident details
        const response = await axios.get(API_PATHS.INCIDENT_DETAIL(selectedIncidentId));
        setIncidentDetails(response.data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching incident details:', err);
        setError('Failed to fetch incident details.');
        setLoading(false);
      }
    };

    fetchIncidentDetails();
  }, [selectedIncidentId]);

  if (!showIncidentPopup) return null;

  // Show loading state
  if (loading) return <Popup>Loading incident details...</Popup>;

  // Show error message
  if (error) return <Popup>{error}</Popup>;

  // If details are fetched successfully, display them
  return (
    <Popup>
      <>
        <h3>Incident Details</h3>
        <div className="incident-details">
          <p><strong>ID:</strong> {incidentDetails.id}</p>
          <p><strong>Description:</strong> {incidentDetails.description}</p>
          <p><strong>Severity:</strong> {incidentDetails.severity}</p>
          <p><strong>Status:</strong> {incidentDetails.status}</p>
          <p><strong>Response Playbook:</strong> {incidentDetails.response_playbook || 'N/A'}</p>
        </div>
        <button onClick={() => setShowIncidentPopup(false)}>Close</button>
      </>
    </Popup>
  );
};

export default IncidentResponseDetails;