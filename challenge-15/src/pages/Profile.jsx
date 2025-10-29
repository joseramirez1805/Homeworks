import React from 'react';
import './Pages.css';

const Profile = () => {
  return (
    <div className="page-container">
      <h2 className="page-title">Profile</h2>
      <div className="page-content">
        <div className="profile-info">
          <div className="profile-section">
            <h3>Personal Information</h3>
            <div className="info-field">
              <label>Name:</label>
              <span>John Doe</span>
            </div>
            <div className="info-field">
              <label>Email:</label>
              <span>john.doe@example.com</span>
            </div>
            <div className="info-field">
              <label>Role:</label>
              <span>Software Developer</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
