import React from 'react';
import './Pages.css';

const Account = () => {
  return (
    <div className="page-container">
      <h2 className="page-title">Account Settings</h2>
      <div className="page-content">
        <div className="account-settings">
          <section className="settings-section">
            <h3>Account Details</h3>
            <form className="settings-form">
              <div className="form-group">
                <label>Username</label>
                <input type="text" defaultValue="johndoe" />
              </div>
              <div className="form-group">
                <label>Email</label>
                <input type="email" defaultValue="john.doe@example.com" />
              </div>
            </form>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Account;