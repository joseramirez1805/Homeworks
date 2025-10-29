import React from 'react';
import './Pages.css';

const SubmitTicket = () => {
  return (
    <div className="page-container">
      <h2 className="page-title">Submit a Ticket</h2>
      <div className="page-content">
        <form className="ticket-form">
          <div className="form-group">
            <label>Asunto</label>
            <input type="text" placeholder="Describe brevemente tu problema" />
          </div>
          <div className="form-group">
            <label>Categoría</label>
            <select className="form-select">
              <option>Problema técnico</option>
              <option>Pregunta general</option>
              <option>Sugerencia</option>
              <option>Otro</option>
            </select>
          </div>
          <div className="form-group">
            <label>Descripción</label>
            <textarea 
              className="form-textarea"
              rows="6"
              placeholder="Describe detalladamente tu problema"
            ></textarea>
          </div>
          <button type="submit" className="btn-save">
            Enviar Ticket
          </button>
        </form>
      </div>
    </div>
  );
};

export default SubmitTicket;