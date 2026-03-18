import React, { useEffect } from 'react'
import Home from '../components/HomePage/Hero'
import Navbar from '../components/HomePage/Navbar'
import Hero from '../components/HomePage/Hero'
import Experience from '../components/HomePage/Experience'
import Technology from '../components/HomePage/Technology'
import Projects from '../components/HomePage/Projects'
import FollowCursor from '../components/HomePage/FollowCursor'
import Footer from '../components/HomePage/Footer'
import Contact from '../components/HomePage/Contact'
import Floating from '../components/HomePage/Floating'
import Social from '../components/HomePage/Social'


const HomeMain = ({ isLoading }) => {

  return (
    <div>
      <Navbar />
      <Hero isLoading={isLoading} />
      <Experience />
      <Technology />
      <Projects />
      <FollowCursor />
      <Contact />
      <Social />
      <Footer />
      <Floating />
    </div>
  )
}

export default HomeMain
