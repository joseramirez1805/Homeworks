import React from 'react';
import './Pages.css';

const NetworkStatus = () => {
  const services = [
    { name: 'API Server', status: 'Operational', uptime: '99.9%' },
    { name: 'Database', status: 'Operational', uptime: '99.8%' },
    { name: 'Storage Service', status: 'Operational', uptime: '99.9%' },
    { name: 'Authentication Service', status: 'Operational', uptime: '100%' }
  ];

  return (
    <div className="page-container">
      <h2 className="page-title">Network Status</h2>
      <div className="page-content">
        <div className="network-status">
          <div className="status-overview">
            <h3>Sistema General: Operativo</h3>
            <p className="status-time">Última actualización: {new Date().toLocaleString()}</p>
          </div>
          <div className="services-list">
            {services.map((service, index) => (
              <div key={index} className="service-item">
                <div className="service-name">{service.name}</div>
                <div className="service-status">
                  <span className={`status-indicator ${service.status.toLowerCase()}`}></span>
                  {service.status}
                </div>
                <div className="service-uptime">
                  Uptime: {service.uptime}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NetworkStatus;