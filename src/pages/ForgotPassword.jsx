import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (email.endsWith('@kfupm.edu.sa')) {
            alert('Password reset email sent successfully');
            navigate('/PasswordChangePage');
        } else {
            setErrorMessage('Please enter a valid KFUPM email address.');
        }
    };

    return (
        <div style={{ maxWidth: '400px', margin: '0 auto', padding: '20px' }}>
            <h2>Forgot Password</h2>
            <form onSubmit={handleSubmit}>
                <div style={{ marginBottom: '10px' }}>
                    <label htmlFor="email">KFUPM Email Address:</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        style={{ width: '100%', padding: '8px', marginTop: '5px' }}
                        required
                    />
                </div>
                {errorMessage && (
                    <p style={{ color: 'red', marginBottom: '10px' }}>{errorMessage}</p>
                )}
                <button type="submit" style={{ padding: '10px 20px' }}>
                    Submit
                </button>
            </form>
        </div>
    );
};

export default ForgotPassword;