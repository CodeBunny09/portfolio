import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Contact from "./pages/Contact";
import Gallery from "./pages/Gallery"; // <--- this line!
import WorkPage from "./pages/WorkPage";
import Resume from "./pages/Resume";



function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/gallery" element={<Gallery />} /> {/* <--- this line! */}
        <Route path="/work" element={<WorkPage />} />
        <Route path="/resume" element={<Resume />} />

      </Routes>
    </Router>
  );
}

export default App;
