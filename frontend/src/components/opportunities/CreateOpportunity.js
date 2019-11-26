import React from 'react';
import axios from "axios";
import {Redirect} from "react-router-dom";
import {displaySpinner} from "../common/Functions";
import ReactFilestack from 'filestack-react';

class CreateOpportunity extends React.Component {

    state = {
        languages: [],
        isLoading: true,
        successfulSubmission: false,
        fsHandle: '',
        selectedLanguage: ''
    };

    componentDidMount() {
        axios.get('/api/languages')
            .then(res => {
                this.setState({
                    languages: res.data.map((element) => {
                        return (
                            <div className={"form-check col-md-3"} key={element.id}>
                                <label htmlFor={element.language}>
                                    <input
                                        id={element.language}
                                        className={"form-check-input"}
                                        onChange={this.handleLanguageChange}
                                        type="radio"
                                        value={element.language}
                                        name="oppLanguage"
                                    />
                                    {element.language}
                                </label>
                            </div>)
                    }),
                    isLoading: false
                })
            })
    }

    handleInput = type => event => {
        this.setState({
            [type]: event.target.value
        });
    };

    handleLanguageChange = changeEvent => {
        this.setState({
            selectedLanguage: changeEvent.target.value
        });
    };

    submitOpportunityButton = event => {
        event.preventDefault();

        axios.post("/api/opportunities/create",
            `title=${this.state.title}&datetime=${this.state.datetime}&address=${this.state.address}&body=${this.state.body}&oppLanguage=${this.state.selectedLanguage}&fsHandle=${this.state.fsHandle}`)
            .then(() => {
                this.setState({successfulSubmission: true});
            });
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
                                <label htmlFor="title">Title:</label>
                                <input
                                    className={'form-control'}
                                    onChange={this.handleInput('title')}
                                    type={"text"}
                                    name={"title"}
                                    placeholder={"Opportunity Title"}/>
                            </div>
                            <div className={'form-group'}>
                                <label htmlFor="body">Opportunity Description:</label>
                                <textarea
                                    className={'form-control'}
                                    onChange={this.handleInput('body')}
                                    name="body"
                                    placeholder={"Description"}
                                    id="body"
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
                            <div className="form-row form-group">
                                {this.state.languages}
                            </div>
                            {/*Filestack image upload*/}
                            <div>
                                <ReactFilestack
                                    apikey={'APm2qa235SOK43uLAvFPTz'}
                                    componentDisplayMode={{
                                        type: 'link',
                                        customText: 'Optional: Upload image',
                                        // Put any bootstrap/css classes inside of customClass
                                        // customClass: ''
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