import React from 'react';
import axios from "axios";
import {Redirect} from "react-router-dom";
import {displaySpinner} from "../common/Functions";

class RegisterScreen extends React.Component {

    state = {
        //array that collects the lists of languages from the database
        allLanguages: [],

        // Users Inputs
        selectedLanguages: [],
        email: '',
        password: '',
        confirmPassword: '',
        displayName: '',

        // Validation Checks
        validEmail: "",
        validPassword: "",
        validConfirm: "",
        validDisplayName: "",
        validLanguages: "",

        isLoading: true,
        successfulSubmission: false
    };

    //get request that populates the dbLangs array with the content from the languages table
    componentDidMount() {
        axios.get('/api/languages')
            .then(res => {
                this.setState({
                    allLanguages: res.data,
                    isLoading: false
                })
            })
    }

    //function that sets the state from the user input
    handleInput = type => event => {
        this.setState({
            [type]: event.target.value,

        }, () => {
            // Check email
            if (this.state.email.length === 0) {
                this.setState({
                    validEmail: ""
                })
            } else if (this.state.email.includes("@")) {
                this.setState({
                    validEmail: "is-valid"
                })
            } else if (!this.state.email.includes("@")) {
                this.setState({
                    validEmail: "is-invalid"
                })
            }

            // Check password
            if (this.state.password.length === 0) {
                this.setState({
                    validPassword: ""
                })
            } else if (this.state.password.length >= 8) {
                this.setState({
                    validPassword: "is-valid"
                })
            } else if (this.state.password.length >= 1) {
                this.setState({
                    validPassword: "is-invalid"
                })
            }

            //    check confirm password
            if (this.state.confirmPassword.length === 0) {
                this.setState({
                    validConfirm: ""
                })
            } else if (this.state.confirmPassword !== this.state.password) {
                this.setState({
                    validConfirm: "is-invalid"
                })
            } else if (this.state.confirmPassword === this.state.password) {
                this.setState({
                    validConfirm: "is-valid"
                })
            }

            //    check display name
            if (this.state.displayName.length === 0) {
                this.setState({
                    validDisplayName: ""
                })
            } else if (this.state.displayName.length >= 5) {
                this.setState({
                    validDisplayName: "is-valid"
                })
            } else if (this.state.displayName.length >= 1) {
                this.setState({
                    validDisplayName: "is-invalid"
                })
            }
        });
    };

    // adds/ removes the language from the userLanguages array when the checkbox is checked/unchecked
    verifyCheckbox(element) {
        let langs = this.state.selectedLanguages;
        let found = false;
        let pos;

        langs.forEach((language, index) => {
            if (language.language === element.language) {
                found = true;
                pos = index;
            }
        });

        if (found) {
            langs.splice(pos, 1)
        } else {
            langs.push(element)
        }

        this.setState({
            selectedLanguages: langs
        });
    }

    //posts all the information from the register form to the register controller
    registerButton = event => {
        event.preventDefault();

        if (this.state.email.length === 0) {
            this.setState({
                validEmail: "is-invalid"
            })
        }
        if (this.state.password.length === 0) {
            this.setState({
                validPassword: "is-invalid"
            })
        }
        if (this.state.confirmPassword.length === 0) {
            this.setState({
                validConfirm: "is-invalid"
            })
        }
        if (this.state.displayName.length === 0) {
            this.setState({
                validDisplayName: "is-invalid"
            })
        }

        if (this.state.selectedLanguages.length === 0) {
            this.setState({
                validLanguages: "is-invalid"
            });
            return null;
        }


        let languagesString = this.state.selectedLanguages.map(element => {
            return element.language;
        });

        axios.post("/api/register", `email=${this.state.email}&password=${this.state.password}&displayName=${this.state.displayName}&languages=${languagesString}`)
            .then(() => {
                this.setState({successfulSubmission: true});
            })
    };

    buildLanguageList = () => {
        return this.state.allLanguages.map((element) => {
            return (<div className={"form-check col-md-3"} key={element.id}>
                <input
                    className={"form-check-input " + this.state.validLanguages}
                    onChange={() => {
                        this.verifyCheckbox(element)
                    }}
                    type="checkbox"
                    value={element.language}
                    name={element.language}
                    id={element.language}
                />
                {/*//input id has to match the label's htmlFor attribute */}
                <label className={"form-check-label"} htmlFor={element.language}>
                    {element.language}
                </label>
            </div>)
        })
    };

    render() {
        if (this.state.isLoading) {
            return displaySpinner()
        }

        if (this.state.successfulSubmission) {
            return (<Redirect to={"/login"}/>)
        }

        return (
            <div className={'container text-center vh-100 d-flex flex-column justify-content-center'}>
                <div className="col-8 offset-2">
                    <form className="card">
                        <h2>
                            Register
                        </h2>
                        <div className="card-body">
                            <div className={'form-group'}>
                                <label htmlFor="email">E-mail</label>
                                <input
                                    className={"form-control " + this.state.validEmail}
                                    onChange={this.handleInput('email')}
                                    type={"email"}
                                    name={"email"}
                                    placeholder={"E-mail"}
                                />
                            </div>
                            <div className={'form-group'}>
                                <label htmlFor="password">Password</label>
                                <input
                                    className={"form-control " + this.state.validPassword}
                                    onChange={this.handleInput('password')}
                                    type={"password"}
                                    name={"password"}
                                    placeholder={"Password"}
                                />
                            </div>
                            <div className={'form-group'}>
                                <label htmlFor="confirmPassword">Confirm Password</label>
                                <input
                                    className={"form-control " + this.state.validConfirm}
                                    onChange={this.handleInput('confirmPassword')}
                                    type={"password"}
                                    name={"confirmPassword"}
                                    placeholder={"Confirm password"}/>
                            </div>
                            {/*<button>Continue</button>*/}
                            <div className={'form-group'}>
                                <label htmlFor="displayName">Display Name</label>
                                <input
                                    className={"form-control " + this.state.validDisplayName}
                                    onChange={this.handleInput('displayName')}
                                    type={"text"}
                                    name={"displayName"}
                                    placeholder={"Display name"}/>
                            </div>
                            <label htmlFor="mylanguages">My Languages</label>
                            <div className={"form-row form-group"}>
                                {this.buildLanguageList()}
                            </div>
                            <button
                                className={"btn btn-primary"}
                                type="submit"
                                value="submit"
                                onClick={this.registerButton}>
                                Register
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}

export default RegisterScreen;