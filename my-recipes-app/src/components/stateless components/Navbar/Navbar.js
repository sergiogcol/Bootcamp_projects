import React from 'react';
import {NavLink} from 'react-router-dom';
import Logo from "./Logo.svg";
import "./Navbar.css";
import {connect} from "react-redux"
import {signOut} from '../../../store/actions/authActions'

const Navbar = (props) => {
    const {auth, profile} = props;
    const links = auth.uid ? 
        (<div className="navlinks" id="prueba">
            <li className="create_recipe"><NavLink to="/create" id="create_recipe">New Recipe</NavLink></li>
            <li className="my_recipes"><NavLink to="/">My Recipes</NavLink></li>
            <li><a onClick={props.signOut}>Log Out</a></li>
            <li className="initials"><NavLink to="/" id="user">{profile.initials}</NavLink></li>
        </div>)
        : 
        (<div className="navlinks" id="prueba">
            <li><NavLink to="/signup">Sign Up</NavLink></li>
            <li><NavLink to="/signin">Login</NavLink></li>
        </div>)
    return (
        <header>
        <nav className="header">
            <NavLink to="/"><img id="logo-mobile" src={Logo} alt="App logo Home. logo description: the name is 'recipe Keeper' and the icon is a frying pan with a recipe written in a little paper inside "></img></NavLink>  
            <label htmlFor="toggle">&#9776;</label>
            <input type="checkbox" id="toggle"/>
            <ul className="navlinks"> 
                <li id="logo"><NavLink to="/"><img id="logo" src={Logo} alt="App logo Home. logo description: the name is 'recipe Keeper' and the icon is a frying pan with a recipe written in a little paper inside "></img></NavLink></li>
                {links}
            </ul>
        </nav>
        </header>
    )
    
}
const mapStateToProps = (state) => {
    console.log(state);
    return {
        auth: state.firebase.auth,
        profile: state.firebase.profile
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        signOut : () => dispatch(signOut())
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
