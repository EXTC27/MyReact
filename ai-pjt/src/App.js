import React, {Component} from 'react';
import { Route, withRouter } from 'react-router-dom';
import styled from 'styled-components';
import MainPage from './components/MainPage'

class App extends Component{
  constructor(props){
    super(props)
    this.state = {
      winWidth: window.innerWidth,
      winHeight: window.innerHeight
    }
  }
  componentDidMount(){
    window.addEventListener('resize', this.changeSize);
  }
  componentWillUnmount(){
    window.removeEventListener('resize', this.changeSize)
  }
  changeSize = () => {
    this.setState({ 
      winWidth: window.innerWidth,
      winHeight: window.innerHeight
    });
  };

  render(){
    return(
      <AppContainer className="app" width={this.state.winWidth} height={this.state.winHeight}>
        <Route exact path="/" component={MainPage} />
      </AppContainer>
    )
  }
}
export default App;

const AppContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #E6E6FA;
  width: ${props => props.width}px;
  height: ${props => props.height}px;
`