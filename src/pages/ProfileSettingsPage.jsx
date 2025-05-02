// src/pages/ProfileSettingsPage.jsx
import React, { useEffect, useState } from 'react';
import { auth } from '../firebase';
import { getUserProfile, updateUserProfile } from '../backend/users';
import LogoutButton from '../components/LogoutButton';
import '../styels/profileSettingsPage.css';

const ProfileSettingsPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    bio: '',
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const profile = await getUserProfile(auth.currentUser.uid);
        if (profile) {
          setFormData(profile);
        }
      } catch (error) {
        console.error("Error loading profile:", error.message);
        alert("Failed to load profile.");
      } finally {
        setLoading(false);
      }
    };

    loadProfile();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await updateUserProfile(auth.currentUser.uid, formData);
      alert("Changes saved successfully!");
    } catch (error) {
      console.error("Error saving profile:", error.message);
      alert("Failed to save changes: " + error.message);
    }
  };

  if (loading) return <div className="profile-settings-page">Loading profile...</div>;

  return (
    <div className="profile-settings-page">
      <h2>Profile Settings</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '15px' }}>
          <label htmlFor="name" style={{ display: 'block', marginBottom: '5px' }}>Full Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Mohammed Alshahrani"
            style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
          />
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label htmlFor="email" style={{ display: 'block', marginBottom: '5px' }}>KFUPM Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="s20xxxxxxx@kfupm.edu.sa"
            style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
          />
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label htmlFor="bio" style={{ display: 'block', marginBottom: '5px' }}>Bio</label>
          <textarea
            id="bio"
            name="bio"
            value={formData.bio}
            onChange={handleChange}
            placeholder="Tell us about yourself..."
            style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
            rows="4"
          />
        </div>

        <button type="submit" style={{ marginRight: '10px', padding: '10px 20px' }}>
          Submit Changes
        </button>

        <LogoutButton />
      </form>
    </div>
  );
};

export default ProfileSettingsPage;
