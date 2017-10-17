import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';

class Wysiwygmenu extends Component {
    constructor(props){
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }
    handleClick(e){
        // console.log(e.target.title);

        let md_convert;
        let temp_content = this.props.content[this.props.editpage].content.substring(this.props.offset.startOffset,this.props.offset.endOffset);
        
        console.log(e.target.title);
        switch(e.target.title) {
          case "Bold":
            md_convert = "**" + temp_content + "**"
          break;
          case "Italic":
            md_convert = "_" + temp_content + "_"
          break;
          case "Underlined":
            md_convert = "**";
          break;
          case "Strikethrough":
            md_convert = "**";
          break;
          case "List Bulleted":
            md_convert = "**";
          break;
          case "List Numbered":
            md_convert = "**";
          break;
          case "Quote":
            md_convert = "**";
          break;
          case "Line":
            md_convert = "---";
          break;
          case "Insert Code":
            md_convert = "**";
          break;
          case "Insert Link":
            md_convert = "**";
          break;
          case "Insert Photo":
            md_convert = "**";
          break;
        }
        console.log(md_convert);
        // this.props.wysiwyginsert(this.props.editpage,md_convert);
    }
    render() {
        return (
            <div className="wysiwyg">
            <ul className="wysiwygmenu">
                <li>
                <i className="material-icons wysiwyg_bt" onClick={this.handleClick} title="Bold">format_bold</i>
                <i className="material-icons wysiwyg_bt" onClick={this.handleClick} title="Italic">format_italic</i>
                <i className="material-icons wysiwyg_bt" onClick={this.handleClick} title="Underlined">format_underlined</i>
                <i className="material-icons wysiwyg_bt" onClick={this.handleClick} title="Strikethrough">strikethrough_s</i>
                </li>
                <li>
                <i className="material-icons wysiwyg_bt" onClick={this.handleClick} title="List Bulleted">format_list_bulleted</i>
                <i className="material-icons wysiwyg_bt" onClick={this.handleClick} title="List Numbered">format_list_numbered</i>
                <i className="material-icons wysiwyg_bt" onClick={this.handleClick} title="Quote">format_quote</i>
                <i className="material-icons wysiwyg_bt" onClick={this.handleClick} title="Line">remove</i>
                </li>
                <li>
                <i className="material-icons wysiwyg_bt" onClick={this.handleClick} title="Insert Code">code</i>
                <i className="material-icons wysiwyg_bt" onClick={this.handleClick} title="Insert Link">insert_link</i>
                <i className="material-icons wysiwyg_bt" onClick={this.handleClick} title="Insert Photo">insert_photo</i>
                </li>
            </ul>
            <ul className="wysiwygmenu">
                <li>
                <i className="material-icons wysiwyg_bt" onClick={this.handleClick} title="Import File">file_upload</i>
                <i className="material-icons wysiwyg_bt" onClick={this.handleClick} title="Export File">save</i>
                </li>
            </ul>
            </div>
        );
    }
}
const stateToProps = (state) => {
    return {
        content:state.mdcontent.content,
        editpage:state.mdcontent.editpage,
        offset:state.mdcontent.selection
    }
}
const dispatchToProps = (dispatch) => {
    return {
        wysiwyginsert:(page,content) => {dispatch(actions.insert_wysiwyg(page,content))},
    }
}

export default connect(stateToProps,dispatchToProps)(Wysiwygmenu);