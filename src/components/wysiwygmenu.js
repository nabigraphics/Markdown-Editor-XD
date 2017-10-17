import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';
import { notipoi } from './react-notipoix3';
import { uniqueId } from 'lodash';
class Wysiwygmenu extends Component {
    constructor(props){
        super(props);
        this.handleClick = this.handleClick.bind(this);
        this.onDownload = this.onDownload.bind(this);
        this.queueFile = this.queueFile.bind(this);
    }
    queueFile(e){
        // console.log(e.target);
        console.log(e.target.files[0]);
        const tempfilename = e.target.files[0].name;
        const file_len = tempfilename.length;
        const lastdot = tempfilename.lastIndexOf(".");
        const file_dotcut = tempfilename.substring(0,lastdot);
        const reader = new FileReader();
        reader.addEventListener('loadend',() => {
            this.props.document_load(file_dotcut,reader.result);
            notipoi.add('blue',uniqueId("import_success_"), tempfilename + " 파일 추가!");
            this.import_refs.value = null;
        })
        reader.readAsText(e.target.files[0]);
    }
    onDownload(){
        let temp_element = document.createElement("a");
        const file = new Blob([this.props.content[this.props.editpage].content],{type: 'text/markdown'});
        // console.log(URL.createObjectURL(file));
        temp_element.href = URL.createObjectURL(file);
        temp_element.download =  this.props.content[this.props.editpage].filename + ".md";
        temp_element.click();
        notipoi.add('success',uniqueId("export_success_"),this.props.content[this.props.editpage].filename + ".md" + " 파일 저장!");
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
          case "Strikethrough":
            md_convert = "~~" + temp_content + "~~"
          break;
          case "Quote":
            md_convert = "> " + temp_content;
        break;
          case "List Bulleted":
            md_convert = "- " + temp_content;
          break;
          case "List Numbered":
            md_convert = "1. " + temp_content;
          break;
          case "Line":
            md_convert =  temp_content + '\n' + "---";
          break;
          case "Insert Code":
            md_convert = "`" + temp_content + "`"
          break;
          case "Insert Link":
            md_convert = "[" + temp_content + "]" + "(" + temp_content + ")"
          break;
          case "Insert Photo":
            md_convert = "![" + temp_content + "]" + "(" + temp_content + ")"
          break;
        }
        // console.log(md_convert);
        this.props.wysiwyginsert(this.props.editpage,this.props.offset,md_convert);
    }
    render() {
        return (
            <div className="wysiwyg">
            <ul className="wysiwygmenu">
                <li>
                <i className="material-icons wysiwyg_bt" onClick={this.handleClick} title="Bold">format_bold</i>
                <i className="material-icons wysiwyg_bt" onClick={this.handleClick} title="Italic">format_italic</i>
                <i className="material-icons wysiwyg_bt" onClick={this.handleClick} title="Strikethrough">strikethrough_s</i>
                <i className="material-icons wysiwyg_bt" onClick={this.handleClick} title="Quote">format_quote</i>
                </li>
                <li>
                <i className="material-icons wysiwyg_bt" onClick={this.handleClick} title="List Bulleted">format_list_bulleted</i>
                <i className="material-icons wysiwyg_bt" onClick={this.handleClick} title="List Numbered">format_list_numbered</i>
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
                <label style={{"margin":"0"}} className="wysiwyg_bt right" htmlFor="import_file">
                    <input ref={r => {this.import_refs = r}} style={{"display":"none"}} id="import_file" type="file" accept=".md" onChange={this.queueFile}/>
                    <i className="material-icons" style={{"fontSize":"12pt"}} title="Import File">file_upload</i>
                </label>
                <i className="material-icons wysiwyg_bt right" onClick={this.onDownload} title="Export File">save</i>
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
        wysiwyginsert:(page,offset,content) => {dispatch(actions.insert_wysiwyg(page,offset,content))},
        document_load:(filename,content) => {dispatch(actions.load_document(filename,content))}
    }
}

export default connect(stateToProps,dispatchToProps)(Wysiwygmenu);