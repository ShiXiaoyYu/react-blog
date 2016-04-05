import React from 'react';
import ReactDOM from 'react-dom';

const TitleList = ({onClick,children,section,currentShowSec}) => {


    if (section === currentShowSec) {
        return (<li><a onClick={onClick} href="#">{children}</a></li>);
    }

    return (
        <li><a onClick={onClick} href="#">{children}</a></li>
    )


};


export default TitleList