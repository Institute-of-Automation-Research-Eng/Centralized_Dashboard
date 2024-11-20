import axios from 'axios';
import { API_PATHS } from '../apiConfig';
import Popup from '../../utils/Popup';

const ResolveCrisisEvent = ({ 
    showCrisisPopup, 
    selectedCrisis, 
    setShowCrisisPopup,
    onResolveCrisisSubmit 
}) => {
  // Handle the resolution of the crisis
  const handleResolveCrisis = async () => {
    if (!selectedCrisis || !selectedCrisis.id) return;

    try {
      const response = await axios.post(API_PATHS.RESOLVE_CRISIS(selectedCrisis.id));
      
      if (response.data && response.data.message) {
        alert(response.data.message); // Show success message

        // Refreshthe crisis list
        onResolveCrisisSubmit
        setShowCrisisPopup(false);  // Close popup after resolving

      }
    } catch (err) {
      console.error('Error resolving crisis:', err);
      alert('Failed to resolve the crisis event.');
    }
  };

  // If the popup is not visible, return null
  if (!showCrisisPopup) return null;

  return (
    <Popup>
      <>
        <div className="crisis-details">
          <h3>Do you want to resolve this crisis event?</h3>
          <p><strong>ID:</strong> {selectedCrisis.id}</p>
          <p><strong>Description:</strong> {selectedCrisis.description}</p>
          <p><strong>Impact:</strong> {selectedCrisis.impact}</p>
          <p><strong>Status:</strong> {selectedCrisis.status}</p>
          <p><strong>Report:</strong> {selectedCrisis.crisis_report}</p>
        </div>
        &nbsp;
        <button 
          type="submit" 
          onClick={handleResolveCrisis}
          disabled={selectedCrisis.status === 'Resolved'}>
          Resolve
        </button>

        <button 
          type="button" 
          onClick={() => setShowCrisisPopup(false)}
        >
          Cancel
        </button>
      </>
    </Popup>
  );
};

export default ResolveCrisisEvent;