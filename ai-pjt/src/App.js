import React, {Component} from 'react';
import {Route, withRouter} from 'react-router-dom';
import {Storage} from './components/Storage'
import MainPage from './components/MainPage'
import EditorPage from './components/EditorPage'
import {Image,} from "react-konva";

class App extends Component{

  constructor(props){
    super(props)
    this.state = {
      innerW: window.innerWidth,
      innerH: window.innerHeight,

      imgFile: '',
      imgURL: '',
      imgList: [],
      imgUpload: this.imgUpload,
      imgInit: this.imgInit,

      backToMain: this.backToMain,

      curMode: '',
      changeMode: this.changeMode,

      confirm: this.confirm,
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

  imgInit = (_img) => {
    this.setState({
      imgList: this.state.imgList.concat(
        <Image key={0} id="origin" image={_img}/>
      )
    })
  }

  backToMain = () => {
    this.setState({
      imgFile: '',
      imgURL: '',
      imgList: [],
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

  confirm = (e) => {
    const _confirm = e.currentTarget.id

    if(this.state.curMode === 'origin'){
      if(_confirm === 'yes'){
        this.setState({
          curMode: '',
          imgList: [this.state.imgList[0]],
        })
      }
      else{
        this.setState({
          curMode: ''
        })
      }
    }

    else if(this.state.curMode === 'backToMain'){
      if(_confirm === 'yes'){
        this.backToMain()
      }
      else{
        this.setState({
          curMode: ''
        })
      }
    }
  }


  render(){
    return(
      <div className="app">
        <Storage.Provider value={this.state}>
          <Route exact path="/" component={MainPage} />
          <Route path="/Editor" component={EditorPage} />
        </Storage.Provider>
      </div>
    )
  }
}
export default withRouter(App);