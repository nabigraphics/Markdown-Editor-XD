import React, { Component } from 'react';
class Wysiwygmenu extends Component {
    render() {
        return (
            <ul className="wiziwigmenu">
                <li>
                <button className="wiziwig_bt" title="Bold"><i className="material-icons">format_bold</i></button>
                <button className="wiziwig_bt" title="Italic"><i className="material-icons">format_italic</i></button>
                <button className="wiziwig_bt" title="Underlined"><i className="material-icons">format_underlined</i></button>
                <button className="wiziwig_bt" title="Strikethrough"><i className="material-icons">strikethrough_s</i></button>
                </li>
                <li>
                <button className="wiziwig_bt" title="List Bulleted"><i className="material-icons">format_list_bulleted</i></button>
                <button className="wiziwig_bt" title="List Numbered"><i className="material-icons">format_list_numbered</i></button>
                <button className="wiziwig_bt" title="Quote"><i className="material-icons">format_quote</i></button>
                <button className="wiziwig_bt" title="Line"><i className="material-icons">remove</i></button>
                </li>
                <li>
                <button className="wiziwig_bt" title="Insert Code"><i className="material-icons">code</i></button>
                <button className="wiziwig_bt" title="Insert Link"><i className="material-icons">insert_link</i></button>
                <button className="wiziwig_bt" title="Insert Photo"><i className="material-icons">insert_photo</i></button>
                </li>
            </ul>
        );
    }
}

export default Wysiwygmenu;