import React from 'react';
import { RealTimeMessages } from './RealTimeMessages';

export const App = () => {
    return (
        <div style={{
            height: '100vh',
            width: '100vw',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
            display: 'flex',
            flexDirection: 'column',
            margin: 0,
            padding: 0,
            overflow: 'hidden'
        }}>
            {/* Header */}
            <header style={{
                background: 'rgba(255, 255, 255, 0.1)',
                backdropFilter: 'blur(10px)',
                color: 'white',
                padding: '20px 0',
                textAlign: 'center',
                boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                borderBottom: '1px solid rgba(255,255,255,0.2)',
                flexShrink: 0
            }}>
                <h1 style={{ 
                    margin: 0, 
                    fontSize: '2.5rem',
                    fontWeight: '700',
                    textShadow: '0 4px 8px rgba(0,0,0,0.3)',
                    background: 'linear-gradient(45deg, #fff, #f0f8ff)',
                    backgroundClip: 'text',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent'
                }}>
                    💬 Chat en Tiempo Real
                </h1>
                <p style={{ 
                    margin: '10px 0 0 0', 
                    fontSize: '1rem', 
                    opacity: 0.9,
                    fontWeight: '300',
                    textShadow: '0 2px 4px rgba(0,0,0,0.3)'
                }}>
                    Conecta y conversa con otros usuarios instantáneamente
                </p>
            </header>

            {/* Main Content */}
            <main style={{
                flex: 1,
                padding: '20px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                overflow: 'hidden'
            }}>
                <RealTimeMessages />
            </main>

            {/* Footer */}
            <footer style={{
                background: 'rgba(255, 255, 255, 0.1)',
                backdropFilter: 'blur(10px)',
                color: 'white',
                textAlign: 'center',
                padding: '15px',
                borderTop: '1px solid rgba(255,255,255,0.2)',
                flexShrink: 0
            }}>
                <p style={{ 
                    margin: 0, 
                    opacity: 0.8,
                    fontSize: '0.9rem',
                    fontWeight: '300'
                }}>
                </p>
            </footer>
        </div>
    );
};
