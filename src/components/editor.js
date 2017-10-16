import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';

class Editor extends Component {
    constructor(props){
        super(props);
        this.handleChange = this.handleChange.bind(this);
    }
    componentDidMount(){
        if(localStorage.getItem('content')){
            // console.log("있어!");
            this.props.contentchange(localStorage.getItem('content'));
        }else{
            // console.log("없어!");
        }
    }
    handleChange(e){
        localStorage.setItem('content',e.target.value);
        this.props.contentchange(e.target.value);
    }
    render() {
        return (
            <div className={this.props.className}>
                <textarea onChange={this.handleChange} type="textarea" value={this.props.mdcontent} />
            </div>
        );
    }
}
const stateToProps = (state) => {
    return {
        mdcontent:state.mdcontent.content
    }
}
const dispatchToProps = (dispatch) => {
    return {
        contentchange:(content) => {dispatch(actions.change_content(content))}
    }
}

export default connect(stateToProps,dispatchToProps)(Editor);