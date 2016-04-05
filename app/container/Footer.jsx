import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, Link } from 'react-router'
class Footer extends React.Component{
    render(){
        return(
            <div className="footer">
                <div className="older" data-link=''>
                <button><Link to="/editor">EDITOR</Link></button>
                    </div>
            </div>
        )
    }
}

export default Footer