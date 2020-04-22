import React, { Component } from 'react';
import styled from 'styled-components';
import {Storage} from '../Storage';
import Setting from '../Settings/Setting';
import {KeyboardArrowDown} from '@material-ui/icons';


class DrawerMenu extends Component{
  render(){
    return(
      <Storage.Consumer>
      {
        store => (
          <StDrawerMenuCont>
            <KeyboardArrowDown id="close" fontSize="large" onClick={store.changeMode}/>
              <StSettingCont>
                {/* <Setting mode={store.curMode}/> */}
              </StSettingCont>
          </StDrawerMenuCont>
        )
      }
      </Storage.Consumer>
    )
  }
} export default DrawerMenu;

const StDrawerMenuCont = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  /* background-color: #BF364F; */
  background: linear-gradient(to top, #ccffff 0%, #ffccff 100%);
  border-radius: 8px 8px 0 0;
  width: 100%;
  height: 30%;
  z-index: 2;
  position: fixed;
  bottom: 0;
`;

const StSettingCont = styled.div`
  box-sizing: border-box;
  border: 3px solid gray;
  width: 100%;
  height: 100%;
`;