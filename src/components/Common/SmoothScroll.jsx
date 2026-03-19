import React, { useEffect } from 'react';
import { ReactLenis, useLenis } from 'lenis/react';
import { useLocation } from 'react-router-dom';

const ScrollRefresh = () => {
  const lenis = useLenis();
  const location = useLocation();

  useEffect(() => {
    if (lenis) {
      lenis.resize();
    }
  }, [location, lenis]);

  return null;
};

const SmoothScroll = ({ children }) => {
  return (
    <ReactLenis root options={{ lerp: 0.1, duration: 1.5, smoothWheel: true }}>
      <ScrollRefresh />
      {children}
    </ReactLenis>
  );
};

export default SmoothScroll;
