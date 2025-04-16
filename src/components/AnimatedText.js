import React, { useEffect, useRef, useState } from 'react';
import { Box, Typography } from '@mui/material';

const AnimatedText = ({ text, delay = 100 }) => {
  const [visibleWords, setVisibleWords] = useState([]);
  const containerRef = useRef(null);
  const words = text.split(' ');

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Start the animation when the text comes into view
            words.forEach((word, index) => {
              setTimeout(() => {
                setVisibleWords((prev) => [...prev, word]);
              }, index * delay);
            });
          }
        });
      },
      { threshold: 0.5 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current);
      }
    };
  }, [text, delay]);

  return (
    <Box
      ref={containerRef}
      sx={{
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        textAlign: 'center',
        zIndex: 1000,
        color: 'white',
        textShadow: '2px 2px 4px rgba(0,0,0,0.5)',
        maxWidth: '80%',
      }}
    >
      <Typography
        variant="h4"
        sx={{
          opacity: visibleWords.length > 0 ? 1 : 0,
          transition: 'opacity 0.5s ease-in-out',
        }}
      >
        {visibleWords.join(' ')}
      </Typography>
    </Box>
  );
};

export default AnimatedText; 