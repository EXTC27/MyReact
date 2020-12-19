import React, { useState, useEffect, useContext } from 'react';

const UserContext = React.createContext();
const user = { name: 'SinJ', age: 27 };

export default function TestUserContext() {
  return (
    <UserContext.Provider value={user}>
      <Child/>
    </UserContext.Provider>
  );
}

function Child() {
  const user = useContext(UserContext);
  console.log(user);

  return (
    <>
      <p>{`name is ${user.name}`}</p>
      <p>{`age is ${user.age}`}</p>
      <br/>
      <UserContext.Consumer>
        {user => (
          <>
            <p>{`name is ${user.name}`}</p>
            <p>{`age is ${user.age}`}</p>
          </>
        )}
      </UserContext.Consumer>
    </>
  );
}