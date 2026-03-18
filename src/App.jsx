import React, { useState, useEffect } from "react";
import HomeMain from "./Pages/HomeMain";
import { Route, Routes, useLocation } from "react-router-dom";
import ProjectPage from "./Pages/ProjectPage";
import ScrollToTop from "./components/ScrollToTop";
import Preloader from "./components/Common/Preloader";
import { AnimatePresence } from "framer-motion";

const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    if (isLoading) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
      window.scrollTo(0, 0);
    }
    // Cleanup on unmount
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isLoading]);
  
  return (
    <>
      <AnimatePresence mode="wait">
        {isLoading && (
          <Preloader onComplete={() => setIsLoading(false)} />
        )}
      </AnimatePresence>

      <ScrollToTop />
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<HomeMain isLoading={isLoading} />} />
        <Route path="/projects" element={<ProjectPage />} />
      </Routes>
    </>
  );
};

export default App;
