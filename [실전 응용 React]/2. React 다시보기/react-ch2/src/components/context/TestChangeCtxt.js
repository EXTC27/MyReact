import React, { useState, useEffect } from 'react';

const UserContext = React.createContext({ username: "", helloCount: 0 });
const SetUserContext = React.createContext(() => {});

export default function TestChangeCtxt() {
  const [user, setUser] = useState({ username: 'SinJ', helloCount: 0 });

  return (
    <div>
      <SetUserContext.Provider value={setUser}>
        <UserContext.Provider value={user}>
          <Profile/>
        </UserContext.Provider>
      </SetUserContext.Provider>
    </div>
  );
}

function Profile() {
  return (
    <div>
      <Greeting/>
    </div>
  );
}

function Greeting() {
  return (
    <SetUserContext.Consumer>
      {setUser => (
        <UserContext.Consumer>
          {({username, helloCount}) => (
            <>
              <p>{`${username}님 안녕하세요`}</p>
              <p>{`인사 횟수: ${helloCount}`}</p>
              <button
                onClick={() => setUser({username, helloCount: helloCount + 1})}
              >
                인사하기
              </button>
            </>
          )}
        </UserContext.Consumer>
      )}
    </SetUserContext.Consumer>
  );
}