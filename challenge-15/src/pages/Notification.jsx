import React from 'react';
import './Pages.css';

const Notification = () => {
  return (
    <div className="page-container">
      <h2 className="page-title">Notification Settings</h2>
      <div className="page-content">
        <div className="notification-settings">
          <section className="notification-section">
            <h3>Email Notifications</h3>
            <div className="notification-option">
              <label>
                <input type="checkbox" defaultChecked />
                <span>Mensajes nuevos</span>
              </label>
            </div>
            <div className="notification-option">
              <label>
                <input type="checkbox" defaultChecked />
                <span>Actualizaciones de seguridad</span>
              </label>
            </div>
            <div className="notification-option">
              <label>
                <input type="checkbox" />
                <span>Boletín informativo</span>
              </label>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Notification;