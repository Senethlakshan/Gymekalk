import React, { useState } from 'react';


function Packages() {
  const [showPopup, setShowPopup] = useState(false);

  const handleButtonClick = () => {
    setShowPopup(true);
  };

  return (
    <div className='bg-gray-300 min-h-screen'>
      <button onClick={handleButtonClick} className='bg-gray-400'>Open Popup</button>
      {showPopup && (
        <div className="popup">
          <p>This is a popup!</p>
          <button onClick={() => setShowPopup(false)}>Close</button>
        </div>
      )}
    </div>
  );
}

export default Packages;
