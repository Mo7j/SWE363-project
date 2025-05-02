import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import { getUserProfile } from "../backend/users";
import { createRoommateRequest } from "../backend/requests";
import { useLanguage } from "../locales/LanguageContext";
import "../styels/profileSettingsPage.css";

const RoommateRequestForm = () => {
  const navigate = useNavigate();
  const { t } = useLanguage(); // ✅ language context
  const [profile, setProfile] = useState(null);
  const [formData, setFormData] = useState({
    major: "",
    age: "",
    city: "",
    smoking: "",
    building: "",
    details: "",
  });

  const [error, setError] = useState("");

  useEffect(() => {
    const loadUserProfile = async () => {
      try {
        const data = await getUserProfile(auth.currentUser.uid);
        setProfile({
          name: data.name || "",
          email: data.email || "",
        });
      } catch (err) {
        console.error("Failed to load user profile", err.message);
        alert(t("error_loading_profile"));
      }
    };

    loadUserProfile();
  }, [t]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await createRoommateRequest({
        ...formData,
        name: profile.name,
        email: profile.email,
        uid: auth.currentUser.uid,
      });

      alert(t("request_submitted_success"));
      navigate("/my-requests");
    } catch (err) {
      console.error("Error submitting request:", err.message);
      setError(err.message);
    }
  };

  if (!profile) return <div className="profile-settings-page">{t("loading_profile")}</div>;

  return (
    <div className="profile-settings-page">
      <div className="form-box">
        <h2>{t("create_request")}</h2>
        <form onSubmit={handleSubmit} className="form-container">
          <div className="input-group">
            <label>{t("name")}</label>
            <input className="input" value={profile.name} disabled />
          </div>

          <div className="input-group">
            <label>{t("email")}</label>
            <input className="input" value={profile.email} disabled />
          </div>

          <div className="input-group">
            <label>{t("major")}</label>
            <select
              className="input"
              name="major"
              value={formData.major}
              onChange={handleChange}
            >
              <option value="">{t("select_major")}</option>
              <option value="ICS">ICS</option>
              <option value="Engineering">{t("engineering")}</option>
              <option value="Computer Science">{t("cs")}</option>
              <option value="Electrical Engineering">{t("ee")}</option>
              <option value="Mechanical Engineering">{t("me")}</option>
            </select>
          </div>

          <div className="input-group">
            <label>{t("age")}</label>
            <input
              className="input"
              type="number"
              name="age"
              value={formData.age}
              onChange={handleChange}
              placeholder="24"
            />
          </div>

          <div className="input-group">
            <label>{t("city")}</label>
            <select
              className="input"
              name="city"
              value={formData.city}
              onChange={handleChange}
            >
              <option value="">{t("select_city")}</option>
              <option value="Dhahran">{t("dhahran")}</option>
              <option value="Alkhobar">{t("alkhobar")}</option>
              <option value="Dammam">{t("dammam")}</option>
              <option value="Riyadh">{t("riyadh")}</option>
            </select>
          </div>

          <div className="input-group">
            <label>{t("smoking")}</label>
            <select
              className="input"
              name="smoking"
              value={formData.smoking}
              onChange={handleChange}
            >
              <option value="">{t("select_smoking")}</option>
              <option value="yes">{t("yes")}</option>
              <option value="no">{t("no")}</option>
              <option value="doesn't matter">{t("doesnt_matter")}</option>
            </select>
          </div>

          <div className="input-group">
            <label>{t("building")}</label>
            <input
              className="input"
              name="building"
              value={formData.building}
              onChange={handleChange}
              placeholder="860 - 231"
            />
          </div>

          <div className="input-group">
            <label>{t("details")}</label>
            <textarea
              className="input"
              name="details"
              value={formData.details}
              onChange={handleChange}
              placeholder={t("details_placeholder")}
              rows="4"
            />
          </div>

          {error && <p className="error-message">{error}</p>}

          <button type="submit" className="signup-button">
            {t("submit_request")}
          </button>
        </form>
      </div>
    </div>
  );
};

export default RoommateRequestForm;
