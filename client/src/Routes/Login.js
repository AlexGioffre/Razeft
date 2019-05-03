import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';
import LoginComponents from '../components/Auth/Login';

class Login extends Component {

    render(){
        return(
            this.props.auth.isAuthenticated ? <Redirect to="/" /> : <LoginComponents auth={this.props.auth} error={this.props.error} clearErrors={this.props.clearErrors} login={this.props.login} />
        )
    }
}


export default Login;