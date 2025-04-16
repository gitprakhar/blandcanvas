import React, { useState } from 'react';
import FurnitureScene from './FurnitureScene';
import OverlayText from './OverlayText';
import './fonts.css';

const linkStyle = {
  textDecoration: 'none',
  color: 'white',
  fontSize: '0.9rem',
  fontWeight: '500',
};

export default function App() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [scrollComplete, setScrollComplete] = useState(false);
  const [showMockup, setShowMockup] = useState(false);

  const handleScrollComplete = () => {
    console.log('Scroll is complete!');
    setScrollComplete(true);
  };

  return (
    <div style={{ margin: 0, padding: 0 }}>
      {/* 🧭 Navbar */}
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '80px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 2rem',
          color: 'white',
          fontFamily: "'Barlow Condensed', sans-serif",
          fontWeight: '100',
          fontSize: '1.0rem',
          zIndex: 20,
        }}
      >
        <div style={{ display: 'flex', gap: '1.5rem' }}>
          <a href="#diy" style={linkStyle}>DIY</a>
          <a href="#artists" style={linkStyle}>Artists</a>
          <a href="#contribute" style={linkStyle}>Contribute</a>
          <a href="#about" style={linkStyle}>About</a>
        </div>
        <div
          style={{
            position: 'absolute',
            left: '50%',
            transform: 'translateX(-50%)',
            fontSize: '1.4rem',
            whiteSpace: 'nowrap',
          }}
        >
          blandcanvas.com
        </div>
        <div style={{ width: '120px' }}></div>
      </div>

      {/* 🖼️ 3D Scene with sticky scroll */}
      <div style={{ height: '200vh', position: 'relative' }}>
        <section
          style={{
            position: 'sticky',
            top: 0,
            height: '100vh',
          }}
        >
          <FurnitureScene
            onScrollComplete={handleScrollComplete}
            onScrollUpdate={setScrollProgress}
          />
          <OverlayText triggerFade={scrollProgress > 0.95 || scrollComplete} />
        </section>
      </div>

      {/* 👇 Next Section */}
      <div
        style={{
          background: 'black',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '5rem 2rem',
          minHeight: '100vh',
          color: 'white',
          fontFamily: 'Baskerville, serif',
        }}
      >
        <div
          style={{
            textAlign: 'center',
            fontSize: '3.5rem',
            lineHeight: '1.5',
            maxWidth: '1800px',
          }}
        >
          turn your boring furniture{' '}
          <img
            src="/marius-plain.png"
            alt="plain stool"
            style={{ width: '100px', verticalAlign: 'middle', marginLeft: '6px' }}
          />
          <br />
          into something natural{' '}
          <img
            src="/marius-natural.png"
            alt="natural stool"
            style={{ width: '100px', verticalAlign: 'middle', marginLeft: '6px' }}
          />
          or something cute{' '}
          <img
            src="/marius-cute.png"
            alt="cute stool"
            style={{ width: '100px', verticalAlign: 'middle', marginLeft: '6px' }}
          />
          <br />
          or something space-like{' '}
          <img
            src="/marius-space.png"
            alt="space stool"
            style={{ width: '100px', verticalAlign: 'middle', marginLeft: '6px' }}
          />
          <br />
          or something that is a work of art{' '}
          <img
            src="/marius-vinyl.png"
            alt="vinyl stool"
            style={{ width: '100px', verticalAlign: 'middle', marginLeft: '6px' }}
          />
          <br />
          <div
            style={{
              marginTop: '2.5rem',
              fontSize: '1.5rem',
              color: 'white',
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '1rem',
            }}
          >
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                setShowMockup(true);
              }}
              style={{ color: 'white', textDecoration: 'underline' }}
            >
              Do-it-yourself
            </a>
            <span>|</span>
            <a href="#artists" style={{ color: 'white', textDecoration: 'underline' }}>
              Find Artists
            </a>
          </div>
        </div>
      </div>

      {/* 🖼️ Fullscreen Mockup Overlay */}
      {showMockup && (
  <div
    onClick={() => setShowMockup(false)}
    style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100vw',
      height: '100vh',
      backgroundColor: 'rgba(0, 0, 0, 0.95)',
      overflowY: 'scroll',
      zIndex: 10,
      cursor: 'pointer',
    }}
  >
    <div
      style={{
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'flex-start',
        padding: '2rem 0',
      }}
    >
      <img
        src="/aimodelnonav.png" // replace with your actual image path
        alt="DIY Mockup"
        style={{
          width: '100vw',
          height: 'auto',
        }}
      />
    </div>
  </div>
)}

    </div>
  );
}
