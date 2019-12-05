import * as React from "react";
import axios from "axios";
import {Link, Redirect} from "react-router-dom";


class LoginScreen extends React.Component {

    state = {
        email: '',
        password: '',
        loggedIn: false,
        invalidLogin: false
    };

    handleInput = type => event => {
        this.setState({
            [type]: event.target.value
        })
    };

    loginButton = event => {
        event.preventDefault();
        axios.post("/api/login", `email=${this.state.email}&password=${this.state.password}`)
            .then((res) => {
                if (res.data === 'invalid') {
                    this.setState({invalidLogin: true})
                } else {
                    this.props.callback();
                    this.setState({loggedIn: true});
                }
            })
    };

    render() {
        if (this.state.loggedIn) {
            return (<Redirect to={"/dashboard"}/>)
        }

        return (
            <div className='container text-center d-flex flex-column justify-content-center vh-100'>
                <div className="col-6 offset-3">
                    <form className='card'>
                        <div className="card-body">
                            <h2>Login</h2>
                            <div className="form-group text-left">
                                <label htmlFor={'email'}>Email</label>
                                <input
                                    className={'form-control'}
                                    type='email'
                                    autoComplete='username'
                                    onChange={this.handleInput('email')}
                                    value={this.state.email}
                                    name={'email'}
                                    placeholder={"Enter Email"}/>
                            </div>

                            <div className="form-group text-left">
                                <label  htmlFor={'password'}>Password</label>
                                <input
                                    className='form-control'
                                    type='password'
                                    autoComplete='current-password'
                                    onChange={this.handleInput('password')}
                                    value={this.state.password}
                                    name={'password'}
                                    placeholder={"Enter Password"}/>
                            </div>
                            {this.state.invalidLogin ?
                                <div className="alert alert-danger fade show" role="alert">
                                    Invalid email or password
                                </div>
                                : ''}
                            <button
                                className="btn btn-primary"
                                type="submit"
                                value="submit"
                                onClick={this.loginButton}>
                                Login
                            </button>
                        </div>
                    </form>
                    <div className="card mt-2">
                        <div className="card-body">
                            Don't have an account with us? <Link to={'/register'}>Register</Link>
                        </div>
                    </div>
                </div>
            </div>)
    }
}

export default LoginScreen;
