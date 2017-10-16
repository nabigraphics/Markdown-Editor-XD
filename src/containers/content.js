import React, { Component } from 'react';

import Editor from '../components/editor';
import MDrender from '../components/mdrender';

class Content extends Component {
    render() {
        return (
            <div className="app_documentlayout">
                <div>
                    document!
                </div>
                <div className="app_editorlayout">
                    <Editor className="editor" />
                    <MDrender className="render_view" />
                </div>
            </div>
        );
    }
}

export default Content;