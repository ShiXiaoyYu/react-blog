import React from 'react';
import ReactDOM from 'react-dom';
import $ from  'jquery'
import { connect } from 'react-redux';
import { Router, Route, Link } from 'react-router';
class TopHeader extends React.Component{
    componentDidMount() {
        var self = this;
        const store = this.props.store;
        $.ajax({
            url: '/api/account',
            type:'GET',
            success:function(data){
                const  UserAccount = data;//？session ：Usercount：LOGIN
                console.log('789');
                if(UserAccount!='LOGIN'){  //有值 则ddispatch用户名
                      console.log('userccount');
                      console.log(UserAccount);
                    store.dispatch({
                        type:'USERACCOUNT',
                        UserAccount
                    })
                }else{
                }
            },
            error:function(err){
            }});
    }
    /*className={2>3?"emit":"hidden"}*/
    render(){
        const props = this.props;
        console.log(props);
        const username = props.username;
        const onClick = props.onClick;
        const onclick = props.onclick;
        const logOutFn = props.logOutFn;
        const isLogBtn = props.UserAccount.isLogBtn; //这里难道不需要在父组件指明UserAccount

        return(
            <div className="top-header">
                <div className="user-account">
                    <div className="emit" attr='logout' onClick = {logOutFn}>EMITON</div>
                    <div className={isLogBtn == 'USERACCOUNT'?'username':'hidden'} onClick = {onClick} ><Link to="/">U{username}</Link></div>
                    <div  className={isLogBtn == 'LOGIN'?'username':'hidden'}  onClick = {onclick} >Login</div>
                </div>
            </div>
        )
    }
}

export default connect(state =>state)(TopHeader);