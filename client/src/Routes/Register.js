import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';
import RegisterComponents from '../components/Auth/Register';

class Register extends Component {

    render(){
        return(
            this.props.auth.isAuthenticated ? <Redirect to="/" /> : <RegisterComponents auth={this.props.auth} error={this.props.error} register={this.props.register} clearErrors={this.props.clearErrors} />
        )
    }
}


export default Register;