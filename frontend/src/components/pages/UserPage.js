import React from 'react';
import axios from "axios";
import {displaySpinner} from "../common/Functions";
import MyLanguages from "../profile/MyLanguages";
import AboutMe from "../profile/AboutMe";
import {Link, Route, Switch} from 'react-router-dom';
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
                this.setState({
                    isLoading: false,
                    displayName: res.data.userDetails.displayName,
                    interests: res.data.userDetails.interests,
                    aboutMe: res.data.userDetails.aboutMe,
                    joinDate: res.data.userDetails.joinDate.substring(0, 10),
                    languages: res.data.userDetails.languages,
                    location: res.data.userDetails.location,
                    profileImage: res.data.userDetails.profileImage.url
                })
            });
    }

    changeTab = index => {
        this.setState({
            activeTab: index
        });
    };

    render() {
        if (this.state.isLoading) {
            return displaySpinner()
        }

        return (
            <div className={"container"}>
                <h1 className={"text-center my-4"}>
                    {this.state.displayName}'s Profile
                </h1>
                <div className="row">
                    {/*Left-hand side: Static User Details*/}
                    <div className="col-md-3">
                        <img src={this.state.profileImage} alt={"Avatar"} className="w-100"/>

                        <h2 className={"mt-3"}>My Languages</h2>
                        <MyLanguages languages={this.state.languages}/>
                        <h2 className={"mt-3"}>Join Date</h2>
                        <p>{this.state.joinDate}</p>

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
                                    searchCallback={(search) => {
                                        this.setState({search: search})
                                    }}
                                    viewCallback={(view) => {
                                        this.setState({view: view})
                                    }}
                                    filterCallback={(filter) => {
                                        this.setState({languageFilter: filter})
                                    }}/>
                                <CreatedOpportunities loggedInUser={{id: this.state.userId}} filter={this.state.languageFilter} search={this.state.search} view={this.state.view}/>
                            </Route>

                            <Route path={`/users/${this.state.userId}`}>
                                <AboutMe aboutMe={this.state.aboutMe} interests={this.state.interests}/>
                            </Route>
                        </Switch>
                    </div>
                </div>
            </div>
        )
    }
}

export default UserPage;