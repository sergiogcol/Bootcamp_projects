import React, { Component } from 'react'
import "./SignUp.css"
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
import {signUp} from "../../store/actions/authActions"

class SignUp extends Component {
    state = {
        firstName:"",
        lastName:"",
        email:"",
        password:""
    }
    handleChange = (event) => {
        this.setState({
            [event.target.id] : event.target.value
        })   
    }
    handleSubmit = (event) => {
        event.preventDefault();
        this.props.signUp(this.state);
    }

  render() {
      const {auth, authError} = this.props;
      if(auth.uid) return <Redirect to="/"/> 
    return (
      <div className="container" id="signUp">
      <form onSubmit={this.handleSubmit}>
        <h5>Sign Up</h5>
        <div className="input-field">
            <input type="text" id="firstName" onChange={this.handleChange} aria-describedby="information required" required/>
            <label htmlFor="firstname">First Name</label>
        </div>
        <div className="input-field">
            <input type="text" id="lastName" onChange={this.handleChange} aria-describedby="information required" required/>
            <label htmlFor="lastName">Last Name</label>
        </div>
        <div className="input-field">
            <input type="email" id="email" onChange={this.handleChange} aria-describedby="information required" required/>
            <label htmlFor="email">Email</label>
        </div>
        <div className="input-field">
            <input type="password" id="password" onChange={this.handleChange} aria-describedby="information required" minLength="6" required/>
            <label htmlFor="password">Password</label>
        </div>
        <div className="input-field">
            <button>Sign up</button>
        </div>
        {authError ? <p className="signIn_error">{authError}</p>: null}
      </form>
        
      </div>
    )
  }
}

const mapStateToProps = (state) => {
   return{
    auth: state.firebase.auth,
    authError: state.auth.authError
   }
}
const mapDispatchToProps = (dispatch) => {
    return{
        signUp: (newUser) => dispatch(signUp(newUser)) 
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
