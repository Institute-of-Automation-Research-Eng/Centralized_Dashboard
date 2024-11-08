import { useState } from 'react';

import Tabs from '../Tabs/Tabs';
import Module01 from '../Modules/Module01';
import Module02 from '../Modules/Module02';
import Module03 from '../Modules/Module03';
import Module04 from '../Modules/Module04';
import Module05 from '../Modules/Module05';

import './Home.css';

const Home = () => {
  const [activeTab, setActiveTab] = useState('module1');

  const renderContent = () => {
    switch (activeTab) {
      case 'module1':
        return <Module01 />;
      case 'module2':
        return <Module02 />;
      case 'module3':
        return <Module03 />;
      case 'module4':
        return <Module04 />;
      case 'module5':
        return <Module05 />;
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