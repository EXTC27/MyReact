import React, { useState } from 'react'

export default function TestBatch(){
  const [count, setCount] = useState({ value: 0 });
  function onClick(){
    setCount({value: count.value + 1});
    setCount({value: count.value + 1});
  }

  console.log('render TestBatch');
  return (
    <div>
      <h3>{count.value}</h3>
      <button onClick={onClick}>+</button>
    </div>
  )
}