import React, { useState, useEffect } from 'react';

function useMounted(){
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  return mounted;
}

export default function TestCustomMounted(){
  const mounted = useMounted();
  console.log(mounted);
  return(
    <div>{`is mounted? ${mounted}`}</div>
  )
}