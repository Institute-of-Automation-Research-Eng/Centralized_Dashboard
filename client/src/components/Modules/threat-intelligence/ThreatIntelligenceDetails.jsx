import Popup from '../../utils/Popup';

const ThreatIntelligenceDetails = ({ showThreatPopup, selectedThreat, setShowThreatPopup }) => {
  if (!showThreatPopup || !selectedThreat) return null;

  const threatDetailsContent = (
    <>
      <h3>Threat Details</h3>
      <div className="threat-details">
        <p><strong>ID:</strong> {selectedThreat.id}</p>
        <p><strong>Source:</strong> {selectedThreat.source}</p>
        <p><strong>Description:</strong> {selectedThreat.description}</p>
        <p><strong>Severity:</strong> {selectedThreat.severity}</p>
        <p><strong>Classification:</strong> {selectedThreat.classification}</p>
      </div>
      <button onClick={() => setShowThreatPopup(false)}>Close</button>
    </>
  );

  return <Popup>{threatDetailsContent}</Popup>;
};

export default ThreatIntelligenceDetails;