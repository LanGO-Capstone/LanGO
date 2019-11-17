
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
                <div class="loginTitle mx-auto text-center">
                    Login
                </div>
                    <form>
                        <input
                            onChange={this.handleInput('email')}
                            value={this.state.email}
                            name = {'email'}
                            placeholder={"Enter Email"}/>
                         <input
                            onchange={this.handleInput('password')}
                            value={this.state.password}
                            name={'password'}
                            placeholder={"Enter your password"}/>
                        <button
                            onClick={this.loginButton}/>
                    </form>
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