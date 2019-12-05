import React from 'react';
import axios from "axios";
import {Redirect} from "react-router-dom";
import {displaySpinner} from "../common/Functions";
import ReactFilestack from 'filestack-react';
import ReactMde from "react-mde";

class CreateOpportunity extends React.Component {

    state = {
        allLanguages: [],
        isLoading: true,
        successfulSubmission: false,
        fsHandle: '',
        selectedLanguage: '',
        title: '',
        description: '',
        datetime: '',

        //Validation Checks
        noDate: false,
        validTitle: "",
        validDescription: "",
        validLanguage: "",
        validDate: ""
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
            } else if (this.state.description.length >= 1) {
                this.setState({
                    validDescription: "is-valid"
                })
            }

            let d1 = new Date(this.state.datetime);
            let d2 = Date.now();

            // If date is before right now
            if (d1 < d2) {
                this.setState({
                    validDate: 'is-invalid',
                    dateBefore: true
                })
                // Date is empty
            } else if (this.state.datetime.length === 0) {
                this.setState({
                    validDate: '',
                    dateBefore: false
                })
            } else {
                this.setState({
                    validDate: ' is-valid',
                    dateBefore: false
                })
            }
        });
    };


    handleLanguageChange = changeEvent => {
        this.setState({
            selectedLanguage: changeEvent.target.value,

        });

    };

    handleMDChange = type => event => {
        this.setState({
            [type]: event
        })
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

        // If the no date is not chosen and the date is not picked
        if (!this.state.noDate && this.state.datetime.length === 0) {
            this.setState({
                validDate: "is-invalid"
            });
            error = true;
        }

        // If the date is before now
        let d1 = new Date(this.state.datetime);
        let d2 = Date.now();

        if ((d1 < d2) && !this.state.noDate) {
            this.setState({
                validDate: 'is-invalid',
                dateBefore: true
            });
            error = true;
        } else {
            this.setState({
                dateBefore: false
            })
        }

        // If no date is selected, just pass a string
        let date;
        if (this.state.noDate) {
            date = 'nodate';
        } else {
            date = this.state.datetime;
        }

        if (error === true) {
            return null;
        }

        axios.post("/api/opportunities/create",
            `title=${encodeURIComponent(this.state.title)}&datetime=${date}&address=${encodeURIComponent(this.state.address)}&body=${encodeURIComponent(this.state.description)}&oppLanguage=${this.state.selectedLanguage}&fsHandle=${this.state.fsHandle}`)
            .then(() => {
                this.setState({successfulSubmission: true});
            });
    };

    buildLanguageList = () => {
        return this.state.allLanguages.map((element) => {
            return (<div className="form-check col-md-3" key={element.id}>
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
            <div className={'container text-center d-flex flex-column justify-content-center mt-5 pt-3'}>
                <div className="col-8 offset-2">
                    <form className={'card'}>
                        <div className="card-body">
                            <h2>Create New Opportunity</h2>
                            <div className={'form-group text-left'}>
                                <label className={'required'} htmlFor="title">Title </label>
                                <input
                                    className={'form-control ' + this.state.validTitle}
                                    onChange={this.handleInput('title')}
                                    type={"text"}
                                    name={"title"}
                                    placeholder={"Opportunity Title"}/>
                            </div>
                            <div className={'form-group text-left'}>
                                <label className={'required'} htmlFor="body">Opportunity Description</label>
                                <ReactMde
                                    onChange={this.handleMDChange('description')}
                                    value={this.state.description}
                                />
                            </div>
                            <div className="form-row">
                                <div className={'form-group col-6 text-left'}>
                                    <label htmlFor="datetime">Opportunity Date/Time</label>
                                    <input
                                        disabled={this.state.noDate}
                                        className={'form-control ' + this.state.validDate}
                                        onChange={this.handleInput('datetime')}
                                        id={"b"}
                                        type="datetime-local"/>
                                    <div className="form-check text-left">
                                        <input
                                            id={'noDate'}
                                            className={'form-check-input ' + this.state.validDate}
                                            type="checkbox"
                                            value={this.state.noDate}
                                            onChange={() => {
                                                this.setState({
                                                    noDate: !this.state.noDate,
                                                    validDate: this.state.validDate === ' is-valid' ? '' : ' is-valid'
                                                })
                                            }}/>
                                        <label className={'form-check-label'} htmlFor="noDate">No Date</label>
                                    </div>
                                    {this.state.dateBefore && !this.state.noDate &&
                                        <div className="alert alert-danger" role="alert">
                                            Date can't be before today
                                        </div>}
                                </div>
                                <div className={'form-group col-6 text-left'}>
                                    <label htmlFor="address">Opportunity Address</label>
                                    <input
                                        className={'form-control'}
                                        onChange={this.handleInput('address')}
                                        type="text" name={"address"}
                                        placeholder={"Opportunity Address"}/>
                                </div>
                            </div>
                            <label className={'required'} htmlFor="opportunitylanguage">Opportunity Language</label>
                            <label>&nbsp;(Select only one)</label>
                            <div className="ml-5">
                                <div className="form-row form-group text-left ml-5">
                                    {this.buildLanguageList()}
                                </div>
                            </div>

                            {this.state.fsHandle &&
                            <div className="alert alert-success fade show" role="alert">
                                Photo upload successful
                            </div>
                            }

                            {/*Filestack image upload*/}
                            <div>
                                {this.state.fsHandle ? '' :
                                    <ReactFilestack
                                        apikey={'APm2qa235SOK43uLAvFPTz'}
                                        componentDisplayMode={{
                                            type: 'button',
                                            customText: 'Optional: Upload image',
                                            // Put any bootstrap/css classes inside of customClass
                                            customClass: 'btn btn-success mb-2 btn-lg btn-block my-3'
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
                                }
                            </div>
                            <button
                                className={'btn btn-primary btn-lg btn-block my-3'}
                                type="submit"
                                value="submit"
                                onClick={this.submitOpportunityButton}>
                                Create Opportunity
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

export default CreateOpportunity;