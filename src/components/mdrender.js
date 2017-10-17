import React, { Component } from 'react';
import { connect } from 'react-redux';
import Marked from 'marked';

// marked 라이브러리 로드 후 redux에서 문서 내용 불러와서 적용.
class MDrender extends Component {
    render() {
        var markdown = Marked(this.props.mdcontent[this.props.editpage].content);
        return <div className="render_view" dangerouslySetInnerHTML={{__html:markdown}} />;
    }
}
const stateToProps = (state) => {
    return {
        mdcontent:state.mdcontent.content,
        editpage:state.mdcontent.editpage
    }
}

export default connect(stateToProps,false)(MDrender);