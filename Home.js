
import React from 'react';
import './Home.css';  

const Home = () => {
  const openNewPage = (url) => {
    window.open(url, '_blank'); // Opens a new blank tab/window
  };

  return (
    <div>
      <h1>Welcome to the Home Page!</h1>
      <p>You have successfully logged in.</p>
      <p>Click any of the buttons below for more info about the projects.</p>
      <div className="button-container">
        <button onClick={() => openNewPage('about:blank')}>module 1</button>
        <button onClick={() => openNewPage('about:blank')}>module 2</button>
        <button onClick={() => openNewPage('about:blank')}>module 3</button>
        <button onClick={() => openNewPage('about:blank')}>module 4</button>
        <button onClick={() => openNewPage('about:blank')}>module 5</button>
        <button onClick={() => openNewPage('about:blank')}>module 6</button>
      </div>
    </div>
  );
};

export default Home;



