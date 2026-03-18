import React from 'react'
import NavProject from '../components/ProjectPage/NavProject'
import FollowCursor from '../components/HomePage/FollowCursor'
import Floating from '../components/HomePage/Floating'
import ProjectList from '../components/ProjectPage/ProjectList'
import Footer from '../components/HomePage/Footer'

const ProjectPage = () => {
  return (
    <div>
      <NavProject />
      <ProjectList />
      <Footer />
      <FollowCursor />
      <Floating />
    </div>
  )
}

export default ProjectPage
