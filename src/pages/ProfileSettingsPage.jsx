import React, { useState } from 'react';

const ProfileSettingsPage = () => {
    const [formData, setFormData] = useState({
        name: '',
        lastname: '',
        email: '',
        bio: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Form Data Submitted:', formData);
        // Add your form submission logic here
        const isValid = formData.name && formData.lastname && formData.email.endsWith("@kfupm.edu.sa") && formData.bio;
        if (isValid) {
            alert("Changes Saved Successfully");
        } 
        else if (!formData.email.endsWith("@kfupm.edu.sa")) {
            alert("Please fill in your KFUPM email address correctly.");
        }
        else {
            alert("Please fill out all fields before submitting.");
        }
    };

    return (
        <div style={{ maxWidth: '500px', margin: '0 auto', padding: '20px' }}>
            <h2>Profile Settings</h2>
            <form onSubmit={handleSubmit}>
                <div style={{ marginBottom: '15px' }}>
                    <label htmlFor="name" style={{ display: 'block', marginBottom: '5px' }}>Name</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Mohammed"
                        style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
                    />
                </div>
                <div style={{ marginBottom: '15px' }}>
                    <label htmlFor="lastname" style={{ display: 'block', marginBottom: '5px' }}>Last Name</label>
                    <input
                        type="text"
                        id="lastname"
                        name="lastname"
                        value={formData.lastname}
                        onChange={handleChange}
                        placeholder="Alshahrani"
                        style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
                    />
                </div>
                <div style={{ marginBottom: '15px' }}>
                    <label htmlFor="email" style={{ display: 'block', marginBottom: '5px' }}>Email</label>
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
                <button type="submit" style={{ padding: '10px 20px', backgroundColor: '#007BFF', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
                    Submit
                </button>
            </form>
        </div>
    );
};

export default ProfileSettingsPage;