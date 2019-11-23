import React from 'react';
import axios from "axios";
import {Redirect} from "react-router-dom";


class RegisterScreen extends React.Component {

    //empty array to hold the user selections during registration
    userLanguages = [];

    state = {

        //array that collects the lists of languages from the database
        dbLangs: [],
        view: this.props.view,
        email: '',
        password: '',
        confirmPassword: '',
        displayName: '',

        //array that will eventually be sent to the database for the user's specifications
        languages: [],
        isLoading: true,
        successfulSubmission: false
    };


    //get request that populates the dbLangs array with the content from the languages table
    componentDidMount() {
        axios.get('/api/languages')
            .then(res => {
                this.setState({
                    dbLangs: res.data,
                    isLoading: false
                })
            })
    }


    //function that sets the state from the user input
    handleInput = type => event => {
        this.setState({
            [type]: event.target.value
        });
    };

    static getDerivedStateFromProps(props, languages) {
        if (props.view !== languages.view) {
            return {
                view: props.view
            }
        }
        return null;
    }

    // adds/ removes the language from the userLanguages array when the checkbox is checked/unchecked
    verifyCheckbox(langfromDB) {
        if (this.userLanguages.indexOf(langfromDB.language) === -1) {
            this.userLanguages.push(langfromDB.language);
        } else {
            let index = this.userLanguages.indexOf(langfromDB.language);
            this.userLanguages.splice(index, 1);
        }
        this.setState({languages: this.userLanguages});
    }

    //posts all the information from the register form to the register controller
    registerButton = event => {
        event.preventDefault();
        // console.log(`email=${this.state.email}&password=${this.state.password}&displayName=${this.state.displayName}&languages=${this.state.languages}`);
        axios.post("/api/register",
            `email=${this.state.email}
            &password=${this.state.password}
            &displayName=${this.state.displayName}
            &languages=${this.state.languages}`)
            .then(() => {
                this.setState({successfulSubmission: true});
            })
    };

    render() {
        // Necessary to prevent rendering fail on objects/arrays inside of this.state.opportunity
        if (this.state.isLoading) {
            return (
                <div>Loading</div>
            )
        }
        if (this.state.successfulSubmission) {
            return (<Redirect to={"/login"}/>)
        }
        let languagesList = this.state.dbLangs.map((element) => {
            return (<div className={"form-check col-md-3"} key={element.id}>
                <input
                    className={"form-check-input"}
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
        });

        return (
            <div className={'container text-center vh-100 d-flex flex-column justify-content-center'}>
                <div className="col-8 offset-2">
                    <form className={"card"}>
                        <h2>
                            Register
                        </h2>
                        <div className="card-body">
                            <div className={'form-group'}>
                                <label htmlFor="email">E-mail</label>
                                <input
                                    className={"form-control"}
                                    onChange={this.handleInput('email')}
                                    type={"email"}
                                    name={"email"}
                                    placeholder={"E-mail"}/>
                            </div>
                            <div className={'form-group'}>
                                <label htmlFor="password">Password</label>
                                <input
                                    className={"form-control"}
                                    onChange={this.handleInput('password')}
                                    type={"password"}
                                    name={"password"}
                                    placeholder={"Password"}/>
                            </div>
                            <div className={'form-group'}>
                                <label htmlFor="confirmPassword">Confirm Password</label>
                                <input
                                    className={"form-control"}
                                    onChange={this.handleInput('confirmPassword')}
                                    type={"password"}
                                    name={"confirmPassword"}
                                    placeholder={"Confirm password"}/>
                            </div>
                            {/*<button>Continue</button>*/}
                            <div className={'form-group'}>
                                <label htmlFor="displayName">Display Name</label>
                                <input
                                    className={"form-control"}
                                    onChange={this.handleInput('displayName')}
                                    type={"text"}
                                    name={"displayName"}
                                    placeholder={"Display name"}/>
                            </div>
                            <label htmlFor="mylanguages">My Languages</label>
                            <div className={"form-row form-group"}>
                                {languagesList}
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