import React, { useState } from 'react'

const UserContext = React.createContext('');

export default function TestCtxt2(){
  const [username, setUsername] = useState('');
  console.log('render TestCtxt2');
  return (
    <div>
      <UserContext.Provider value={username}>
        <Profile/>
        <input 
          type="text"
          value={username}
          onChange={e => setUsername(e.target.value)}
        />
      </UserContext.Provider>
    </div>
  )
}

const Profile = React.memo(() => {
  console.log('render Profile');
  return (
    <div>
      <Greeting/>
    </div>
  );
});

function Greeting(){
  return (
    <UserContext.Consumer>
      {username => {
        console.log('render Greeting');
        return <p>{`${username}님 안녕하세요`}</p>
      }}
    </UserContext.Consumer>
  );
}