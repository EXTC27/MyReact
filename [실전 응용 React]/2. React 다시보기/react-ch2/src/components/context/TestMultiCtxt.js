import React from 'react'

const UserContext = React.createContext('');
const ThemeContext = React.createContext('dark');

export default function TestMultiCtxt() {
  return (
    <div>
      <ThemeContext.Provider value={'light'}>
        <UserContext.Provider value={'SinJ'}>
          <div>상단 메뉴</div>
          <Profile/>
          <div>하단 메뉴</div>
        </UserContext.Provider>
      </ThemeContext.Provider>
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
    <ThemeContext.Consumer>
      {theme => (
        <UserContext.Consumer>
          {username => (
            <p 
              style={{ color: theme === 'dark' ? 'gray' : 'green' }}
            >{`${username}님 안녕하세요`}</p>
          )}
        </UserContext.Consumer>
      )}
    </ThemeContext.Consumer>
  );
}