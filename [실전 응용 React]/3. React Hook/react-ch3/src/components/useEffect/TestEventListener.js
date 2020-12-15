import React, { useState, useEffect } from 'react';

export default function TestEventListener(){
  const [width, setWidth] = useState(window.innerWidth);
  useEffect(() => {
    const onResize = () => setWidth(window.innerWidth);
    window.addEventListener('resize', onResize);

    return () => {
      console.log('unmount TestEventListener');
      window.removeEventListener('resize', onResize);
    };
  }, []);

  console.log('render TestEventListener')
  return (
    <div>{`width is ${width}`}</div>
  )
}
