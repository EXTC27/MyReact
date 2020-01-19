import React, { Component } from 'react';
import TopBar from './components/TopBar';
import { Grid } from '@material-ui/core';
import './App.css';


class App extends Component {

  render() {
    return (
      <div className="App">
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <TopBar/>
          </Grid>
          <Grid item></Grid>
        </Grid>        
      </div>
    );
  }
}

export default App;
