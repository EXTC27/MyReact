import React, { Component } from 'react';
import './TopBar.scss'

class TopBar extends Component {
    constructor(props){
        super(props);
        this.state = {
            mode: 'phone',
            width: window.innerWidth,
        }
    }
    onChange = () => {
        this.setState({width: window.innerWidth});
        if(window.innerWidth >= 600){
            this.setState({mode: 'computer'})
        }
        else{
            this.setState({mode: 'phone'})
        }
    }

    componentDidMount(){
        window.addEventListener("resize", this.onChange);
    }
    componentWillUnmount(){
        window.removeEventListener("resize", this.onChange)
    }

    render(){
        return(
            <div className="TopBar">
                <div className={this.state.mode}>TopBar {this.state.width}</div>
            </div>
        )       
    }
}

export default TopBar;