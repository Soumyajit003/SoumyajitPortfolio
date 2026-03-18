import React, { useState, useEffect } from 'react'
import NavProject from '../components/ProjectPage/NavProject'
import FollowCursor from '../components/HomePage/FollowCursor'
import Floating from '../components/HomePage/Floating'
import ProjectList from '../components/ProjectPage/ProjectList'
import Footer from '../components/HomePage/Footer'
import Preloader from '../components/Common/Preloader'
import { AnimatePresence } from 'framer-motion'

const ProjectPage = ({ globalLoading }) => {
  // Only show page-specific loader if global app loader is NOT active
  const [isPageLoading, setIsPageLoading] = useState(!globalLoading);

  return (
    <>
      <AnimatePresence mode="wait">
        {isPageLoading && (
          <Preloader 
            onComplete={() => setIsPageLoading(false)} 
            speed="fast" 
          />
        )}
      </AnimatePresence>
      
      <div>
        <NavProject />
        <ProjectList />
        <Footer />
        <FollowCursor />
        <Floating />
      </div>
    </>
  )
}

export default ProjectPage
