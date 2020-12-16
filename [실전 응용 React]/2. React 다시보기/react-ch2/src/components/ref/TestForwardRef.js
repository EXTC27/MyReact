import React, { useRef, useEffect } from 'react';

export default function TestForwardRef() {
  const inputRef = useRef();
  useEffect(() => {
    inputRef.current.focus();
  }, []);

  return (
    <div>
      <TextInput ref={inputRef}/>
      <button onClick={() => inputRef.current.focus()}>텍스트로 이동</button>
    </div>
  )
}

const TextInput = React.forwardRef((props, ref) => (
  <div>
    <input type="text" ref={ref}/>
    <button>저장</button>
  </div>
));