import React, { Component } from 'react';
import {Storage} from '../Storage';
import TopMenu from './TopMenu';
import BottomMenu from './BottomMenu';
import Canvas from './Canvas';
import styled from 'styled-components';
import {Slide} from '@material-ui/core';

class EditorPage extends Component {

  // componentDidMount(){
  //   document.getElementById('save').addEventListener(
  //     'click',
  //     () => {
  //       var stage = document.getElementsByTagName('canvas')[0]
  //       var dataURL = stage.toDataURL("image/png");
  //       this.downloadURI(dataURL, 'stage.png');
  //     },
  //     false
  //   );
  // }

  // downloadURI = (uri, name) => {
  //   var link = document.createElement('a');
  //   link.download = name;
  //   link.href = uri;
  //   document.body.appendChild(link);
  //   link.click();
  //   document.body.removeChild(link);
  // }

  render(){
    sessionStorage.setItem('curPage', 'editor')
    
    return(
      <Storage.Consumer>
      {store => (
        <Slide in={true} direction="left">
          <StEditorCont className="editor" width={store.innerW} height={store.innerH}>
            <TopMenu/>
            <Canvas src={store.imgURL} width={store.innerW} height={store.innerH}/>
            <BottomMenu/>
          </StEditorCont>
        </Slide>
      )}
      </Storage.Consumer>
    )
  }
} export default EditorPage;

const StEditorCont = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  background-color: black;
  width: ${props => props.width}px;
  height: ${props => props.height}px;
`;
