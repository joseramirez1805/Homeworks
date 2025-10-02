import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { increment, decrement, incrementBy } from './slices/counterSlice';
import { push, pop } from './slices/stackSlice';

function App() {
  const counter = useSelector((state) => state.counter.value);
  const stackItems = useSelector((state) => state.stack.items);
  const dispatch = useDispatch();

  const [incrementValue, setIncrementValue] = useState();
  const [stackItem, setStackItem] = useState('');

  const handleIncrementBy = () => {
    const value = parseInt(incrementValue, 10);
    if (!isNaN(value)) {
      dispatch(incrementBy(value));
      setIncrementValue(0);
    }
  };

  const handlePush = () => {
    if (stackItem.trim()) {
      dispatch(push(stackItem));
      setStackItem('');
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Redux Challenge 10</h1>
      
      <h2>Counter: {counter}</h2>
      <button onClick={() => dispatch(increment())}>Increment</button>
      <button onClick={() => dispatch(decrement())}>Decrement</button>
      
      <div style={{ marginTop: '20px' }}>
        <input
          type="number"
          value={incrementValue}
          onChange={e => setIncrementValue(Number(e.target.value))}
        />
        <button onClick={() => dispatch(incrementBy(incrementValue))}>
          Increment
        </button>
      </div>
      
      <h2>Stack: {stackItems.join(', ')}</h2>
      <input 
        type="text" 
        value={stackItem} 
        onChange={(e) => setStackItem(e.target.value)} 
        placeholder="Ítem para push" 
      />
      <button onClick={handlePush}>Push</button>
      <button onClick={() => dispatch(pop())}>Pop</button>
    </div>
  );
}

export default App;