import React from 'react';
import {NavLink} from 'react-router-dom';

const Navbar = () => {
    return (
        <nav>
        <div className="nav-wrapper indigo darken-4">
            <NavLink to="/" className="brand-logo">To-Do List</NavLink>
            <ul className="right" >
                <li><NavLink to="/">To-Do's</NavLink></li>
                <li><NavLink to="/create">New To-Do</NavLink></li>
            </ul>
        </div>
        </nav>
    )
}
export default Navbar;
