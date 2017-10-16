import React, { Component } from 'react';
import { connect } from 'react-redux';
import ReactMarkdown from 'react-markdown';

class MDrender extends Component {
    render() {
        return (
            <div className={this.props.className}>
              <ReactMarkdown source={this.props.mdcontent} />
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
        
    }
}
export default connect(stateToProps,dispatchToProps)(MDrender);