import React from 'react';
import { BrowserRouter, Route, Link } from 'react-router-dom';
import Rooms from './Rooms.js';

export default function RRD(){
  return (
    <BrowserRouter>
      <div style={{ padding: 20, border: '5px solid gray' }}>
        <Link to="/">홈</Link>
        <br/>
        <Link to="/photo">사진</Link>
        <br/>
        <Link to="/rooms">방 소개</Link>
        <Route exact path="/" component={Home}/>
        <Route path="/photo" component={Photo}/>
        <Route path="/rooms" component={Rooms}/>
      </div>
    </BrowserRouter>
  )
}

function Home({ match }){
  return <h2>HOME</h2>
}

function Photo({ match }){
  return <h2>Photo</h2>
}