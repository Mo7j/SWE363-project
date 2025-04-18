import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import RoommateRequestForm from "./pages/RoommateRequestForm";
import UniversityRedirect from "./pages/UniversityRedirect";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<RoommateRequestForm />} />
        <Route path="/university" element={<UniversityRedirect />} />
        <Route path="/" element={<Home />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
