import { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import '@fortawesome/fontawesome-svg-core/styles.css'; // Add this line

import Navbar from './components/Navbar/Navbar';
import Login from './components/Login/Login';
import Home from './components/Home/Home';

import './App.css';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem('isAuthenticated') === 'true';
  });

  const handleLogin = (userName) => {
    setIsAuthenticated(true);
    localStorage.setItem('isAuthenticated', 'true');
};


  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('userName');
  };

  return (
    <Router>
      <div>
        <Navbar onLogout={handleLogout} />
        <Routes>
          <Route path="*" element={<Navigate to="/home" />} />
          <Route path="/" element={<Login onLogin={handleLogin} />} /> 
          <Route 
            path="/home" 
            element={isAuthenticated ? <Home onLogout={handleLogout} /> : <Navigate to="/" />} 
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;