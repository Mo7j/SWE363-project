import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import NotFound from "./pages/NotFound";
import RoommateRequestForm from "./pages/RoommateRequestForm";
import MyRequests from "./pages/MyRequest";
import ProfileSettingsPage from "./pages/ProfileSettingsPage";
import WebsiteSettings from "./pages/WebsiteSettings";

import SearchReuset from "./pages/SearchReuset";



function Main() {
  return (
    <Router>
      <Navbar />
      <div className="content">
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/search-request" element={<SearchReuset />} />
        <Route path="/my-requests" element={<MyRequests />} />
        <Route path="/settings" element={<ProfileSettingsPage />} />
        <Route path="/website-settings" element={<WebsiteSettings />} />
        <Route path="/add-request" element={<RoommateRequestForm />} />
        <Route path="/*" element={<NotFound />} />
      </Routes>
    </div>
    </Router>
  );
}

export default Main;
