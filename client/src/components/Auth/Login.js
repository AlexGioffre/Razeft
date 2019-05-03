import React, {Component} from 'react';

class Login extends Component  {

    constructor() {
        super();
        this.state = {
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
            if(error.id === "LOGIN_FAIL"){
                this.setState({msg: error.msg})
            } else {
               this.setState({msg: null});
            }
        }

    }

    onSubmit = (e) => {
        e.preventDefault()

        const {email, password} = this.state;

        const user = {
            email,
            password
        }
        this.props.login(user);
    }
    render(){
       return (
            <div className="main main-active">
                <div className="form">
                    <form onSubmit={this.onSubmit}>
                        <div className="formGroup">
                            <label forhtml="email">Email:</label>
                            <input type="email" id="email" name="email" placeholder="Write your email" onChange={this.onChange} />
                        </div>
                        <div className="formGroup">
                            <label forhtml="password">Password:</label>
                            <input type="password" id="password" name="password" placeholder="Write your password" onChange={this.onChange} />
                        </div>
                        <button className="btn-form">LOGIN</button>
                    </form>
                </div>
                {
                    this.state.msg && !this.props.auth.isAuthenticated ? <div style={{display: "block", textAlign: "center"}}>{this.state.msg}</div>: null
                }
            </div>
       )
    }
}

export default Login;