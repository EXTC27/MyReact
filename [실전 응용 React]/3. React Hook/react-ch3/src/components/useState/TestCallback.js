import React, { useState } from 'react';

export default function TestCallback(){
  const [count, setCount] = useState(0);
  function onClick(){
    setCount(prev => prev + 1);
    setCount(prev => prev + 1);
  }

  console.log('render TestCallback');
  return(
    <div>
      <h3>{count}</h3>
      <button onClick={onClick}>+</button>
    </div>
  );
}