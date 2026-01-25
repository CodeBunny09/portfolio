import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Navbar from "./components/Navbar"

// Pages
import Home from "./pages/Home"
import Gallery from "./pages/Gallery"
import Resume from "./pages/Resume"
import Contact from "./pages/Contact"
import WorkPage from "./pages/WorkPage"

export default function App() {
  return (
    <Router>
      {/* Global floating navbar */}
      <Navbar />

      {/* Routed pages */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/resume" element={<Resume />} />
        <Route path="/work" element={<WorkPage />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </Router>
  )
}
