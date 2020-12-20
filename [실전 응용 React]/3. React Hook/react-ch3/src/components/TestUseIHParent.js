import React, { useRef } from 'react';
import TestUseIH from './TestUseIH';

export default function TestUseIHParent() {
  const profileRef = useRef();
  const onClick = () => {
    if(profileRef.current){
      console.log('current name length:', profileRef.current.getNameLength());
      profileRef.current.addAge(5);
    }
  }

  return (
    <div>
      <TestUseIH ref={profileRef}/>
      <button onClick={onClick}>add age 5</button>
    </div>
  );
}