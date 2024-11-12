import Popup from '../../utils/Popup';

const CrisisManagementDetails = ({ 
    showCrisisPopup, 
    selectedCrisis, 
    setShowCrisisPopup
}) => {
  if (!showCrisisPopup || !selectedCrisis) return null;

  const crisisDetailsContent = (
    <>
      <h3>Crisis Details</h3>
      <div className="crisis-details">
        <p><strong>ID:</strong> {selectedCrisis.id}</p>
        <p><strong>Description:</strong> {selectedCrisis.description}</p>
        <p><strong>Impact:</strong> {selectedCrisis.impact}</p>
        <p><strong>Status:</strong> {selectedCrisis.status}</p>
        <p><strong>Report:</strong> {selectedCrisis.crisis_report}</p>
      </div>
      <button onClick={() => setShowCrisisPopup(false)}>Close</button>
    </>
  );

  return <Popup>{crisisDetailsContent}</Popup>;
};

export default CrisisManagementDetails;