import React from 'react';
import axios from 'axios';
import {Link, Route, Switch} from 'react-router-dom';
import CreatedOpportunities from "../feeds/CreatedOpportunities";
import InterestedOpportunities from "../feeds/InterestedOpportunities";
import AboutMe from "./AboutMe";
import {displaySpinner} from "../common/Functions";
import MyLanguages from "./MyLanguages";
import SearchAndFilterOptions from "../common/SearchAndFilterOptions";
import ReactFilestack from 'filestack-react';

class ProfilePage extends React.Component {

    state = {
        view: 'list',
        isLoading: true,
        activeTab: this.props.location.pathname,
        isEditing: false,
        search: '',
        languageFilter: [],
        loggedInUser: {
            displayName: '',
            location: '',
            interests: '',
            aboutMe: '',
            joinDate: '',
            languages: [],
            profileImage: ''
        }
    };

    static getDerivedStateFromProps(props, state) {
        if (props.location.pathname !== state.activeTab) {
            return {
                activeTab: props.location.pathname
            }
        }
        return null;
    }

    componentDidMount() {
        // Get request to create logged-in user object
        // Hard-coded userId of 13; replace with userId of logged-in user
        axios.get('/api/users/13')
            .then(res => {
                this.setState({
                    isLoading: false,
                    loggedInUser: {
                        displayName: res.data.userDetails.displayName,
                        interests: res.data.userDetails.interests,
                        aboutMe: res.data.userDetails.aboutMe,
                        joinDate: res.data.userDetails.joinDate.substring(0, 10),
                        languages: res.data.userDetails.languages,
                        location: res.data.userDetails.location,
                        profileImage: res.data.userDetails.profileImage.url
                    }
                })
            });
    }

    changeTab = index => {
        this.setState({
            activeTab: index
        });
    };

    edit = () => {
        this.setState({
            isEditing: true
        })
    };

    save = () => {
        this.setState({
            isEditing: false
        });

        let languagesString = this.state.loggedInUser.languages.map((element) => {
            return element.language
        });

        axios.post('/api/users/13/edit',
            `displayName=${this.state.loggedInUser.displayName}&location=${this.state.loggedInUser.location}&interests=${this.state.loggedInUser.interests}&aboutMe=${this.state.loggedInUser.aboutMe}&languages=${languagesString}`)
            .then(() => console.log("Profile Updated"))
    };

    render() {
        // Necessary to prevent rendering fail on objects/arrays inside of this.state.opportunity
        if (this.state.isLoading) {
            return displaySpinner()
        }

        return (
            <div className={"container"}>
                <h1 className={"text-center my-4"}>
                    {this.state.loggedInUser.displayName}'s Profile
                </h1>
                <div className="row">
                    {/*Left-hand side: Static User Details*/}
                    <div className="col-md-3">
                        <img src={this.state.loggedInUser.profileImage} alt={"Avatar"} className="w-100"/>
                        <div>
                            <ReactFilestack
                                apikey={'APm2qa235SOK43uLAvFPTz'}
                                componentDisplayMode={{
                                    type: 'button',
                                    customText: 'Change Profile Image',
                                    // Put any bootstrap/css classes inside of customClass
                                    customClass: 'btn btn-primary'
                                }}
                                onSuccess={
                                    (res) => {
                                        this.setState({
                                            loggedInUser: {
                                                displayName: this.state.loggedInUser.displayName,
                                                interests: this.state.loggedInUser.interests,
                                                aboutMe: this.state.loggedInUser.aboutMe,
                                                joinDate: this.state.loggedInUser.joinDate,
                                                languages: this.state.loggedInUser.languages,
                                                location: this.state.loggedInUser.location,
                                                profileImage: 'https://cdn.filestackcontent.com/' + res.filesUploaded[0].handle
                                            }
                                        });
                                        // Hard-coded user id of 13 - remove later
                                        axios.post('/api/users/13/profileimage/edit',
                                            `imageUrl=${this.state.loggedInUser.profileImage}`)
                                    }
                                }
                            />
                        </div>
                        <h2 className={"mt-3"}>My Languages</h2>
                        <MyLanguages
                            callback={(languages) => this.setState({
                                loggedInUser: {
                                    displayName: this.state.loggedInUser.displayName,
                                    joinDate: this.state.loggedInUser.joinDate,
                                    languages: languages,
                                    profileImage: this.state.loggedInUser.profileImage,
                                    interests: this.state.loggedInUser.interests,
                                    aboutMe: this.state.loggedInUser.aboutMe
                                }
                            })}
                            isEditing={this.state.isEditing}
                            languages={this.state.loggedInUser.languages}/>
                        <h2 className={"mt-3"}>Join Date</h2>
                        <p>{this.state.loggedInUser.joinDate}</p>
                        {this.state.isEditing ?
                            (<button onClick={() => this.save()} className="btn btn-success">Save</button>)
                            :
                            (<button onClick={() => this.edit()} className="btn btn-primary">Edit</button>)
                        }
                    </div>
                    {/*Right-hand side: Tabs*/}
                    <div className="col-md-9">
                        {/*Tab Menu*/}
                        <ul className="nav nav-tabs">
                            <li className="nav-item">
                                <Link
                                    to={"/profile"}
                                    onClick={() => this.changeTab('/profile')}
                                    className={"nav-link" + (this.state.activeTab === '/profile' ? " active" : "")}>
                                    About Me
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link
                                    to={"/profile/myopportunities"}
                                    onClick={() => this.changeTab('/profile/myopportunities')}
                                    className={"nav-link" + (this.state.activeTab === '/profile/myopportunities' ? " active" : "")}>
                                    My Opportunities
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link
                                    to={"/profile/interestedin"}
                                    onClick={() => this.changeTab('/profile/interestedin')}
                                    className={"nav-link" + (this.state.activeTab === '/profile/interestedin' ? " active" : "")}>
                                    Opportunities I'm Interested In
                                </Link>
                            </li>
                        </ul>
                        {/*Tab Contents*/}
                        <Switch>
                            <Route path={"/profile/myopportunities"}>
                                <div className="row my-2">
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
                                </div>
                                <CreatedOpportunities filter={this.state.languageFilter} search={this.state.search} view={this.state.view}/>
                            </Route>
                            <Route path={"/profile/interestedin"}>
                                <div className="row my-2">
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
                                </div>
                                <InterestedOpportunities filter={this.state.languageFilter} search={this.state.search} view={this.state.view}/>
                            </Route>
                            <Route path={"/profile"}>
                                <AboutMe
                                    callback={(interests, aboutMe) => this.setState({
                                        loggedInUser: {
                                            displayName: this.state.loggedInUser.displayName,
                                            joinDate: this.state.loggedInUser.joinDate,
                                            languages: this.state.loggedInUser.languages,
                                            profileImage: this.state.loggedInUser.profileImage,
                                            interests: interests,
                                            aboutMe: aboutMe
                                        }
                                    })}
                                    isEditing={this.state.isEditing}
                                    aboutMe={this.state.loggedInUser.aboutMe}
                                    interests={this.state.loggedInUser.interests}/>
                            </Route>
                        </Switch>
                    </div>
                </div>
            </div>
        )
    }
}

export default ProfilePage;