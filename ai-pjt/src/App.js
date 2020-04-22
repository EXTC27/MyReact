import React, {Component} from 'react';
import { Route, withRouter} from 'react-router-dom';
import {Storage} from './components/Storage'
import MainPage from './components/MainPage'
import EditorPage from './components/EditorPage'

class App extends Component{

  constructor(props){
    super(props)
    this.state = {
      imgFile: '',
      imgURL: '',
      imgUpload: this.imgUpload,
      backToMain: this.backToMain,

      innerW: window.innerWidth,
      innerH: window.innerHeight,

      curMode: '',
      changeMode: this.changeMode,

      confirmToOrigin: this.confirmToOrigin,
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

  backToMain = () => {
    this.setState({
      imgFile: '',
      imgURL: '',
      curMode: '',
    })    
    this.props.history.push('/')
  }

  changeMode = (e) => {
    const _curMode = e.currentTarget.id
    if(_curMode === 'close'){
      this.setState({
        curMode: ''
      })
      sessionStorage.setItem('curMode', '')
    }
    else{
      this.setState({
        curMode: _curMode
      })
      sessionStorage.setItem('curMode', _curMode)
    }
  }

  confirmToOrigin = (e) => {
    const _confirm = e.currentTarget.id
    if(_confirm === "yes"){
      this.setState({
        curMode: ''
      })
    }
    else{
      this.setState({
        curMode: ''
      })
    }
  }

  // componentDidMount(){
  //   window.addEventListener('resize', this.changeSize)
  // }
  
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