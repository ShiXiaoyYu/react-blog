import React from 'react';
import ReactDOM from 'react-dom';
import  TitleList from './titleList.jsx'
const TitleSum = ({onClick,titleShow,TITLE_SHOW}) => {
    if (titleShow == TITLE_SHOW) {
        return (
            <ul>
                <TitleList section='HOME' currentShowSec={'HOME'} className="title-active" onClick={()=>{console.log('1.1')}}>HOME</TitleList>
                <TitleList section="BLOG" onClick={()=>{console.log('1.2')}}>BLOG</TitleList>
                <TitleList section="POSTS" onClick={()=>{console.log('1.3')}}>POSTS</TitleList>
            </ul>
        )
    }
    return (
        <ul >jkong
        </ul>
    )
};

export default TitleSum;