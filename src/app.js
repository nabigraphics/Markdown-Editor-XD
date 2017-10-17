//import react modules
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Notipoix3 } from './components/react-notipoix3';
//import redux modules
import { createStore, applyMiddleware, compose } from 'redux';
import persistState from 'redux-localstorage';
// import { devToolsEnhancer } from 'redux-devtools-extension';
import reducers from './reducers';
import * as actions from './actions';

//import react-redux module
import {Provider} from 'react-redux';

//import containers
import Header from './containers/header';
import Content from './containers/content';

// develop
// const store = createStore(reducers,compose(persistState(),devToolsEnhancer()));
const store = createStore(reducers,compose(persistState()));

class App extends Component {
    componentDidMount(){
        console.log("%c * 해당 프로젝트는 'Google Chrome' 브라우저에 최적화 되어있습니다.","color:red;")
    }
    render() {
        return (
            <div className="app_layout">
                <Notipoix3 position="bottom-right"/>
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