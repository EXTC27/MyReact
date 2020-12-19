import React, { useState, useCallback } from 'react';

const INITIAL_TEXT = '안녕하세요';

export default function TestFuncRef2() {
  const [text, setText] = useState(INITIAL_TEXT);
  const [showText, setShowText] = useState(true);

  const setInitialText = useCallback(
    ref => ref && setText(INITIAL_TEXT),
    []);

  return (
    <div>
      {showText && (
        <input 
          type="text"
          ref={setInitialText}
          value={text}
          onChange={e => setText(e.target.value)}
        />
      )}
      <button onClick={() => setShowText(!showText)}>
        보이기/가리기
      </button>
    </div>
  );
}
