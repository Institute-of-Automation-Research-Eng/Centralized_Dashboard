import Popup from '../../utils/Popup';

const IncidentResponseDetails = ({ 
    showIncidentPopup, 
    selectedIncident, 
    setShowIncidentPopup 
}) => {
  if (!showIncidentPopup || !selectedIncident) return null;

  const incidentDetailsContent = (
    <>
      <h3>Incident Details</h3>
      <div className="incident-details">
        <p><strong>ID:</strong> {selectedIncident.id}</p>
        <p><strong>Description:</strong> {selectedIncident.description}</p>
        <p><strong>Severity:</strong> {selectedIncident.severity}</p>
        <p><strong>Status:</strong> {selectedIncident.status}</p>
        <p><strong>Response Playbook:</strong> {selectedIncident.response_playbook || 'N/A'}</p>
      </div>
      <button onClick={() => setShowIncidentPopup(false)}>Close</button>
    </>
  );

  return <Popup>{incidentDetailsContent}</Popup>;
};

export default IncidentResponseDetails;