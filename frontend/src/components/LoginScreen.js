import * as React from "react";
import axios from "axios";
import {Link, Redirect} from "react-router-dom";


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


    loginButton = event => {
        event.preventDefault();
        axios.post("/api/login", `email=${this.state.email}&password=${this.state.password}`)
            .then(() => {
                this.setState({loggedIn: true});
                console.log("logged in");
            });
    }


    render() {
        if (this.state.loggedIn) {
            return (<Redirect to={"/dashboard"}/>)
        }
        return (
            <div className="mainContainer mt-5  ">
                <div className="row ">

                    <div className="loginContainer col-md-5">
                        <div className="m-5 card-body h-100 bg-light border border-dark">
                            <h3 className="card-title mx-auto text-center font-weight-bold">Login</h3>


                            <div className="form-group">
                                <h5>Email</h5>
                                <div>
                                    <input
                                        onChange={this.handleInput('email')}
                                        value={this.state.email}
                                        name={'email'}
                                        placeholder={"Enter Email"}/>
                                </div>
                            </div>

                            <div className="form-group">
                                <h5>Password</h5>
                                <div className="form-group">
                                    <input
                                        onChange={this.handleInput('password')}
                                        value={this.state.password}
                                        name={'password'}
                                        placeholder={"Enter Password"}/>


                                    <div className="form-group mt-2">
                                        <button className="btn btn-sm btn-primary rounded" type="submit" value="submit"
                                                onClick={this.loginButton}> Login
                                        </button>
                                    </div>


                                    <div className="mt-5">

                                        <div>Not Registered?
                                            <button className="ml-2 btn btn-sm btn-danger rounded text-white" type="submit" value="submit"><Link to={"/register"}>Join</Link></button>
                                        </div>
                                    </div>

                                </div>
                            </div>

                        </div>
                    </div>


                    <div className="imageContainer width:100 justify-content-md-center">
                        <img className="h-100 mr-5" src="https://c1.sfdcstatic.com/content/dam/blogs/legacy/2015/04/6a00e54ee3905b883301bb08136ec3970.jpg" alt="Flags"/>
                    </div>


                </div>
            </div>

        );
    }


}

export default LoginScreen;