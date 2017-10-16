import React, { Component } from 'react';
import { connect } from 'react-redux';
import Markdown from 'react-remarkable';

class MDrender extends Component {
    render() {
        return (
            <div className={this.props.className}>
              {/* <ReactMarkdown source={this.props.mdcontent.getIn([this.props.editpage,'content'])} /> */}
              {/* {<ReactMarkdown source={this.props.mdcontent[this.props.editpage].content}/>} */}
              <Markdown className="markdown-body" source={this.props.mdcontent[this.props.editpage].content} />
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
//         editpage:state.mdcontent.editpage
//     }
// }
const dispatchToProps = (dispatch) => {
    return {
        
    }
}
export default connect(stateToProps,dispatchToProps)(MDrender);