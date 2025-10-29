import React from 'react';
import './Pages.css';

const Password = () => {
  return (
    <div className="page-container">
      <h2 className="page-title">Password Settings</h2>
      <div className="page-content">
        <div className="password-form">
          <form>
            <div className="form-group">
              <label>Current Password</label>
              <input type="password" placeholder="Enter current password" />
            </div>
            <div className="form-group">
              <label>New Password</label>
              <input type="password" placeholder="Enter new password" />
            </div>
            <div className="form-group">
              <label>Confirm New Password</label>
              <input type="password" placeholder="Confirm new password" />
            </div>
            <button type="submit" className="btn-save">Update Password</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Password;