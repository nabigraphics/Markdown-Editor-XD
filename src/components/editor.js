import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';

class Editor extends Component {
    constructor(props){
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.getSelection = this.getSelection.bind(this);
        this.selectionEvent = this.selectionEvent.bind(this);
        this.state = {
            selEventList:['click','select','focus','keyup'],
            selection:{
                startOffset:0,
                endOffset:0
            }
        };
    }
    selectionEvent(){
        let temp_selection = this.getSelection(this.editarea);
        if(temp_selection.startOffset !== this.props.offset.startOffset || temp_selection.endOffset !== this.props.offset.endOffset){
            this.props.selectionchange(this.getSelection(this.editarea));   
        }
    }
    getSelection(e){
        return {
            startOffset:e.selectionStart,
            endOffset:e.selectionEnd
        }
    }
    componentDidMount(){
        const addEvent = () => this.state.selEventList.map((eventType) => {
            this.editarea.addEventListener(eventType,this.selectionEvent);
        })
        addEvent();
    }
    componentWillUnmount(){
        const removeEvent = () => this.state.selEventList.map((eventType) => {
            this.editarea.removeEventListener(eventType,this.selectionEvent);
        })
        removeEvent();
    }
    handleChange(e){
        this.props.contentchange(this.props.editpage,e.target.value);
    }
    render() {
        return (
            <div className={this.props.className}>
                {<textarea ref={r => { this.editarea = r }} onChange={this.handleChange} type="textarea" value={this.props.mdcontent[this.props.editpage].content} />}
            </div>
        );
    }
}
const stateToProps = (state) => {
    return {
        mdcontent:state.mdcontent.content,
        editpage:state.mdcontent.editpage,
        offset:state.mdcontent.selection
    }
}

const dispatchToProps = (dispatch) => {
    return {
        contentchange:(page,content) => {dispatch(actions.change_content(page,content))},
        contentload:(content) => {dispatch(actions.load_content(content))},
        contentinit:() => {dispatch(actions.init_content())},
        editpageload:(page) => {dispatch(actions.load_editpage(page))},
        selectionchange:(offset) => {dispatch(actions.change_selection(offset))}
    }
}

export default connect(stateToProps,dispatchToProps)(Editor);