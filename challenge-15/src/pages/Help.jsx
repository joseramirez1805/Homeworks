import React from 'react';
import './Pages.css';

const Help = () => {
  const faqs = [
    {
      question: '¿Cómo cambiar mi contraseña?',
      answer: 'Ve a Configuración > Contraseña y sigue las instrucciones.'
    },
    {
      question: '¿Cómo activar la autenticación de dos factores?',
      answer: 'Ve a Configuración > Seguridad y Privacidad > Autenticación de dos factores.'
    }
  ];

  return (
    <div className="page-container">
      <h2 className="page-title">Help Center</h2>
      <div className="page-content">
        <div className="help-sections">
          <section className="faq-section">
            <h3>Preguntas Frecuentes</h3>
            {faqs.map((faq, index) => (
              <div key={index} className="faq-item">
                <h4>{faq.question}</h4>
                <p>{faq.answer}</p>
              </div>
            ))}
          </section>
        </div>
      </div>
    </div>
  );
};

export default Help;