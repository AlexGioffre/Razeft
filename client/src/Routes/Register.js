import React, {Component} from 'react';
import { Redirect } from 'react-router-dom'

class Register extends Component {

    constructor() {
        super();
        this.state ={
            name: "",
            email: "",
            password: "",
            done: false
        }
    }

    onChangeName = e =>{
        this.setState({name: e.target.value})
    }

    onChangeEmail = e => {
        this.setState({email: e.target.value})
    }

    onChangePassword = e => {
        this.setState({password: e.target.value})
    }

    SubRegister = () => {
        fetch(`http://localhost:5000/api/signup`, {
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                name: this.state.name,
                email: this.state.email,
                password: this.state.password
            })
            })
            .then(response =>{
                console.log(response);
                return response.json();
            })
            .then(user => {
                this.setState({done: true})
            })
    }

    render(){
        return(
            <div>
                <label htmlFor="name">Name:</label>
                <input id="name" name="name" type="text"  onChange={this.onChangeName}/>
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


export default Register;