import React, { useState, useEffect } from 'react';

function useWindowWidth(){
  const [width, setWidth] = useState(window.innerWidth);
  useEffect(() => {
    const onResize = () => setWidth(window.innerWidth);
    window.addEventListener('resize', onResize);
    return () => {
      window.removeEventListener('resize', onResize);
    }
  }, []);
  return width;
}

export default function TestCustomEventListener(){
  const width = useWindowWidth();
  return (
    <div>{`width is ${width}`}</div>
  )
}
