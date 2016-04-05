import React from 'react';
import ReactDOM from 'react-dom';

const TimerLine =({onClick}) => {
    return(
        <div>
            <ul className='time-line'>
                <li className="time-lA time-active">2014</li>
                <span className="slash slash-1 slash-active">/</span>
                <li className="time-lB">2013</li>
                <span className="slash slash-2">/</span>
                <li className="time-lC">2012</li>
            </ul>
        </div>
    )
};


export default TimerLine