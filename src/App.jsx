import React, { useState, useRef, useEffect } from 'react'
import { HashRouter as Router, Routes, Route, useLocation, useNavigate } from "react-router-dom"

import Hero from './components/Hero'
import Navbar from './components/Navbar'
import About from './components/About'
import Quote from './components/Quote'
import AppShowcase from './components/AppShowcase'
import PrivacyPolicy from './components/PrivacyPolicy'

/* --------------------------
   Inner App Content Wrapper
---------------------------*/

const AppContent = () => {
  const [showWaitlistPopup, setShowWaitlistPopup] = useState(false)
  const aboutRef = useRef(null)

  const location = useLocation()
  const navigate = useNavigate()

  // 👇 Automatically open popup if route is /waitlist
  useEffect(() => {
    if (location.pathname === "/waitlist") {
      setShowWaitlistPopup(true)
    }
  }, [location])

  const handleJoinWaitlistClick = () => {
    navigate("/waitlist")
  }

  const handleClosePopup = () => {
    setShowWaitlistPopup(false)
    navigate("/") // go back to home when popup closes
  }

  const scrollToAbout = () => {
    aboutRef.current?.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    })
  }

  return (
    <main className='relative min-h-screen w-screen overflow-x-hidden'>
      
      <Navbar onJoinWaitlistClick={handleJoinWaitlistClick} />

      <Hero 
        showWaitlistPopup={showWaitlistPopup} 
        onClosePopup={handleClosePopup}
        onScrollToAbout={scrollToAbout}
      />

      <Quote />

      <div ref={aboutRef}>
        <About onJoinWaitlistClick={handleJoinWaitlistClick} />
      </div>

      <AppShowcase />

    </main>
  )
}

/* --------------------------
   Router Wrapper
---------------------------*/

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AppContent />} />
        <Route path="/waitlist" element={<AppContent />} />
        <Route path="/privacypolicy" element={<PrivacyPolicy />} />
      </Routes>
    </Router>
  )
}

export default App
