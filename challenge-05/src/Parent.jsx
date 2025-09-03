import React, { useState, useCallback } from 'react';
import { Child } from './Child';

export const Parent = () => {
  const list = [2, 4, 6, 8, 10];
  const [valor, setValor] = useState(0);
  const [ultimoNumero, setUltimoNumero] = useState(null); // Nuevo estado

  const increment = useCallback((num) => {
    setValor((prev) => prev + num);
    setUltimoNumero(num); // Guardar el número clickeado
  }, []);

  return (
    <div>
      <h1>Father</h1>
      <p>Total: {valor}</p>
      <p>
        {ultimoNumero !== null && (
          <>Último número clickeado: <strong>{ultimoNumero}</strong></>
        )}
      </p>
      <hr />

      {list.map((n, idx) => (
        <Child
          key={idx}
          numero={n}
          increment={increment}
        />
      ))}
    </div>
  );
};
export default Parent