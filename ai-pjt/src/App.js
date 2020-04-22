import React, {Component} from 'react';
import { Route, withRouter} from 'react-router-dom';
import styled from 'styled-components';
import {Storage} from './Storage'
import MainPage from './components/MainPage'
import EditorPage from './components/EditorPage'

class App extends Component{
  // static contextType = ImageStorage

  constructor(props){
    super(props)
    this.state = {
      imgFile: '',
      imgURL: '',
      imgUpload: this.imgUpload,
      imgInit: this.imgInit,
      innerW: window.innerWidth,
      innerH: window.innerHeight
    }
  }

  imgUpload = (e) => {
    e.preventDefault();
    let reader = new FileReader();
    let _imgFile = e.target.files[0];
    reader.onloadend = () => {      
      this.setState({
        imgFile: _imgFile,
        imgURL: reader.result,
      });
      this.props.history.push('Editor')
    }
    reader.readAsDataURL(_imgFile)
  }
  imgInit = () => {
    this.setState({
      imgFile: '',
      imgURL: ''
    })
    this.props.history.push('/')
  }

  // componentDidMount(){
  //   window.addEventListener('resize', this.changeSize)
  // }
  componentWillUnmount(){
    // window.removeEventListener('resize', this.changeSize)
    sessionStorage.clear()
  }
  // changeSize = () => {
  //   this.setState({
  //     innerW: window.innerWidth,
  //     innerH: window.innerHeight,
  //   })
  // }

  render(){
    return(
      // <AppContainer className="app" width={window.innerWidth} height={window.innerHeight}>
      <div className="app">
        <Storage.Provider value={this.state}>
          <Route exact path="/" component={MainPage} />
          <Route path="/Editor" component={EditorPage} />
        </Storage.Provider>
      </div>
      // </AppContainer>
    )
  }
}
export default withRouter(App);

// const AppContainer = styled.div`
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   background-color: mintcream;
//   width: ${props => props.width}px;
//   height: ${props => props.height}px;
// `