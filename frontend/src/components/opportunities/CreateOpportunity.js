import React from 'react';
import axios from "axios";
import {Redirect} from "react-router-dom";

class CreateOpportunity extends React.Component {

    state = {
        //array that collects the lists of languages from the database
        dbLangs: [],
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

    handleOptionChange = (changeEvent) => {
        this.setState({
            selectedOption: changeEvent.target.value
        });
    };

    submitOpportunityButton = event => {
        event.preventDefault();
        // console.log(`title=${this.state.title}&datetime=${this.state.datetime}&address=${this.state.address}&body=${this.state.body}&oppLanguage=${this.state.selectedOption}`);
        axios.post("/api/opportunities/create", `title=${this.state.title}&datetime=${this.state.datetime}&address=${this.state.address}&body=${this.state.body}&oppLanguage=${this.state.selectedOption}`)
            .then(() => {
                this.setState({successfulSubmission: true});
            });
    };

    render() {
        if (this.state.isLoading) {
            return (
                <div>Loading</div>
            )
        }

        if (this.state.successfulSubmission) {
            return (<Redirect to={"/profile/myopportunities"}/>)
        }

        let languagesList = this.state.dbLangs.map((element) => {
            return (
                <div className={"form-check col-md-3"} key={element.id}>
                    <input
                        className={"form-check-input"}
                        onChange={this.handleOptionChange}
                        type="radio"
                        value={element.language}
                        name="oppLanguage"
                    />

                    {/*//input id has to match the label's htmlFor attribute */}
                    <label htmlFor={element.language}>
                        {element.language}
                    </label>

                </div>)
        });

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
                                {languagesList}
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