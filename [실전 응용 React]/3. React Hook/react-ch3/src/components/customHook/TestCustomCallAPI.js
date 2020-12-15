import React, { useState, useEffect } from 'react';

function getUserAPI(userId){
  return new Promise((resolve, reject) => {
    if(userId === 'SinJ27'){
      resolve({ name: 'SinJ', age: 27 });
    }
  });
}

function useUser(userId){
  const [user, setUser] = useState(null);
  useEffect(() => {
    getUserAPI(userId).then(data => setUser(data));
  }, [userId]);
  return user;
}

export default function TestCustomCallAPI({ userId }){
  const user = useUser(userId);
  return(
    <div>
      {!user && <p>사용자 정보를 가져오는 중..</p>}
      {user && (
        <>
          <p>{`name is ${user.name}`}</p>
          <p>{`age is ${user.age}`}</p>
        </>
      )}
    </div>
  );
}