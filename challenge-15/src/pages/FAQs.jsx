import React from 'react';
import './Pages.css';

const FAQs = () => {
  const faqs = [
    {
      question: '¿Cómo cambiar mi contraseña?',
      answer: 'Ve a Configuración > Contraseña y sigue las instrucciones.'
    },
    {
      question: '¿Cómo activar la autenticación de dos factores?',
      answer: 'Ve a Configuración > Seguridad y Privacidad > Autenticación de dos factores.'
    },
    {
      question: '¿Cómo actualizar mi información de perfil?',
      answer: 'Ve a Perfil y haz clic en el botón de editar junto a la información que deseas actualizar.'
    }
  ];

  return (
    <div className="page-container">
      <h2 className="page-title">Preguntas Frecuentes</h2>
      <div className="page-content">
        <div className="faq-list">
          {faqs.map((faq, index) => (
            <div key={index} className="faq-item">
              <h4>{faq.question}</h4>
              <p>{faq.answer}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FAQs;