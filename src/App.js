import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";

// Pages
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import AdminPage from "./pages/AdminPage";
import NotFound from "./pages/NotFound";
import RoommateRequestForm from "./pages/RoommateRequestForm";
import MyRequests from "./pages/MyRequest";
import ProfileSettingsPage from "./pages/ProfileSettingsPage";
import WebsiteSettings from "./pages/WebsiteSettings";
import ChattingPage from "./pages/chattingPage";
import SearchReuset from "./pages/SearchReuset";

// Components
import Navbar from "./components/Navbar";
import PrivateRoute from "./components/PrivateRoute";
import PublicRoute from "./components/PublicRoute";

// Language Provider
import { LanguageProvider } from "./locales/LanguageContext";

function ConditionalNavbar() {
  const location = useLocation();
  const showNavbarPaths = [
    "/search-request",
    "/my-requests",
    "/settings",
    "/website-settings",
    "/chatting",
    "/add-request",
  ];
  return showNavbarPaths.includes(location.pathname) ? <Navbar /> : null;
}

function App() {
  return (
    <LanguageProvider>
      <Router>
        <ConditionalNavbar />
        <div className="content">
          <Routes>
            {/* Public routes */}
            <Route
              path="/login"
              element={
                <PublicRoute>
                  <Login />
                </PublicRoute>
              }
            />
            <Route
              path="/signup"
              element={
                <PublicRoute>
                  <Signup />
                </PublicRoute>
              }
            />
            <Route path="/" element={<Navigate to="/login" />} />

            {/* Private routes */}
            <Route
              path="/admin"
              element={
                <PrivateRoute requiredRole="admin">
                  <AdminPage />
                </PrivateRoute>
              }
            />
            <Route
              path="/search-request"
              element={
                <PrivateRoute>
                  <SearchReuset />
                </PrivateRoute>
              }
            />
            <Route
              path="/my-requests"
              element={
                <PrivateRoute>
                  <MyRequests />
                </PrivateRoute>
              }
            />
            <Route
              path="/settings"
              element={
                <PrivateRoute>
                  <ProfileSettingsPage />
                </PrivateRoute>
              }
            />
            <Route
              path="/website-settings"
              element={
                <PrivateRoute>
                  <WebsiteSettings />
                </PrivateRoute>
              }
            />
            <Route
              path="/add-request"
              element={
                <PrivateRoute>
                  <RoommateRequestForm />
                </PrivateRoute>
              }
            />
            <Route
              path="/chatting"
              element={
                <PrivateRoute>
                  <ChattingPage />
                </PrivateRoute>
              }
            />

            {/* 404 fallback */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </Router>
    </LanguageProvider>
  );
}

export default App;
