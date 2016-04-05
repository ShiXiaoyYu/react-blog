import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import $ from  'jquery';

const LogIn = ({dispatch,onBlur,onBlur2,value,isLog})=> {
    let Account;
    let Password;
    let UserAccount;
    // console.log(isLog);
    return (
        <div className={isLog == 'LOGINS' ?"log-in":"hidden"}>
            <div className="wrap-out">
                <form>
                    <input className="account" type="text" ref={node => { Account = node }} onBlur={()=>{
                    /*  dispatch({
                      type:'ACCOUNT',
                     value: Account.value
                    })*/
                    }
                  } placeholder="account"/>
                    <input className="password" type="password" ref={node => { Password = node }} onBlur={()=>{
                     /* dispatch({
                     type:'PASSWORD',
                     value: Password.value
                    })*/
                    }} placeholder="password"/>
                    <input type="button" className="signOut-submit" value='Sign in' onClick={
                ()=>{

                //use fecth

// // /*

          const accountV = Account.value;
           const passworlV = Password.value;

           //异步action
           function requeestLogin(){
                  return {
                     type:'REQUEST_POSTS'
                     }
            }

           function receiveLogin(){
                return{
                       type:'USERACCOUNT',
                        UserAccount
                  }
           }

           function receiveLoginT(){
                return {
                    //使登录界面消失（隐藏）
                       type:'SIGNLOG',
                       UserAccount
                }
           }

           function fetchLogin(){
                return dispatch =>{
                    dispatch(requeestLogin());
                 return    $.ajax({
                       url: '/api/login',
                       type:'POST',
                       data:{name:Account.value,password:Password.value},
                       success:function(data){
                       UserAccount = data;
                    if(UserAccount!='LOGIN'){
                            dispatch(receiveLogin());
                            dispatch(receiveLoginT());

                     }
                       },
                       error:function(err){
                       }}
                        );
                }
           }

console.log('类型判断');
console.log(typeof fetchLogin());

         //      dispatch(fetchLogin());  //这里是异步action

  dispatch(FetchLOginServer());

         function ServerLoginIn(){
                   $.ajax({
                       url: '/api/login',
                       type:'POST',
                       data:{name:Account.value,password:Password.value},
                       success:function(data){
                       UserAccount = data;
                    if(UserAccount!='LOGIN'){
                       dispatch({
                       type:'USERACCOUNT',
                       UserAccount
                       });
                          dispatch({  //使登录界面消失（隐藏）
                       type:'SIGNLOG',
                       UserAccount
                       })

                     }
                       },
                       error:function(err){
                       }}
                        );
           };
function FetchLOginServer(){
return dispatch =>{
return   fetch('/api/login',{
                   method: "POST",
                  headers: {
                      "Content-Type": "application/x-www-form-urlencoded"},
                       body: 'name='+accountV+'&password='+passworlV
                 }).then(function(res) {
                if (res.ok) {
                     console.log('resresresresresresresres');
                     console.log(res);
                     res.json().then(function(data){
                        UserAccount = data;
                    if(UserAccount!='LOGIN'){
                            dispatch(receiveLogin());
                            dispatch(receiveLoginT());

                     }
                     })
                    } else if (res.status == 401) {
                  alert("Oops! You are not authorized.");
                }
              }, function(e) {
                 alert("Error submitting form!");
                    });
}
}
                }
                }/>
                </form>
            </div>
        </div>
    )
};


export default connect(state =>state)(LogIn);