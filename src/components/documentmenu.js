import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import * as actions from '../actions';
class DocumentmenuItem extends Component {
    constructor(props){
        super(props);
        this.state = {
            editmode:false,
            filename:this.props.filename
        }
        this.handleBlur = this.handleBlur.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleKeyDown = this.handleKeyDown.bind(this);
    }
    componentWillReceiveProps(nextProps){
        this.setState({
            filename:nextProps.filename
        })
    }
    handleBlur(){
        if(this.state.editmode){
            if(this.state.filename == ""){
                this.props.onEdit(this.props.filename);
            }else{
                this.props.onEdit(this.state.filename);
            }
            this.setState({
                editmode:false
            })
        }
    }
    handleChange(e){
        this.setState({
            filename:e.target.value
        })
    }
    handleKeyDown(e){
        if(e.keyCode == 13){
            if(this.state.filename == ""){
                this.props.onEdit(this.props.filename);
            }else{
                this.props.onEdit(this.state.filename);
            }
            this.setState({
                editmode:false
            })
        }
    }
    render() {
        if(this.state.editmode){
            return (
                <input type="text" placeholder={this.props.filename} value={this.state.filename} onBlur={this.handleBlur} autoFocus onChange={this.handleChange} onKeyDown={this.handleKeyDown} />
            )
        }
        return (
            <div　className="item">
                <i className="material-icons modeeditbt" onClick={() => {this.setState({editmode:!this.state.editmode})}}>mode_edit</i>
                <span onDoubleClick={() => {this.setState({editmode:!this.state.editmode})}}>{this.props.filename}</span>
                <i className="material-icons closebt" onClick={this.props.onClose}>close</i>
            </div>
        )
    }
}
class Documentmenu extends Component {
    constructor(props){
        super(props);
        this.handleOutsideClick = this.handleOutsideClick.bind(this);        
    }
    componentDidMount(){
        document.addEventListener("mouseup",this.handleOutsideClick);
        document.addEventListener("touchstart",this.handleOutsideClick);
    }
    componentWillUnmount(){
        document.removeEventListener("mouseup",this.handleOutsideClick);
        document.removeEventListener("touchstart",this.handleOutsideClick);
    }
    handleOutsideClick(e){
        if(!this.props.isOpen){
            return;
        }
        const check = ReactDOM.findDOMNode(this);
        console.log(check.contains(e.target));
        if(check.contains(e.target) || e.target == this.props.target){
            return;
        }
        e.stopPropagation();
        this.props.onClose();
    }
    render() {
        return (
            <ul className="document_ul">
                <i className="material-icons add_bt" onClick={this.props.document_add}>add_box</i>
                {this.props.mdcontent.map((content,i) => {
                    if(i == this.props.editpage) { return ( 
                        <li key={"document_" + i} className="active" >
                            <DocumentmenuItem filename={content.filename} onEdit={(title) => {this.props.content_edit_title(i,title)}} onClose={() => {this.props.document_remove(i)}} />
                        </li>
                    )}
                    return (
                        <li key={"document_" + i} onClick={() => {this.props.editpagechange(i)}} >
                            <DocumentmenuItem filename={content.filename} />
                        </li>
                    )
                })}
            </ul>
        );
        return (
            <div>
                zz
            </div>
        )
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
        content_edit_title:(page,title) => {dispatch(actions.edit_content_title(page,title))},
        document_add:() => {dispatch(actions.add_document())},
        document_remove:(page) => {dispatch(actions.remove_document(page))},
        editpagechange:(page) => {dispatch(actions.change_editpage(page))}
    }
}
export default connect(stateToProps,dispatchToProps)(Documentmenu);