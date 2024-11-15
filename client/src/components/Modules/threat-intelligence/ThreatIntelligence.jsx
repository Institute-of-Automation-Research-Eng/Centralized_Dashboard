import { useState } from 'react';

import Tabs from '/Users/sainithin/Desktop/Centralized_Dashboard/client/src/components/Tabs/Tabs';
import ThreatIntelligenceList from '/Users/sainithin/Desktop/Centralized_Dashboard/client/src/components/Modules/threat-intelligence/ThreatIntelligenceList';
import ThreatPredictiveAnalysis from '/Users/sainithin/Desktop/Centralized_Dashboard/client/src/components/Modules/threat-intelligence/ThreatPredictiveAnalysis';

import './ThreatIntelligence.css'; 

const ThreatIntelligence = () => {
  const [activeTab, setActiveTab] = useState('List');

  const renderContent = () => {
    switch (activeTab) {
      case 'List':
        return <ThreatIntelligenceList />;
      case 'Predictive Analysis':
        return <ThreatPredictiveAnalysis />;
      default:
        return null;
    }
  };

  return (
    <div className="threat-intelligence-container">
      {/* Pass isSidebar as true to make the tabs act as a sidebar */}
      <div className="sidebar">
        <Tabs activeTab={activeTab} setActiveTab={setActiveTab} tabOptions={['List', 'Predictive Analysis']} isSidebar={true} />
      </div>
      <div className="content">
        {renderContent()}
      </div>
    </div>
  );
};

export default ThreatIntelligence;