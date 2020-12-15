import React, { useState, useEffect } from 'react';

export default function TestUE(){
  const [count, setCount] = useState(0);
  useEffect(() => {
    document.title = `업데이트 횟수: ${count}`;
  });

  console.log('render TestUE')
  return(
    <button onClick={() => setCount(count + 1)}>+</button>
  );
}