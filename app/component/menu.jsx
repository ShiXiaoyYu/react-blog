import React from 'react';
import ReactDOM from 'react-dom';
import TitleSum from './titleSum.jsx';
const Menu =({onClick}) => {
return(
            <div>
                <div onClick={onClick} className="menu">
                    <img/>
                    Menu
                </div>
            </div>
)
};
export default Menu