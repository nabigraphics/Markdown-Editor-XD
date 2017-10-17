import React, { Component } from 'react';
import Documentmenu from '../components/documentmenu';
class Header extends Component {
    constructor(props){
        super(props);
        this.state = {
            isOpen:false
        }
        this.handleClick = this.handleClick.bind(this);
    }
    handleClick(e){
        e.preventDefault();
        this.setState({
            isOpen:!this.state.isOpen
        });
    }
    render() {
        return (
            <div className="header">
                <span>Markdown Editor</span>
                <i className="material-icons hambuger" onClick={this.handleClick}>menu</i>
                <div className={this.state.isOpen ? "nav_bg active" : "nav_bg" }>
                    <Documentmenu isOpen={this.state.isOpen} onClose={this.handleClick}/>
                </div>
            </div>
        );
    }
}

export default Header;