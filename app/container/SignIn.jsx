import React from 'react';
import ReactDOM from 'react-dom';
import Menu from '../component/menu.jsx';
import TimerLine from '../component/timerLine.jsx';
import Welc from '../component/welc.jsx';
import TitleSum from '../component/titleSum.jsx';
import SignIn from  '../component/sign.jsx';
import $ from  'jquery'
import { connect } from 'react-redux';
import SignOut from '../component/logIn.jsx';

class SignInOT extends React.Component{
    componentDidMount(){}
    render(){
        return (
            <div>
                <SignIn/>
                <SignOut/>
            </div>
        )
    }
}

export default connect(state =>state)(SignInOT);