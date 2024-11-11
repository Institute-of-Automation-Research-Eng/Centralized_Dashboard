import './Tabs.css';

const Tabs = ({ activeTab, setActiveTab }) => {
  const tabs = [
    { id: 'AssetManagement', label: 'Asset Management' },
    { id: 'ThreatIntelligence', label: 'Threat Intelligence' },
    { id: 'VulnerabilityRiskAssessment', label: 'Vulnerability Risk Assessment' },
    { id: 'IncidentResponse', label: 'Incident Response' },
    { id: 'CrisisManagement', label: 'Crisis Management' },
  ];

  return (
    <div className="tabs">
      {tabs.map(tab => (
        <button
          key={tab.id}
          className={`tab ${activeTab === tab.id ? 'active' : ''}`}
          onClick={() => setActiveTab(tab.id)}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
};

export default Tabs;