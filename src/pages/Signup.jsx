import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signupWithEmailAndPassword } from "../backend/auth";
import "../styels/Signup.css";

const Signup = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const nameRegex = /^[a-zA-Z\s-]{2,}$/;
  const passwordRegex =
    /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;

    const validateField = (field, value = formData[field]) => {
      const newErrors = { ...errors };
    
      if (field === "name" || field === "all") {
        const val = field === "all" ? formData.name : value;
        if (!val.trim()) newErrors.name = "Full name is required";
        else if (!nameRegex.test(val))
          newErrors.name =
            "Name must be at least 2 characters and contain only letters, spaces, or hyphens";
        else delete newErrors.name;
      }
    
      if (field === "email" || field === "all") {
        const val = field === "all" ? formData.email : value;
        if (!val.trim()) newErrors.email = "Email is required";
        else if (!val.endsWith("@kfupm.edu.sa"))
          newErrors.email = "Email must end with @kfupm.edu.sa";
        else delete newErrors.email;
      }
    
      if (field === "password" || field === "all") {
        const val = field === "all" ? formData.password : value;
        if (!val) newErrors.password = "Password is required";
        else if (!passwordRegex.test(val))
          newErrors.password =
            "Password must be at least 6 characters and include 1 uppercase letter, 1 number, and 1 special character.";
        else delete newErrors.password;
      }
    
      if (field === "confirmPassword" || field === "all") {
        const val = field === "all" ? formData.confirmPassword : value;
        if (!val) newErrors.confirmPassword = "Please confirm your password";
        else if (val !== formData.password)
          newErrors.confirmPassword = "Passwords do not match";
        else delete newErrors.confirmPassword;
      }
    
      setErrors(newErrors);
      return Object.keys(newErrors).length === 0;
    };
    

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    validateField(name, value);
  };

  const handleRegister = async () => {
    const isValid = validateField("all");
    if (!isValid) return;
  
    try {
      await signupWithEmailAndPassword({
        name: formData.name,
        email: formData.email.trim(),
        password: formData.password,
      });
      localStorage.setItem("isAuthenticated", "true");
      navigate("/search-request");
    } catch (error) {
      console.error("Signup error:", error.message);
      if (error.code === "auth/email-already-in-use") {
        setErrors({ email: "This email is already registered." });
      } else {
        setErrors({ email: "Signup failed: " + error.message });
      }
    }
  };
  

  return (
    <div className="signup-container">
      <div className="signup-box">
        <h2 className="signup-title">Create Your Account</h2>

        <div className="input-group">
          <label htmlFor="name">Full Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter your full name"
            className={`input ${errors.name ? "error" : ""}`}
          />
          {errors.name && <p className="error-message">{errors.name}</p>}
        </div>

        <div className="input-group">
          <label htmlFor="email">KFUPM Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="s20xxxxxxx@kfupm.edu.sa"
            className={`input ${errors.email ? "error" : ""}`}
          />
          {errors.email && <p className="error-message">{errors.email}</p>}
        </div>

        <div className="input-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Create a password"
            className={`input ${errors.password ? "error" : ""}`}
          />
          {errors.password && <p className="error-message">{errors.password}</p>}
        </div>

        <div className="input-group">
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            placeholder="Confirm your password"
            className={`input ${errors.confirmPassword ? "error" : ""}`}
          />
          {errors.confirmPassword && (
            <p className="error-message">{errors.confirmPassword}</p>
          )}
        </div>

        <button onClick={handleRegister} className="signup-button">
          Sign Up
        </button>

        <p className="login-link">
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
