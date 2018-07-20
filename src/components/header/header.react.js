import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './header.css';

class Header extends Component{
    render(){
        return(
            <div className="header" id="header">
                <Link to="/" className="header-brand">Cutting Machine Tracker</Link>
                {/* <input type="date" className="dateInput" /> */}
            </div>
        );
    }
}

export default Header;