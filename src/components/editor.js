import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';

class Editor extends Component {
    constructor(props){
        super(props);
        this.handleChange = this.handleChange.bind(this);
    }
    componentDidMount(){
        // // if(localStorage.getItem('redux')){
        // //     // console.log("있어!");
        // //     this.props.editpageload(localStorage.getItem('editpage'));            
        // //     this.props.contentload(localStorage.getItem('content'));
        // // }else{
        // //     this.props.contentinit();
        // //     // console.log("없어!");
        // // }
        // if(localStorage.getItem('redux')){

        // }else{
        //     console.log("gogo!");
        //     this.props.contentinit();
        // }
        // // this.props.contentinit();
    }
    handleChange(e){
        this.props.contentchange(this.props.editpage,e.target.value);
    }
    render() {
        return (
            <div className={this.props.className}>
                {/* <textarea onChange={this.handleChange} type="textarea" value={this.props.mdcontent.getIn([this.props.editpage,'content'])} /> */}
                {<textarea onChange={this.handleChange} type="textarea" value={this.props.mdcontent[this.props.editpage].content} />}
            </div>
        );
    }
}
const stateToProps = (state) => {
    return {
        mdcontent:state.mdcontent.content,
        editpage:state.mdcontent.editpage
    }
}
// const stateToProps = (state) => {
//     return {
//         mdcontent:state.mdcontent.get('content'),
//         editpage:state.mdcontent.get('editpage')
//     }
// }
const dispatchToProps = (dispatch) => {
    return {
        contentchange:(page,content) => {dispatch(actions.change_content(page,content))},
        contentload:(content) => {dispatch(actions.load_content(content))},
        contentinit:() => {dispatch(actions.init_content())},
        editpageload:(page) => {dispatch(actions.load_editpage(page))}
    }
}

export default connect(stateToProps,dispatchToProps)(Editor);