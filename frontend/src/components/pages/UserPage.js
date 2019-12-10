import React from 'react';
import axios from "axios";
import {displaySpinner} from "../common/Functions";
import MyLanguages from "../profile/MyLanguages";
import AboutMe from "../profile/AboutMe";
import {Link, Redirect, Route, Switch} from 'react-router-dom';
import CreatedOpportunities from "../feeds/CreatedOpportunities";
import SearchAndFilterOptions from "../common/SearchAndFilterOptions";

class UserPage extends React.Component {

    state = {
        userId: this.props.location.pathname.match(/\d+/)[0],
        isLoading: true,
        activeTab: this.props.location.pathname,
        view: 'list',
        search: '',
        languageFilter: '',
        error: false,
        displayName: '',
        location: '',
        interests: '',
        aboutMe: '',
        joinDate: '',
        languages: [],
        profileImage: ''
    };

    componentDidMount() {
        axios.get(`/api/users/${this.state.userId}`)
            .then(res => {
                if (typeof res.data === "object") {
                    this.setState({
                        isLoading: false,
                        displayName: res.data.userDetails.displayName,
                        interests: res.data.userDetails.interests,
                        aboutMe: res.data.userDetails.aboutMe,
                        joinDate: new Date(res.data.userDetails.joinDate),
                        languages: res.data.userDetails.languages,
                        location: res.data.userDetails.location,
                        profileImage: res.data.userDetails.profileImage.url
                    })
                } else {
                    this.setState({
                        error: true
                    })
                }

            })
            .catch(() => {
                this.setState({
                    error: true
                })
            });
    }

    changeTab = index => {
        this.setState({
            activeTab: index
        });
    };

    render() {
        if (this.state.error) {
            return (<Redirect to={"/404"}/>)
        }

        if (this.state.isLoading) {
            return displaySpinner()
        }

        return (
            <div className={"container mt-5 pt-5"}>
                <h1 className={"text-center mb-5"}>
                    {this.state.displayName}'s Profile
                </h1>
                <div className="row">
                    {/*Left-hand side: Static User Details*/}
                    <div className="col-md-3">
                        <div className="card text-center mb-2">
                            <div className="card-body">
                                {this.state.profileImage === "none" ?
                                    <i className="fas fa-user fa-10x"/>
                                    :
                                    <img src={this.state.profileImage} alt={"Avatar"} className="w-100"/>
                                }
                            </div>
                        </div>

                        <div className="card mb-2">
                            <div className="card-body">

                                <h5 className={"card-title"}>Join Date</h5>
                                <h6 className={'card-subtitle mb-2 text-muted'}>{Intl.DateTimeFormat('en-US', {dateStyle: 'medium'}).format(this.state.joinDate)}</h6>

                                <h5 className={"card-title"}>My Languages</h5>
                                <MyLanguages languages={this.state.languages}/>
                            </div>
                        </div>
                        <div className="text-center">

                            {this.props.loggedInUser &&
                            <Link
                                className={"fas fa-envelope btn btn-primary"}
                                to={{
                                    pathname: '/inbox',
                                    state: {
                                        userId: this.state.userId,
                                        displayName: this.state.displayName
                                    }
                                }}/>}
                        </div>
                    </div>
                    {/*Right-hand side: Tabs*/}
                    <div className="col-md-9">
                        <ul className="nav nav-tabs">
                            <li className="nav-item">
                                <Link
                                    to={`/users/${this.state.userId}`}
                                    onClick={() => this.changeTab(`/users/${this.state.userId}`)}
                                    className={"nav-link" + (this.state.activeTab === `/users/${this.state.userId}` ? " active" : "")}>
                                    About Me
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link
                                    to={`/users/${this.state.userId}/created`}
                                    onClick={() => this.changeTab(`/users/${this.state.userId}/created`)}
                                    className={"nav-link" + (this.state.activeTab === `/users/${this.state.userId}/created` ? " active" : "")}>
                                    My Opportunities
                                </Link>
                            </li>
                        </ul>
                        <Switch>
                            <Route path={`/users/:id/created`}>
                                <SearchAndFilterOptions
                                    search={this.state.search}
                                    callback={(search, view, filter) => {
                                        this.setState({
                                            search: search,
                                            view: view,
                                            languageFilter: filter
                                        })
                                    }}/>
                                <CreatedOpportunities loggedInUser={{id: this.state.userId}} filter={this.state.languageFilter} search={this.state.search} view={this.state.view}/>
                            </Route>

                            <Route path={`/users/${this.state.userId}`}>
                                <div className="p-2">
                                    <AboutMe aboutMe={this.state.aboutMe} interests={this.state.interests}/>
                                </div>
                            </Route>
                        </Switch>
                    </div>
                </div>
            </div>
        )
    }
}

export default UserPage;