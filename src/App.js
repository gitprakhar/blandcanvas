import React, { useState, useCallback, useEffect } from 'react';
import FurnitureScene from './furniture_scene/FurnitureScene';

function App() {
  console.log('App component rendering');
  const [showFurniture, setShowFurniture] = useState(true);

  // Debug effect to monitor state changes
  useEffect(() => {
    console.log('showFurniture state changed to:', showFurniture);
  }, [showFurniture]);

  const handleScrollComplete = useCallback(() => {
    console.log('handleScrollComplete called');
    setShowFurniture(false);
  }, []);

  return (
    <div style={{ width: '100vw', height: '100%' }}>
      {showFurniture ? (
        <FurnitureScene onScrollComplete={handleScrollComplete} />
      ) : (
        <div style={{ 
          width: '100vw',
          minHeight: '300vh',
          background: 'black',
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 1000
        }}>
          <div style={{ color: 'white', padding: '20px' }}>
            Scrolled to next section
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
