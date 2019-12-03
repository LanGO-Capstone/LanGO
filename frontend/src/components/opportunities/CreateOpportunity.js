import React from 'react';
import axios from "axios";
import {Redirect} from "react-router-dom";
import {displaySpinner} from "../common/Functions";
import ReactFilestack from 'filestack-react';

class CreateOpportunity extends React.Component {

    state = {
        allLanguages: [],
        isLoading: true,
        successfulSubmission: false,
        fsHandle: '',
        selectedLanguage: '',
        title: '',
        description: '',

        //Validation Checks
        validTitle: "",
        validDescription: "",
        validLanguage: ""
    };

    componentDidMount() {
        axios.get('/api/languages')
            .then(res => {
                this.setState({
                    allLanguages: res.data,
                    isLoading: false
                })
            })
    }

    handleInput = type => event => {
        this.setState({
            [type]: event.target.value,
        }, () => {

            //Check title
            if (this.state.title.length === 0) {
                this.setState({
                    validTitle: ""
                })
            } else if (this.state.title.length >= 1) {
                this.setState({
                    validTitle: "is-valid"
                })
            }
            //Check description
            if (this.state.description.length === 0) {
                this.setState({
                    validDescription: ""
                })
            } else
                if (this.state.description.length >= 1) {
                this.setState({
                    validDescription: "is-valid"
                })
            }

        });
    };


    handleLanguageChange = changeEvent => {
        this.setState({
            selectedLanguage: changeEvent.target.value,

        });

    };

    submitOpportunityButton = event => {
        event.preventDefault();

        let error = false;

        if (this.state.title.length === 0) {
            this.setState({
                validTitle: "is-invalid"
            });
            error = true;
        }
        if (this.state.description.length === 0) {
            this.setState({
                validDescription: "is-invalid"
            });
            error = true;
        }
        if (this.state.selectedLanguage.length === 0) {
            this.setState({
                validLanguage: "is-invalid"
            });
            error = true;
        } else if (this.state.selectedLanguage.length >= 1) {
            this.setState({
                validLanguage: "is-valid"
            });
            error = false;
        }
        if (error === true) {
            return null;
        }

        axios.post("/api/opportunities/create",
            `title=${this.state.title}&datetime=${this.state.datetime}&address=${this.state.address}&body=${this.state.description}&oppLanguage=${this.state.selectedLanguage}&fsHandle=${this.state.fsHandle}`)
            .then(() => {
                this.setState({successfulSubmission: true});
            });
    };

    buildLanguageList = () => {
        // return this.setState({
        return this.state.allLanguages.map((element) => {
            return (<div className="form-check col-md-3 " key={element.id}>
                <label className={"form-check-label"} htmlFor={element.language}>
                    <input
                        id={element.language}
                        className={"form-check-input " + this.state.validLanguage}
                        onChange={this.handleLanguageChange}
                        type="radio"
                        value={element.language}
                        name="oppLanguage"
                    />
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
            return (<Redirect to={"/profile/myopportunities"}/>)
        }

        return (
            <div className={'container text-center vh-100 d-flex flex-column justify-content-center'}>
                <div className="col-8 offset-2">
                    <form className={'card'}>
                        <div className="card-body">
                            <h2>Create an opportunity!</h2>
                            <div className={'form-group'}>
                                <label className={'required'} htmlFor="title">Title: </label>
                                <input
                                    className={'form-control ' + this.state.validTitle}
                                    onChange={this.handleInput('title')}
                                    type={"text"}
                                    name={"title"}
                                    placeholder={"Opportunity Title"}/>
                            </div>
                            <div className={'form-group'}>
                                <label htmlFor="body">Opportunity Description:</label>
                                <textarea
                                    className={'form-control ' + this.state.validDescription}
                                    onChange={this.handleInput('description')}
                                    name="description"
                                    placeholder={"Description"}
                                    id="description"
                                    cols="30"
                                    rows="10">
                                </textarea>
                            </div>
                            <div className="form-row">
                                <div className={'form-group col-6'}>
                                    <label htmlFor="datetime">Opportunity Date/Time:</label>
                                    <input
                                        className={'form-control'}
                                        onChange={this.handleInput('datetime')}
                                        id={"b"}
                                        type="datetime-local"/>
                                </div>
                                <div className={'form-group col-6'}>
                                    <label htmlFor="address">Opportunity Address:</label>
                                    <input
                                        className={'form-control'}
                                        onChange={this.handleInput('address')}
                                        type="text" name={"address"}
                                        placeholder={"Opportunity Address"}/>
                                </div>
                            </div>
                            <label htmlFor="opportunitylanguages">Opportunity Languages</label>
                            <br/>
                            <div>(Must select one!)</div>
                            <div className="form-row form-group">
                                {this.buildLanguageList()}
                            </div>
                            {/*Filestack image upload*/}
                            <div>
                                <ReactFilestack
                                    apikey={'APm2qa235SOK43uLAvFPTz'}
                                    componentDisplayMode={{
                                        type: 'button',
                                        customText: 'Optional: Upload image',
                                        // Put any bootstrap/css classes inside of customClass
                                        customClass: 'btn btn-success mb-2'
                                    }}
                                    onSuccess={
                                        (res) => {
                                            // console.log(res);
                                            this.setState({
                                                fsHandle: res.filesUploaded[0].handle
                                            });
                                        }
                                    }
                                />
                            </div>
                            <button
                                className={'btn btn-primary'}
                                type="submit"
                                value="submit"
                                onClick={this.submitOpportunityButton}>
                                Create Opportunity!
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

export default CreateOpportunity;