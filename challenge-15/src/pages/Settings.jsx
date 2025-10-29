import React from 'react';
import './Pages.css'; 

const Settings = () => {
  return (
    <div className="page-container">
      <h2 className="page-title">Settings</h2>
      <div className="page-content">
        <div className="settings-sections">
          <section className="settings-section">
            <h3>General Settings</h3>
            <p>Manage your general account preferences and settings.</p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Settings;