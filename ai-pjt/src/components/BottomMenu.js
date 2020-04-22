import React, { Component } from 'react';
import styled from 'styled-components';
import {Storage} from '../Storage';
import {IconButton, } from '@material-ui/core';
import {Photo, Crop, Cached, FlipToFront, Tune, NaturePeople, Face, LocalOffer} from '@material-ui/icons';

class BottomMenu extends Component {

  render(){
    return(
      <Storage.Consumer>
      {
        store => (
          <StBottomMenuCont>
            <StButtonCont id="원본" mode={store.mode} onClick={store.changeMode}>
              <Photo/>
              <label>원본</label>
            </StButtonCont>

            <StButtonCont id="자르기" mode={store.mode} onClick={store.changeMode}>
              <Crop/>
              <label>자르기</label>
            </StButtonCont>

            <StButtonCont id="회전" mode={store.mode} onClick={store.changeMode}>
              <Cached/>
              <label>회전</label>
            </StButtonCont>

            <StButtonCont id="필터" mode={store.mode} onClick={store.changeMode}>
              <FlipToFront/>
              <label>필터</label>
            </StButtonCont>

            <StButtonCont id="조정" mode={store.mode} onClick={store.changeMode}>
              <Tune/>
              <label>조정</label>
            </StButtonCont>

            <StButtonCont id="객체찾기" mode={store.mode} onClick={store.changeMode}>
              <NaturePeople/>
              <label>객체찾기</label>
            </StButtonCont>

            <StButtonCont id="얼굴인식" mode={store.mode} onClick={store.changeMode}>
              <Face/>
              <label>얼굴인식</label>
            </StButtonCont>

            <StButtonCont id="태그생성" mode={store.mode} onClick={store.changeMode}>
              <LocalOffer/>
              <label>태그생성</label>
            </StButtonCont>
          </StBottomMenuCont>
        )
      }
      </Storage.Consumer>
    )
  }

} export default BottomMenu;

const StBottomMenuCont = styled.div`
  display: flex;
  overflow: scroll;
  justify-content: flex-start;
  background: linear-gradient(to top, #ccffff 0%, #ffffff 100%);
  box-sizing: border-box;  
  border-radius: 8px 8px 0 0;
  width: 100%;
`;

// const StButtonListCont = styled.div`
//   display: flex;
//   flex-wrap: nowrap;
//   transform: translateZ(0);
//   -ms-overflow-style: none;
//   &::-webkit-scrollbar { 
//     display: none
//   }
//   scroll-behavior: smooth;
// `;

const StButtonCont = styled(IconButton)`
  width: 3em;
  color: ${props => props.mode === props.id ? "gray" : "black"};

  .MuiIconButton-label{
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  label{
    padding-top: 2px;
    font-size: 60%;
  }
`