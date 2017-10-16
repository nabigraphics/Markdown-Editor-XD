//import react modules
import React, { Component } from 'react';
import ReactDOM from 'react-dom';

//import redux modules
import { createStore, applyMiddleware, compose } from 'redux';
import persistState from 'redux-localstorage';
import { devToolsEnhancer } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import reducers from './reducers';
import * as actions from './actions';

//import react-redux module
import {Provider} from 'react-redux';

//import containers
import Header from './containers/header';
import Content from './containers/content';

const store = createStore(reducers,compose(persistState(),applyMiddleware(thunk),devToolsEnhancer()));

class App extends Component {
    render() {
        return (
            <div className="app_layout">
                <Header/>
                <Content/>
            </div>
        );
    }
}
export default App;

// ReactDOM 렌더부분
// react-redux의 Provider를 여기서 설정
ReactDOM.render(<Provider store={store}><App/></Provider>,document.getElementById('app'));