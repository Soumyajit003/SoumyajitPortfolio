import React, { useEffect } from 'react'
import Navbar from '../components/HomePage/Navbar'
import Hero from '../components/HomePage/Hero'
import About from '../components/HomePage/About'
import Technology from '../components/HomePage/Technology'
import Projects from '../components/HomePage/Projects'
import Experience from '../components/HomePage/Experience'
import Education from '../components/HomePage/Education'
import FollowCursor from '../components/HomePage/FollowCursor'
import Contact from '../components/HomePage/Contact'
import Social from '../components/HomePage/Social'
import Footer from '../components/HomePage/Footer'
import Floating from '../components/HomePage/Floating'


const HomeMain = ({ isLoading }) => {

  return (
    <div>
      <Navbar />
      <Hero isLoading={isLoading} />
      <About />
      <Technology />
      <Projects />
      <Experience />
      <Education />
      <Contact />
      <Social />
      <Footer />
      <Floating />
      <FollowCursor />
    </div>
  )
}

export default HomeMain
