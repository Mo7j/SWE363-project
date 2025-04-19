import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import RoleSelection from "./pages/RoleSelection";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import AdminLogin from "./pages/AdminLogin";
import AdminPage from "./pages/AdminPage";
import Navbar from "./components/Navbar";
import NotFound from "./pages/NotFound";
import RoommateRequestForm from "./pages/RoommateRequestForm";
import MyRequests from "./pages/MyRequest";
import ProfileSettingsPage from "./pages/ProfileSettingsPage";
import WebsiteSettings from "./pages/WebsiteSettings";
import ChattingPage from "./pages/chattingPage";
import SearchReuset from "./pages/SearchReuset";

function ConditionalNavbar() {
  const location = useLocation(); // Get the current location/path
  return location.pathname === "/home" ||
  location.pathname === "/search-request" ||
  location.pathname === "/my-requests" ||
  location.pathname === "/settings" ||
  location.pathname === "/website-settings" ||
  location.pathname === "/chatting" ||
  location.pathname === "/add-request" ? <Navbar /> : null; // Only render Navbar on the Home page
}

function App() {
  return (
    <Router>
      <ConditionalNavbar />
      <div className="content">
      <Routes>
        <Route path="/" element={<RoleSelection />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/home" element={<Home />} />
        <Route path="/search-request" element={<SearchReuset />} />
        <Route path="/my-requests" element={<MyRequests />} />
        <Route path="/settings" element={<ProfileSettingsPage />} />
        <Route path="/website-settings" element={<WebsiteSettings />} />
        <Route path="/add-request" element={<RoommateRequestForm />} />
        <Route path="/chatting" element={<ChattingPage />} />
        <Route path="/*" element={<NotFound />} />
      </Routes>
    </div>
    </Router>
  );
}

export default App;
