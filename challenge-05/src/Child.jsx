import React from 'react';

export const Child = React.memo(({ numero, increment }) => {
  console.log("Child rendered:", numero);

  return (
    <button
      className="btn btn-primary mr-3"
      onClick={() => increment(numero)}
    >
      {numero}
    </button>
  );
});
