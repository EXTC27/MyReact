import React, { Component } from 'react';
import {IconButton, Slide} from '@material-ui/core';
import {CameraAlt} from '@material-ui/icons'
import styled from 'styled-components';

class MainPage extends Component {
  render(){
    return(
      <div className="mainPage">
        <Slide in={true} direction="left" >
          <div>
            <StBtn>
              <CameraAlt/>
            </StBtn>
          </div>
        </Slide>
      </div>
    )
  }
}
export default MainPage;


const StBtn = styled.div`
  border: 5px solid mintcream;
  border-radius: 10px;
  background-color: gray;
  .MuiSvgIcon-root{
    display: flex;
    justify-content: center;
    align-items: center;
    width: 5em;
    height: 5em;
  }
`