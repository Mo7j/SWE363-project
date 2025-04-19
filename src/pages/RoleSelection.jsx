import React from 'react';
import { useNavigate } from 'react-router-dom';
import './RoleSelection.css';

const RoleSelection = () => {
  const navigate = useNavigate();

  return (
    <div className="role-selection">
      <h1>KFUPM Roommate</h1>
      <h2>Select Your Role</h2>
      <div className="button-group">
        <button onClick={() => navigate('/admin-login')}>Admin</button>
        <button onClick={() => navigate('/signup')}>Student</button>
      </div>
    </div>
  );
};

export default RoleSelection;
