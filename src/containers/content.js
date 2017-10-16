import React, { Component } from 'react';

import Editor from '../components/editor';
import MDrender from '../components/mdrender';
import Wysiwygmenu from '../components/wysiwygmenu';
import SplitterLayout from 'react-splitter-layout';


class Content extends Component {
    constructor(props){
        super(props);
        this.state = {
            responsive:false
        }
        this.handleResponsive = this.handleResponsive.bind(this);
    }
    componentDidMount(){
        window.addEventListener('resize',this.handleResponsive);
        this.handleResponsive();
    }
    componentWillUnmount(){
        window.removeEventListener('resize',this.handleResponsive);
    }
    handleResponsive(){
        if(window.innerWidth <= 575){
            this.setState({
                responsive:true
            })
        }else{
            this.setState({
                responsive:false
            })
        }
    }
    render() {
        return (
            <div className="app_documentlayout">
                <Wysiwygmenu/>
                <div className="app_editorlayout">
                <SplitterLayout
                percentage={true}
                vertical={this.state.responsive}
                >      
                <Editor className="editor" />
                <MDrender className="render_view" />
                </SplitterLayout>
                </div>
            </div>
        );
    }
}

export default Content;