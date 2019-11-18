
import * as React from "react";
import axios from "axios";


class LoginScreen extends React.Component {

    state = {
        email: '',
        password: '',
        loggedIn: false
    };

    handleInput = type => event => {
        this.setState({
            [type]: event.target.value
        })
    };

    handleSubmit = event => {
        this.setState({loggedIn: true})
    };


    loginButton = event => {
        event.preventDefault();
    };

    render() {
        // if (this.state.loggedIn) {
        //     return (<Redirect to={"/dashboard"}/>)
        // }
        return (
            <div>
                <div class="row">
                    <div class="col-md-5" >
                        <div class="container">
                            <div class="loginTitle mx-auto text-center card-header font-weight-bold">
                                <h3>Login</h3>
                            </div>
                                <div class="card-body">
                                    <div class="form-group">
                                        <h5>Email</h5>
                                        <div>
                                        <input
                                            onChange={this.handleInput('email')}
                                            value={this.state.email}
                                            name = {'email'}
                                            placeholder={"Enter Email"}/>
                                        </div>
                                    </div>

                                    <div class="form-group">
                                        <label htmlFor="password"><h5>Password</h5></label>
                                        <div class="form-group">
                                            <input
                                            onchange={this.handleInput('password')}
                                            value={this.state.password}
                                            name={'password'}
                                            placeholder={"Enter Password"}/>
                                            <button
                                            onClick={this.loginButton}/>
                                        </div>
                                    </div>
                                </div>
                        </div>
                    </div>
                </div>
            </div>

        );
    }







        // handleInput = type => event => {
        //     this.setState({
        //     [type]: event.target.value
        //     })
        // }






}

export default LoginScreen;