import React, { useState } from 'react';

const WebsiteSettings = () => {
    const [settings, setSettings] = useState({
        theme: 'light',
        notifications: true,
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setSettings({
            ...settings,
            [name]: type === 'checkbox' ? checked : value,
        });
    };

    const handleSave = () => {
        alert('Settings saved!');
        console.log(settings);
    };

    return (
        <div style={{ padding: '20px' }}>
            <h1>Website Settings</h1>
            <div style={{ marginBottom: '15px' }}>
                <label>
                    Theme:
                    <select
                        name="theme"
                        value={settings.theme}
                        onChange={handleChange}
                        style={{ marginLeft: '10px' }}
                    >
                        <option value="light">Light</option>
                        <option value="dark">Dark</option>
                    </select>
                </label>
            </div>
            <div style={{ marginBottom: '15px' }}>
                <label>
                    Enable Notifications:
                    <input
                        type="checkbox"
                        name="notifications"
                        checked={settings.notifications}
                        onChange={handleChange}
                        style={{ marginLeft: '10px' }}
                    />
                </label>
            </div>
            <button onClick={handleSave} style={{ padding: '10px 20px' }}>
                Save Settings
            </button>
        </div>
    );
};

export default WebsiteSettings;