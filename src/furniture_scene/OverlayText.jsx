import React, { useEffect, useState } from 'react';
import './overlayText.css';

export default function OverlayText({ triggerFade }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    console.log("triggerFade received:", triggerFade); // Add this line
    if (triggerFade) {
      setVisible(true);
    }
  }, [triggerFade]);

  return (
    <div className={`overlay-text ${visible ? 'visible' : ''}`}>
      <div className="quote">
        “Each year, Americans throw out more than 12 million tons of furniture.”
        <div className="source">The New York Times</div>
      </div>
    </div>
  );
}
