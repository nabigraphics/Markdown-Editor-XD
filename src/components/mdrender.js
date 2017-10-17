import React, { Component } from 'react';
import { connect } from 'react-redux';
import Markdown from 'react-remarkable';

class MDrender extends Component {
    render() {
        return (
            <div className={this.props.className}>
              <Markdown source={this.props.mdcontent[this.props.editpage].content} />
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

export default connect(stateToProps,false)(MDrender);