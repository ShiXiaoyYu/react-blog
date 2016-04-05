import React from 'react';
import ReactDOM from 'react-dom';
import  Header from './container/Header';
import  Content from './container/content';
import  Footer  from  './container/Footer';
import  SignIn  from  './container/Footer';
import { combineReducers } from 'redux'
import { createStore } from 'redux';
import { Component } from 'react';
import { Router, Route, Link } from 'react-router'
import Article from './component/article.jsx'
import { hashHistory } from 'react-router';
import { browserHistory } from 'react-router';
import { Provider } from 'react-redux';
import { connect } from 'react-redux';
import { IndexRoute } from 'react-router';
import $ from  'jquery';
import RichEditor from './container/Editor.jsx';
import TopHeader from './container/TopHeader.jsx';
import article from './component/article.jsx'


import thunk from 'redux-thunk';
import {applyMiddleware} from 'redux';

require('!style!css!./ss.css');
require('!style!css!./reset.css');



let showTitle = false;
let showSign = true;
//action.UserAccount

const initState = {isLogBtn: 'LOGIN',
                     isLog: 'LOGINS',
                     issignlog: 'signlogs'};

const UserAccount = (state = initState, action)=> {
    switch (action.type) {
        case  'LOGIN':
           console.log('触发');
            return {isLogBtn: 'LOGIN'};//触发登录按钮显示
        case 'USERACCOUNT':
            console.log('second tweeth');
            return {
                UserAccount: action.UserAccount,
                isLogBtn: 'USERACCOUNT'
            };
        default:
            return state;
    }
};

let isLog = 'reg';
let check = false;

function checkFn(){
    if (check) {
        check = false;
        return {isLog: 'LOGINS'};
    } else {
        check = true;
        return {isLog: 'LOGINSF'};
    }
}

const IsLogIn = (state = initState, action)=> { /*是否登陆注册 登出*/  //带{}报的错 Uncaught TypeError: Cannot read property 'state' of undefined
    switch (action.type) {
        case 'LOGINS':
           return   checkFn();
            break;
        case 'LOGOUT':
            return {isLog: 'LOGOUT'};
        case 'REG':
            return {isLog: 'REG'};
        default:
            return state;
    }
};

let checkIsLog = false;
function logOrReg(){
    if (checkIsLog) {
        checkIsLog = false;
        return {isLog: 'LOGINS'};
    } else {
        checkIsLog = true;
        return {isLog: 'REG'};
    }
}
const CheckIO = (state = initState, action) => {
    switch (action.type) {
        case "CHECK":
      return  logOrReg();
            break;
        default:
            return state;
    }
};

let signLog = true;
function SignLogShowFalse(){
    if (signLog) {
        console.log('false');
        signLog = false;
        return {issignlog: 'signlog'};
    } else {
        signLog = true;
        console.log('true');
        return {issignlog: 'signlogs'};
    }
}
const SignLog = (state = initState, action)=> {
    switch (action.type) {
        case 'SIGNLOG':
         return   SignLogShowFalse();
            break;
        default :
            return state;
    }
};



const ContentColumn = (state = initState, action) => {
    if (action.type == 'CONTENT_COLUMN') {
        var contentColumn = action.post;
        return contentColumn
    }

    return state;
};
let  postDetail ={};
const GetpostDetail = (state=initState,action) => {
if(action.type == 'GETPOST'){
    postDetail = action.postDate;
    return postDetail;
}
    return state
};
//windowResize,
const todoApp = combineReducers({UserAccount, IsLogIn, CheckIO, SignLog,ContentColumn,GetpostDetail});
//showOrH, showOrHaArticle,
class App extends Component {
    constructor() {
        super();
    }

    componentDidMount(){
    }

    render() {

        let UserAccount;
        const props = this.props;
        const showOrH = props.showOrH;
        const userAccount = props.UserAccount.UserAccount;
      /*  console.log(props);
        console.log(userAccount);*/
        return (
            <div>
                <TopHeader store={store} username={userAccount}
                           logOutFn={()=>{
             $.ajax({
                      url: '/api/logout',
                       type:'GET',
                       data:{},
                       success:function(data){
                       const logOut  = data;

              store.dispatch({
                       type:'LOGOUT',
                       logOut
                       });
               store.dispatch({
                       type:'LOGIN'
                       });
                       },
                       error:function(err){
                       }}
                        );
                           }}

                           onclick={
                    ()=>{

                    store.dispatch({//使logIn组件显示 dispatch ‘logins s代表sign
                     type:'SIGNLOG'
                    });
                    store.dispatch({//同时发送 LOGIN 防止Login 按钮消失  //控制topHeader的 Login按钮
                     type:'LOGIN'
                    });
                   store.dispatch({//使logIn组件显示 dispatch ‘logins s代表sign
                     type:'LOGINS'
                    });
                    }
                    }/>
                {this.props.children}
                <Footer/>
            </div>
        )
    }
}

App = connect(state =>state)(App);
//const store = createStore(todoApp);
const createStoreWithMiddleware = applyMiddleware(
    thunk// 允许我们 dispatch() 函数
)(createStore);
//applyMiddleware 是允许 返回一个函数
const store = createStoreWithMiddleware(todoApp);



const app = document.createElement('div');
document.body.appendChild(app);
const render = ()=> {
    ReactDOM.render(
        <Provider store={store}>
            <Router history={browserHistory}>
                <Route path='/' component={App}>
                    <IndexRoute component={Header}/>
                    <Route path="p" component={Header} store={store}>
                        <Route path="p/a" component={Content}/>
                    </Route>
                    <Route path="/article" component={article}/>
                    <Route path="f" component={Footer}/>
                    <Route path="editor" component={RichEditor}/>
                </Route>
            </Router>
        </Provider>

        , app);

};
render();// ReactDOM.render( <Route  store = {createStore(todoApp)} history={history}  />, app);   // ReactDOM.render(<App store = {createStore(todoApp)} />, app);
