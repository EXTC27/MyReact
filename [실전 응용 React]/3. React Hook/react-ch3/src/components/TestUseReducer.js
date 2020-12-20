import React, { useReducer } from 'react';

const INITIAL_STATE = { name: 'empty', age: 0 };
function reducer(state, action) {
  switch (action.type){
    case 'setName':
      return { ...state, name: action.name };
    case 'setAge':
      return { ...state, age: action.age };
    default:
      return state;
  }
}

export default function TestUseReducer() {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);
  return (
    <div>
      <p>{`name is ${state.name}`}</p>
      <p>{`age is ${state.age}`}</p>
      <input
        type="text"
        value={state.name}
        onChange={e => dispatch({ type: 'setName', name: e.currentTarget.value })}
      />
      <input
        type="text"
        value={state.age}
        onChange={e => dispatch({ type: 'setAge', age: e.currentTarget.value })}
      />
    </div>
  );
}