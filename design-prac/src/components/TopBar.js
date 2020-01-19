import React, { Component } from 'react';
import SearchIcon from '@material-ui/icons/Search';
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
                <div className="width"> width: {this.state.width}</div>

                <div className="search-container">
                    <SearchIcon className="search-icon"/>
                    <input className="search-input" type="text" placeholder="Search.."/>
                </div>
                <div className={this.state.mode}>Title</div>     
                
            </div>
        )       
    }
}

export default TopBar;