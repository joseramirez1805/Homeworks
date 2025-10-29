import React from 'react';
import './Pages.css';

const Security = () => {
  return (
    <div className="page-container">
      <h2 className="page-title">Security & Privacy</h2>
      <div className="page-content">
        <div className="security-settings">
          <section className="security-section">
            <h3>Security Settings</h3>
            <div className="setting-item">
              <h4>Two-Factor Authentication</h4>
              <label className="switch">
                <input type="checkbox" />
                <span className="slider"></span>
              </label>
            </div>
            <div className="setting-item">
              <h4>Login Notifications</h4>
              <label className="switch">
                <input type="checkbox" defaultChecked />
                <span className="slider"></span>
              </label>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Security;