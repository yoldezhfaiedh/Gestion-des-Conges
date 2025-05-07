// LoadingScreen.tsx

import React from 'react';

const loadingScreenStyles = {
  loadingScreen: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
  },
  loadingSpinner: {
    width: '50px',
    height: '50px',
    borderRadius: '50%',
    border: '4px solid #ccc',
    borderTopColor: '#333',
    animation: 'spin 1s linear infinite',
  },
};

const LoadingScreen: React.FC = () => {
  return (
    <div style={loadingScreenStyles.loadingScreen}>
      <div style={loadingScreenStyles.loadingSpinner}></div>
      <p>Loading...</p>
    </div>
  );
};

export default LoadingScreen;
