import { useState } from 'react';

import Tabs from '../Tabs/Tabs';
import AssetManagement from '../Modules/asset-management/AssetManagement';
import ThreatIntelligence from '../Modules/threat-intelligence/ThreatIntelligence';
import VulnerabilityRiskAssessment from '../Modules/vulnerability-risk-assessment/VulnerabilityRiskAssessment';
import IncidentResponse from '../Modules/incident-response/IncidentResponse';
import CrisisManagement from '../Modules/crisis-management/CrisisManagement';

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