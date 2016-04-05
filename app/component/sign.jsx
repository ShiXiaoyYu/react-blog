import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import $ from  'jquery';

const SignIn = ({dispatch,onBlur,onBlur2,value,isLog})=> {
    let Acount;
    let Password;
    let password_re;
    return (
        <div className={isLog == 'LOGINSF'?"sign-in":'hidden'}>
            <div className="wrap">
                <form method="post">
                    <input  className="account" type="text" ref={node => { Acount = node }} onBlur={()=>{
                      dispatch({
                      type:'ACCOUNT',
                     value: Acount.value
                    })
                    }
                  } placeholder="account"/>
                    <input  className="password" type="password" ref={node => { Password = node }} onBlur={()=>{
                      dispatch({
                     type:'PASSWORD',
                     value: Password.value
                    })
                    }} placeholder="password"/>
                    <input  className="password_re" type="password_re" ref={node => { password_re = node }} onBlur={()=>{
                      dispatch({
                     type:'PASSWORD_re',
                     value: password_re.value
                    })
                    }} placeholder="password_re"/>
                    <input type="button" className="sign_in-up" value='Sign up' onClick={
                ()=>{
                //判断 验证输入
               if(Acount.value&&Password.value&&password_re.value){
                     $.ajax({
                       url: '/api/reg',
                       type:'POST',
                       data:{name:Acount.value,password:Password.value,password_re:password_re.value},
                       success:function(data){
                     //  console.log('receive');
                     const UserAccount = data;
                       console.log(data);
                     if(UserAccount!='USERREPEAT'){ //如果用户名不重复则进入
                      dispatch({ //显示用户名
                        type:'USERACCOUNT',
                        UserAccount
                    });
                      dispatch({  //使登录界面消失（隐藏）
                       type:'SIGNLOG'
                       });
                     }
                       },
                       error:function(err){
                     //  console.log(err);
                       }}
                        );
               }
              return
                }
                }/>
                </form>
            </div>
        </div>
    )
};


export default connect(state =>state)(SignIn);