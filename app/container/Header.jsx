import React from 'react';
import ReactDOM from 'react-dom';
import Menu from '../component/menu.jsx';
import TimerLine from '../component/timerLine.jsx';
import Welc from '../component/welc.jsx';
import TitleSum from '../component/titleSum.jsx';
import SignIn from  '../component/sign.jsx';
import $ from  'jquery'
import { connect } from 'react-redux';
import LogIn from '../component/logIn.jsx';
import Content from './content.jsx'


class Header extends React.Component {
    componentDidMount() {
        const store = this.props.store;
        let username = this.props.UserAccount.UserAccount;
        let UserAccount;
    }
    render() {
        let UserAccount;
        const dispatch = this.props.dispatch;
        const props = this.props;
        const store = this.props.store;
        let username = this.props.UserAccount.UserAccount;
        let isLog = this.props.IsLogIn.isLog  ;
        let issignlog = this.props.SignLog.issignlog;

        console.log(issignlog == 'signlog');
        return (
            <div className={"sign-log"}>


                <Menu onClick={  ()=>{ dispatch({  type:'SHOW_TITLE' });} }/>
                <div className="sign-in">
                    SIGN IN
                </div>

                <TimerLine/>
                <Welc/>

                <div className={issignlog == 'signlog'?"mai-header-show":'hidden'}>
                    <div className="log-wrap"></div>
                    <SignIn   isLog={isLog} className="user-reg"/>
                    <LogIn  isLog={isLog} className="user-login"/>
                    <button className={isLog ?"check-sin":"hidden"} onClick={()=>{
                 dispatch({
                     type:'LOGINS'
                    });

                 dispatch({ type:'LOGIN'  });
                }}>Check</button>

                </div>

                <Content />

            </div>
        )
    }
}
export default connect(state =>state)(Header);