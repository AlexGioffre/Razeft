import React, {Component} from 'react';

import './auth.css'
class Register extends Component  {

    constructor() {
        super();
        this.state = {
            name: '',
            email: '',
            password: '',
            msg: null
        }
    }

    onChange = (e) => {
        this.setState({[e.target.name]: e.target.value});
    }


    componentDidUpdate(prevProps) {
        const {error} = this.props;
        if(error !== prevProps.error) {
            if(error.id === "REGISTER_FAIL"){
                this.setState({msg: error.msg})
            } else {
               this.setState({msg: null});
            }
        }

    }

    onSubmit = (e) => {
        e.preventDefault()

        const {name, email, password} = this.state;

        const newUser = {
            name,
            email,
            password
        }
        this.props.register(newUser);
    }
    render(){
       return (
            <div className="main main-active">
                <div className="form">
                    <form onSubmit={this.onSubmit}>
                        <div className="formGroup">
                            <label forhtml="name">UserName:</label>
                            <input type="text" id="name" name="name" placeholder="Write your username " onChange={this.onChange} />
                        </div>
                        <div className="formGroup">
                            <label forhtml="email">Email:</label>
                            <input type="email" id="email" name="email" placeholder="Write your email" onChange={this.onChange} />
                        </div>
                        <div className="formGroup">
                            <label forhtml="password">Password:</label>
                            <input type="password" id="password" name="password" placeholder="Write your username" onChange={this.onChange} />
                        </div>
                        <button className="btn-form">Register</button>
                    </form>
                </div>
                {
                    this.state.msg && !this.props.auth.isAuthenticated ? <div style={{display: "block", textAlign: "center"}}>{this.state.msg}</div>: null
                }
            </div>
       )
    }
}

export default Register;