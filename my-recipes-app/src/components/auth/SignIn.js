import React, { Component } from 'react'
import "./SignIn.css"
import {signIn} from "../../store/actions/authActions"
import {connect} from 'react-redux'
import {Redirect} from "react-router-dom"

class SignIn extends Component {
    state = {
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
        this.props.signIn(this.state);
    }

  render() {
    const {authError, auth} = this.props;
    if(auth.uid) return <Redirect to="/"/> 
    return (
      <div className="container" id="signIn">
      <form onSubmit={this.handleSubmit} className="white">
        <h5>Sign In</h5>
        <div>
            <input type="email" id="email" onChange={this.handleChange} aria-describedby="information required" required/>
            <label htmlFor="email">Email</label>
        </div>
        <div>
            <input type="password" id="password" onChange={this.handleChange} aria-describedby="information required" required/>
            <label htmlFor="password">Password</label>
        </div>
        <div>
            <button>Login</button>
        </div>
        <div>
            {authError ? <p className="signIn_error">{authError}</p> : null}
        </div>
      </form>
        
      </div>
    )
  }
}

const mapStateToProps = (state) =>{
  return {
    authError: state.auth.authError,
    auth: state.firebase.auth
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    signIn: (creds) => dispatch(signIn(creds))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignIn)
