import React, { useState } from 'react';

export default function TestOrder(){
  const [count1, setCount1] = useState(0);
  const [count2, setCount2] = useState(0);

  function onClick(){
    setCount1(count1 + 1);
    setCount2(count2 + 1);
  }
  const result = count1 >= count2;
  console.log('render TestOrder');
  return (
    <div>
      <h3>{`count1: ${count1}`}</h3>
      <h3>{`count2: ${count2}`}</h3>
      <h3>{`result: ${result}`}</h3>
      <button onClick={onClick}>+</button>
    </div>
  );
}