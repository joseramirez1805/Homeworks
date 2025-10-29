import React from 'react';
import './Pages.css';

const Messages = () => {
  const messages = [
    { id: 1, from: 'Alice', subject: 'Project Update', time: '10:30 AM' },
    { id: 2, from: 'Bob', subject: 'Meeting Notes', time: '11:45 AM' },
    { id: 3, from: 'Carol', subject: 'Question about API', time: '2:15 PM' },
  ];

  return (
    <div className="page-container">
      <h2 className="page-title">Messages</h2>
      <div className="page-content">
        <div className="messages-list">
          {messages.map(message => (
            <div key={message.id} className="message-item">
              <div className="message-from">{message.from}</div>
              <div className="message-subject">{message.subject}</div>
              <div className="message-time">{message.time}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Messages;