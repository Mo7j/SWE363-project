import React from "react";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import { useLanguage } from "../locales/LanguageContext";

const LogoutButton = () => {
  const navigate = useNavigate();
  const { t } = useLanguage(); // ✅

  const handleLogout = async () => {
    try {
      await signOut(auth);
      localStorage.removeItem("isAuthenticated");
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error.message);
    }
  };

  return (
    <button onClick={handleLogout} className="logout-button">
      {t("logout")}
    </button>
  );
};

export default LogoutButton;
