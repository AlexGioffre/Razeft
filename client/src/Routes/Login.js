import React, {Component} from 'react';
import { Redirect } from 'react-router-dom'

class Login extends Component {

    constructor() {
        super();
        this.state ={
            email: "",
            password: "",
            done: false
        }
    }


    onChangeEmail = e => {
        this.setState({email: e.target.value})
    }

    onChangePassword = e => {
        this.setState({password: e.target.value})
    }

    SubRegister = () => {
        fetch(`http://localhost:5000/api/signin`, {
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                email: this.state.email,
                password: this.state.password
            })
            })
            .then(response =>{
                return response.json();
            })
            .then(user => {
               console.log(user); 
                this.setState({done: true})
            })
    }

    render(){
        return(
            <div>
                <label htmlFor="email">Email:</label>
                <input id="email" name="email" type="email"  onChange={this.onChangeEmail} />
                <label htmlFor="password">password</label>
                <input id="password" name="password" type="password"  onChange={this.onChangePassword} />
                <input onClick={this.SubRegister}  type="submit" value="Register" />
                {
                    this.state.done ? <Redirect to="/" /> : null
                }
            </div>
        )
    }
}


export default Login;