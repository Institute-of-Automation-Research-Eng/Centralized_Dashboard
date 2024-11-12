import { useState } from 'react';

import Tabs from '../Tabs/Tabs';
import AssetManagement from '../Modules/asset-management/AssetManagementList';
import ThreatIntelligence from '../Modules/threat-intelligence/ThreatIntelligenceList';
import VulnerabilityRiskAssessment from '../Modules/vulnerability-risk-assessment/VulnerabilityRiskAssessmentList';
import IncidentResponse from '../Modules/incident-response/IncidentResponseList';
import CrisisManagement from '../Modules/crisis-management/CrisisManagementList';


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