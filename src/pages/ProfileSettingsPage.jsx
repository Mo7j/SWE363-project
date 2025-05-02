import React from "react";
import LogoutButton from "../components/LogoutButton";
import { useLanguage } from "../locales/LanguageContext";
import "../styels/profileSettingsPage.css";

const ProfileSettingsPage = () => {
  const { toggleLanguage, t } = useLanguage();

  return (
    <div className="profile-settings-page">
      <h2 className="settings-title">{t("settings")}</h2>
      <div className="settings-container">
        <button className="settings-button" onClick={toggleLanguage}>
          {t("change_language")}
        </button>

        <div className="logout-section">
          <LogoutButton />
        </div>
      </div>
    </div>
  );
};

export default ProfileSettingsPage;
