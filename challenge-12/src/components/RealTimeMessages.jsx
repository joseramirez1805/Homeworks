import React, { useState, useEffect, useRef } from 'react';
import { realtimeDb } from '../firebase/config';
import { ref, push, onValue, off, serverTimestamp } from 'firebase/database';

export const RealTimeMessages = () => {
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const [username, setUsername] = useState('');
    const [isConnected, setIsConnected] = useState(false);
    const messagesEndRef = useRef(null);

    // Función para hacer scroll automático al final
    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    // Efecto para scroll automático cuando hay nuevos mensajes
    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    // Configurar listener en tiempo real para mensajes
    useEffect(() => {
        const messagesRef = ref(realtimeDb, 'messages');
        
        // Listener para cambios en tiempo real
        const unsubscribe = onValue(messagesRef, (snapshot) => {
            const data = snapshot.val();
            if (data) {
                // Convertir objeto a array y ordenar por timestamp
                const messagesList = Object.entries(data).map(([id, message]) => ({
                    id,
                    ...message
                })).sort((a, b) => a.timestamp - b.timestamp);
                
                setMessages(messagesList);
                setIsConnected(true);
            } else {
                setMessages([]);
                setIsConnected(true);
            }
        }, (error) => {
            console.error('Error en listener de mensajes:', error);
            setIsConnected(false);
        });

        // Cleanup del listener al desmontar componente
        return () => {
            off(messagesRef, 'value', unsubscribe);
        };
    }, []);

    // Función para enviar mensaje
    const sendMessage = async (e) => {
        e.preventDefault();
        
        if (!newMessage.trim() || !username.trim()) {
            alert('Por favor ingresa tu nombre y un mensaje');
            return;
        }

        try {
            const messagesRef = ref(realtimeDb, 'messages');
            
            await push(messagesRef, {
                text: newMessage.trim(),
                username: username.trim(),
                timestamp: serverTimestamp()
            });

            setNewMessage('');
        } catch (error) {
            console.error('Error enviando mensaje:', error);
            alert('Error al enviar el mensaje. Inténtalo de nuevo.');
        }
    };

    // Función para formatear timestamp
    const formatTime = (timestamp) => {
        if (!timestamp) return '';
        
        const date = new Date(timestamp);
        return date.toLocaleTimeString('es-ES', {
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            height: '100%',
            width: '100%',
            maxWidth: '900px',
            maxHeight: '85vh',
            background: 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(20px)',
            borderRadius: '20px',
            overflow: 'hidden',
            boxShadow: '0 20px 40px rgba(0,0,0,0.1), 0 0 0 1px rgba(255,255,255,0.2)',
            border: '1px solid rgba(255,255,255,0.3)'
        }}>
            {/* Header */}
            <div style={{
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                color: 'white',
                padding: '20px',
                textAlign: 'center',
                position: 'relative',
                boxShadow: '0 4px 15px rgba(0,0,0,0.1)'
            }}>
                <h2 style={{ 
                    margin: 0, 
                    fontSize: '1.8rem',
                    fontWeight: '600',
                    textShadow: '0 2px 4px rgba(0,0,0,0.3)'
                }}>
                    💬 Chat en Tiempo Real
                </h2>
                <div style={{
                    position: 'absolute',
                    top: '20px',
                    right: '20px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    background: 'rgba(255,255,255,0.2)',
                    padding: '8px 12px',
                    borderRadius: '20px',
                    backdropFilter: 'blur(10px)'
                }}>
                    <div style={{
                        width: '12px',
                        height: '12px',
                        borderRadius: '50%',
                        backgroundColor: isConnected ? '#4CAF50' : '#f44336',
                        boxShadow: isConnected ? '0 0 10px rgba(76, 175, 80, 0.5)' : '0 0 10px rgba(244, 67, 54, 0.5)',
                        animation: isConnected ? 'pulse 2s infinite' : 'none'
                    }}></div>
                    <span style={{ 
                        fontSize: '13px',
                        fontWeight: '500',
                        textShadow: '0 1px 2px rgba(0,0,0,0.3)'
                    }}>
                        {isConnected ? 'Conectado' : 'Desconectado'}
                    </span>
                </div>
            </div>

            {/* Mensajes */}
            <div style={{
                flex: 1,
                overflowY: 'auto',
                padding: '20px',
                background: 'linear-gradient(to bottom, #f8f9fa, #ffffff)',
                scrollbarWidth: 'thin',
                scrollbarColor: '#cbd5e0 transparent'
            }}>
                {messages.length === 0 ? (
                    <div style={{
                        textAlign: 'center',
                        color: '#6b7280',
                        marginTop: '60px',
                        padding: '40px'
                    }}>
                        <div style={{
                            fontSize: '4rem',
                            marginBottom: '20px',
                            opacity: 0.5
                        }}>
                            💭
                        </div>
                        <h3 style={{
                            margin: '0 0 10px 0',
                            fontSize: '1.5rem',
                            fontWeight: '600',
                            color: '#374151'
                        }}>
                            ¡Inicia la conversación!
                        </h3>
                        <p style={{
                            margin: 0,
                            fontSize: '1rem',
                            opacity: 0.8
                        }}>
                            Sé el primero en escribir un mensaje
                        </p>
                    </div>
                ) : (
                    messages.map((message, index) => (
                        <div
                            key={message.id}
                            style={{
                                marginBottom: '15px',
                                padding: '15px 20px',
                                borderRadius: '20px',
                                background: 'linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)',
                                border: '1px solid rgba(0,0,0,0.05)',
                                boxShadow: '0 2px 10px rgba(0,0,0,0.05)',
                                transform: 'translateY(0)',
                                transition: 'all 0.3s ease',
                                animation: `slideInUp 0.5s ease ${index * 0.1}s both`
                            }}
                            onMouseOver={(e) => {
                                e.target.style.transform = 'translateY(-2px)';
                                e.target.style.boxShadow = '0 4px 20px rgba(0,0,0,0.1)';
                            }}
                            onMouseOut={(e) => {
                                e.target.style.transform = 'translateY(0)';
                                e.target.style.boxShadow = '0 2px 10px rgba(0,0,0,0.05)';
                            }}
                        >
                            <div style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                marginBottom: '8px'
                            }}>
                                <strong style={{ 
                                    color: '#667eea',
                                    fontSize: '14px',
                                    fontWeight: '600',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '6px'
                                }}>
                                    <span style={{
                                        background: 'linear-gradient(135deg, #667eea, #764ba2)',
                                        borderRadius: '50%',
                                        width: '24px',
                                        height: '24px',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        fontSize: '12px'
                                    }}>
                                        👤
                                    </span>
                                    {message.username}
                                </strong>
                                <span style={{
                                    fontSize: '11px',
                                    color: '#9ca3af',
                                    background: 'rgba(0,0,0,0.05)',
                                    padding: '4px 8px',
                                    borderRadius: '10px',
                                    fontWeight: '500'
                                }}>
                                    {formatTime(message.timestamp)}
                                </span>
                            </div>
                            <p style={{
                                margin: 0,
                                wordWrap: 'break-word',
                                fontSize: '15px',
                                lineHeight: '1.5',
                                color: '#374151'
                            }}>
                                {message.text}
                            </p>
                        </div>
                    ))
                )}
                <div ref={messagesEndRef} />
            </div>

            {/* Formulario para enviar mensajes */}
            <div style={{
                padding: '25px',
                background: 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)',
                borderTop: '1px solid rgba(0,0,0,0.1)'
            }}>
                <form onSubmit={sendMessage} style={{ 
                    display: 'flex', 
                    gap: '15px', 
                    flexWrap: 'wrap',
                    alignItems: 'flex-end'
                }}>
                    <div style={{ flex: '1', minWidth: '150px' }}>
                        <label style={{
                            display: 'block',
                            fontSize: '12px',
                            fontWeight: '600',
                            color: '#6b7280',
                            marginBottom: '5px',
                            textTransform: 'uppercase',
                            letterSpacing: '0.5px'
                        }}>
                            Nombre
                        </label>
                        <input
                            type="text"
                            placeholder="Tu nombre de usuario"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            style={{
                                width: '100%',
                                padding: '12px 16px',
                                border: '2px solid #e5e7eb',
                                borderRadius: '12px',
                                fontSize: '14px',
                                background: 'white',
                                color: '#374151',
                                transition: 'all 0.3s ease',
                                boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
                                WebkitTextSecurity: 'none',
                                textSecurity: 'none'
                            }}
                            onFocus={(e) => {
                                e.target.style.borderColor = '#667eea';
                                e.target.style.boxShadow = '0 0 0 3px rgba(102, 126, 234, 0.1)';
                            }}
                            onBlur={(e) => {
                                e.target.style.borderColor = '#e5e7eb';
                                e.target.style.boxShadow = '0 2px 4px rgba(0,0,0,0.05)';
                            }}
                        />
                    </div>
                    
                    <div style={{ flex: '2', minWidth: '250px' }}>
                        <label style={{
                            display: 'block',
                            fontSize: '12px',
                            fontWeight: '600',
                            color: '#6b7280',
                            marginBottom: '5px',
                            textTransform: 'uppercase',
                            letterSpacing: '0.5px'
                        }}>
                            Mensaje
                        </label>
                        <input
                            type="text"
                            placeholder="Escribe tu mensaje aquí..."
                            value={newMessage}
                            onChange={(e) => setNewMessage(e.target.value)}
                            style={{
                                width: '100%',
                                padding: '12px 16px',
                                border: '2px solid #e5e7eb',
                                borderRadius: '12px',
                                fontSize: '14px',
                                background: 'white',
                                color: '#374151',
                                transition: 'all 0.3s ease',
                                boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
                                WebkitTextSecurity: 'none',
                                textSecurity: 'none'
                            }}
                            onFocus={(e) => {
                                e.target.style.borderColor = '#667eea';
                                e.target.style.boxShadow = '0 0 0 3px rgba(102, 126, 234, 0.1)';
                            }}
                            onBlur={(e) => {
                                e.target.style.borderColor = '#e5e7eb';
                                e.target.style.boxShadow = '0 2px 4px rgba(0,0,0,0.05)';
                            }}
                        />
                    </div>
                    
                    <button
                        type="submit"
                        disabled={!newMessage.trim() || !username.trim()}
                        style={{
                            padding: '12px 24px',
                            background: newMessage.trim() && username.trim() 
                                ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' 
                                : '#d1d5db',
                            color: 'white',
                            border: 'none',
                            borderRadius: '12px',
                            cursor: newMessage.trim() && username.trim() ? 'pointer' : 'not-allowed',
                            fontSize: '14px',
                            fontWeight: '600',
                            transition: 'all 0.3s ease',
                            boxShadow: newMessage.trim() && username.trim() 
                                ? '0 4px 15px rgba(102, 126, 234, 0.3)' 
                                : '0 2px 4px rgba(0,0,0,0.1)',
                            opacity: newMessage.trim() && username.trim() ? 1 : 0.6,
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px'
                        }}
                        onMouseOver={(e) => {
                            if (newMessage.trim() && username.trim()) {
                                e.target.style.transform = 'translateY(-2px)';
                                e.target.style.boxShadow = '0 6px 20px rgba(102, 126, 234, 0.4)';
                            }
                        }}
                        onMouseOut={(e) => {
                            if (newMessage.trim() && username.trim()) {
                                e.target.style.transform = 'translateY(0)';
                                e.target.style.boxShadow = '0 4px 15px rgba(102, 126, 234, 0.3)';
                            }
                        }}
                    >
                        📤 Enviar
                    </button>
                </form>
                
                <div style={{
                    marginTop: '15px',
                    fontSize: '12px',
                    color: '#6b7280',
                    textAlign: 'center',
                    background: 'rgba(255,255,255,0.7)',
                    padding: '10px',
                    borderRadius: '8px',
                    backdropFilter: 'blur(10px)'
                }}>
                    💡 <strong>Tip:</strong> Escribe tu nombre y mensaje, luego presiona Enter o haz clic en Enviar
                </div>
            </div>
        </div>
    );
};
