import React from 'react';
import axios from "axios";
import {displaySpinner} from "./Functions";

class SearchAndFilterOptions extends React.Component {

    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);

        this.state = {
            search: this.props.search,
            view: 'list',
            languages: [],
            languageFilter: [],
            isLoading: true,
            isExpanded: false,
        }
    }

    handleChange = event => {
        this.setState({
            search: event.target.value
        }, () => {
            this.props.callback(this.state.search, this.state.view, this.state.languageFilter)
        });
    };

    changeView = option => {
        this.setState({
            view: option
        }, () => {
            this.props.callback(this.state.search, this.state.view, this.state.languageFilter)
        })
    };

    changeFilter = (element) => {
        let newFilter = this.state.languageFilter;

        if (this.state.languageFilter.indexOf(element.language) === -1) {
            newFilter.push(element.language);
        } else {
            let index = this.state.languageFilter.indexOf(element.language);
            newFilter.splice(index, 1);
        }

        this.setState({
            languageFilter: newFilter
        }, () => {
            this.props.callback(this.state.search, this.state.view, this.state.languageFilter)
        })
    };

    clearButton = () => {
        this.setState({
            languageFilter: []
        }, () => {
            this.props.callback(this.state.search, this.state.view, this.state.languageFilter)
        })
    };

    componentDidMount() {
        axios.get('/api/languages')
            .then(res => {
                let filter = [];

                if (this.props.loggedInUser) {
                    this.props.loggedInUser.userDetails.languages.forEach(element => {
                        filter.push(element.language)
                    });
                }

                this.setState({
                    languages: res.data,
                    isLoading: false,
                    languageFilter: filter,
                    search: this.props.search
                }, () => {
                    this.props.callback(this.state.search, this.state.view, this.state.languageFilter)
                })
            })
    }

    verifyCheckbox = lang => {
        let found = false;
        this.state.languageFilter.forEach(element => {
            if (element === lang.language) {
                found = true;
            }
        });
        return found;
    };

    buildLanguageList = () => {
        return this.state.languages.map((element) => {
            return (<div className={'form-check col-3'} key={element.id}>
                <input
                    onChange={() => {
                        this.changeFilter(element)
                    }}
                    checked={this.verifyCheckbox(element)}
                    className={'form-check-input'}
                    type="checkbox"
                    value={element.language}
                    name={element.language}
                    id={element.language}/>
                <label htmlFor={element.language}>{element.language}</label>
            </div>)
        })
    };

    expand = () => {
        this.setState({isExpanded: !this.state.isExpanded})
    };


    render() {
        if (this.state.isLoading) {
            return displaySpinner()
        }

        return (
            <div className="w-100 mt-2">
                <div className="input-group input-group-lg mb-2">
                    <input
                        name="search"
                        type="text"
                        className="form-control"
                        id="searchBox"
                        value={this.state.search}
                        onChange={this.handleChange}
                        placeholder="Search"/>
                    <div className="input-group-append">
                        <button
                            onSubmit={e => {
                                e.preventDefault()
                            }}
                            data-target={"#options"}
                            data-toggle={"collapse"}
                            onClick={() => this.expand()}
                            className={"btn btn-outline-secondary p-2"}>Options {this.state.isExpanded ?
                            <i className="mx-1 fas fa-angle-double-up"/> : <i className="mx-1 fas fa-angle-double-down"/>}
                        </button>
                    </div>
                </div>
                <div id={"options"} className="collapse mb-2">
                    <div className="card">
                        <div className="card-body">
                            <div className="row">
                                <div className="col-2 mt-1">
                                    <div className="form-group">
                                        <p className="h5">View</p>
                                        <div className="form-check">
                                            <label>
                                                <input
                                                    className={'form-check-input'}
                                                    onChange={() => this.changeView('list')}
                                                    checked={this.state.view === 'list'}
                                                    type="radio"
                                                    value={'list'}
                                                    id={"list"}
                                                    name="view"/> List
                                            </label>
                                        </div>
                                        <div className="form-check">
                                            <label>
                                                <input
                                                    className={'form-check-input'}
                                                    onChange={() => this.changeView('card')}
                                                    checked={this.state.view === 'card'}
                                                    type="radio"
                                                    value={'card'}
                                                    id={"card"}
                                                    name="view"/> Card
                                            </label>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-10">
                                    <p className="h5">Filter By Language
                                        <button
                                        className={'ml-2 btn btn-light'}
                                        type={"submit"}
                                        value={"submit"}
                                        onClick={this.clearButton}>Clear
                                    </button>
                                    </p>
                                    <div className="form-row form-group ml-3">
                                        {this.buildLanguageList()}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default SearchAndFilterOptions;