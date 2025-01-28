import React from "react"
import "./App.css"
import Home from "./pages/Home"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import About from "./pages/About"
import Contact from "./pages/Contact"
import TermsofService from "./pages/TermsOfService"



function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element ={<Contact />} />
        <Route path="/terms-of-service" element ={<TermsofService />} />
      </Routes>
    </Router>
  )
}

export default App
