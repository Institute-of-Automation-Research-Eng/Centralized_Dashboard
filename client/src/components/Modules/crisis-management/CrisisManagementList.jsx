import { useState, useEffect } from 'react';
import { API_PATHS } from '/Users/sainithin/Desktop/Centralized_Dashboard/client/src/components/apiConfig.js';
import axios from 'axios';
import NewCrisis from './NewCrisis';
import CrisisManagementDetails from './CrisisManagementDetails'; // Import CrisisDetails Component

import './CrisisManagementList.css';

const CrisisManagementList = () => {
  const [crisisEvents, setCrisisEvents] = useState([]);
  const [selectedEventId, setSelectedEventId] = useState(null);
  const [showCrisisPopup, setShowCrisisPopup] = useState(false);
  const [showNewCrisisPopup, setShowNewCrisisPopup] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch crisis events on component mount
  useEffect(() => {
    fetchCrisisEvents();
  }, []);

  // Fetch crisis events from the API
  const fetchCrisisEvents = async () => {
    try {
      setLoading(true);
      const response = await axios.get(API_PATHS.CRISIS_LIST);
      
      const sortedCrisisEvents = response.data.sort((a, b) => a.event_id - b.event_id);
      
      setCrisisEvents(sortedCrisisEvents);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching crisis events:', err);
      setError('Failed to fetch crisis events.');
      setLoading(false);
    }
  };

  const handleCrisisClick = (eventId) => {
    setSelectedEventId(eventId);
    setShowCrisisPopup(true);
  };

  const handleNewCrisisClick = () => {
    setShowNewCrisisPopup(true);
  };

  const handleCommuncation = async (eventTitle) => {
    try {
      const response = await axios.post(API_PATHS.CRISIS_COMMUNICATION(eventTitle));
  
      const { communication_id, message } = response.data;
  
      alert(`Event ${communication_id} - ${message}`);
    } catch (error) {
      console.error('Error generating communication strategy:', error);
      alert('Failed to generate communication strategy. Please try again.');
    }
  };

  const handleResolve = async (eventId) => {
    try {
      const response = await axios.put(API_PATHS.RESOLVE_CRISIS(eventId));
  
      const { id } = response.data.crisis_event;
      const { message } = response.data;
  
      alert(`Event ${id} - ${message}`);
  
      fetchCrisisEvents();
    } catch (error) {
      console.error('Error resolving crisis event:', error);
      alert('Failed to resolve crisis event. Please try again.');
    }
  };
  

  const handleGenerateReport = async (eventTitle) => {
    try {
      const response = await axios.get(API_PATHS.GENERATE_CRISIS_REPORT(eventTitle));
  
      const { event_name, report_details } = response.data;
  
      const blob = new Blob([report_details], { type: 'text/plain' });
  
      const blobUrl = URL.createObjectURL(blob);
  
      const link = document.createElement('a');
      link.href = blobUrl;
      link.download = `${event_name}.txt`;
  
      document.body.appendChild(link);
      link.click();
  

      document.body.removeChild(link);
      URL.revokeObjectURL(blobUrl);
  
      alert('Report downloaded successfully!');
    } catch (error) {
      console.error('Error generating report:', error);
      alert('Failed to generate report. Please try again.');
    }
  };    

  if (loading) return <div>Loading crisis events...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="crisis-management">
      <div className="crisis-header">
        <button className="add-crisis-button" onClick={handleNewCrisisClick}>
          New Crisis
        </button>
      </div>

      <table className="crisis-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Description</th>
            <th>Timestamp</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {crisisEvents.map((crisis) => (
            <tr
              key={crisis.event_id} // Use event_id as the key
              className="crisis-row"
              onClick={() => handleCrisisClick(crisis.event_id)} 
            >
              <td>{crisis.event_id}</td>
              <td>{crisis.title}</td>
              <td>{crisis.description}</td>
              <td>{new Date(crisis.timestamp).toLocaleString()}</td>
              <td>
                <button 
                  onClick={(e) => {
                    e.stopPropagation(); 
                    handleResolve(crisis.event_id); 
                  }} 
                  className="action-button" 
                >
                  Resolve
                </button>

                &nbsp;
                {/* Risk History */}
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    handleCommuncation(crisis.title);
                  }} 
                  className="action-button"
                >
                  Communicate
                </button>

                &nbsp;
                {/* Risk History */}
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    handleGenerateReport(crisis.title);
                  }} 
                  className="action-button"
                >
                  Generate Report
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Crisis Details Popup */}
      <CrisisManagementDetails 
        showCrisisPopup={showCrisisPopup} 
        eventId={selectedEventId} 
        setShowCrisisPopup={setShowCrisisPopup} 
      />
      
      {/* Log New Crisis Popup */}
      <NewCrisis 
        showNewCrisisPopup={showNewCrisisPopup} 
        setShowNewCrisisPopup={setShowNewCrisisPopup} 
        onNewCrisisSubmit={fetchCrisisEvents} 
      />
    </div>
  );
};

export default CrisisManagementList;