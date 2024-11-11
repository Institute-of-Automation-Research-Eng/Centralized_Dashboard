import { useState } from 'react';

import Tabs from '../Tabs/Tabs';
import AssetManagement from '../Modules/AssetManagement';
import ThreatIntelligence from '../Modules/ThreatIntelligence';
import VulnerabilityRiskAssessment from '../Modules/VulnerabilityRiskAssessment';
import IncidentResponse from '../Modules/IncidentResponse';
import CrisisManagement from '../Modules/CrisisManagement';

import './Home.css';

const Home = () => {
  const [activeTab, setActiveTab] = useState('AssetManagement');

  const renderContent = () => {
    switch (activeTab) {
      case 'AssetManagement':
        return <AssetManagement />;
      case 'ThreatIntelligence':
        return <ThreatIntelligence />;
      case 'VulnerabilityRiskAssessment':
        return <VulnerabilityRiskAssessment />;
      case 'IncidentResponse':
        return <IncidentResponse />;
      case 'CrisisManagement':
        return <CrisisManagement />;
      default:
        return null;
    }
  };

  return (
    <div className="home-container">
      <Tabs activeTab={activeTab} setActiveTab={setActiveTab} />
      <div className="content">
        {renderContent()}
      </div>
    </div>
  );
};

export default Home;