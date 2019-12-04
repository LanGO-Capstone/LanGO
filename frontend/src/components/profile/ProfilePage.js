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
        isValid: "",
        search: '',
        languageFilter: [],
        displayName: '',
        loggedInUser: {
            displayName: '',
            location: '',
            interests: '',
            aboutMe: '',
            joinDate: '',
            languages: [],
            profileImage: '',


        },

        validLanguages: ""
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
        axios.get(`/api/users/${this.props.loggedInUser.id}`)
            .then(res => {
                this.setState({
                    isLoading: false,
                    displayName: res.data.userDetails.displayName,
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

    handleChange = type => event => {
        this.setState({
            [type]: event.target.value
        })
    };

    save = () => {

        if (this.state.loggedInUser.languages.length === 0) {
            this.setState({
                validLanguages: " is-invalid"
            });
            alert("select a language");
            return null;
        } else {
            this.setState({
                validLanguages: " is-valid"
            })
        }


        this.setState({
            isEditing: false
        });

        let languagesString = this.state.loggedInUser.languages.map((element) => {
            return element.language
        });

        axios.post(`/api/users/${this.props.loggedInUser.id}/edit`,
            `displayName=${this.state.displayName}&location=${this.state.loggedInUser.location}&interests=${this.state.loggedInUser.interests}&aboutMe=${this.state.loggedInUser.aboutMe}&languages=${languagesString}`)
            .then(() => console.log("Profile Updated"))
    };


    render() {
        // Necessary to prevent rendering fail on objects/arrays inside of this.state.opportunity
        if (this.state.isLoading) {
            return displaySpinner()
        }

        return (
            <div className={"container mt-5 pt-5"}>
                <h1 className={"text-center"}>
                    {this.state.isEditing ?
                        <div className={'form-inline'}>
                            <input
                                className="form-control"
                                onChange={this.handleChange('displayName')}
                                value={this.state.displayName}
                                type="text"/>
                            <label htmlFor="">
                                's Profile
                            </label>
                        </div>
                        :
                        <div className={'mb-5'}>
                            {this.state.displayName}'s Profile
                        </div>
                    }
                </h1>
                <div className="row">
                    {/*Left-hand side: Static User Details*/}
                    <div className="col-md-3">
                        <div className="text-center">
                            {this.state.loggedInUser.profileImage === "none" ?
                                <i className="fas fa-user fa-10x"/>
                                :
                                <img src={this.state.loggedInUser.profileImage} alt={"Avatar"} className="w-100"/>
                            }
                            <div className={'mt-2'}>
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
                                            axios.post(`/api/users/${this.props.loggedInUser.id}/profileimage/edit`,
                                                `imageUrl=${this.state.loggedInUser.profileImage}`)
                                        }
                                    }
                                />
                            </div>
                        </div>
                        &nbsp;


                        <h2 className={"mt-3"}>Join Date</h2>
                        <p>{this.state.loggedInUser.joinDate}</p>
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

                            isValid={this.state.validLanguages}
                            isEditing={this.state.isEditing}
                            languages={this.state.loggedInUser.languages}/>

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
                                        search={this.state.search}
                                        callback={(search, view, filter) => {
                                            this.setState({
                                                search: search,
                                                view: view,
                                                languageFilter: filter
                                            })
                                        }}/>
                                </div>
                                <CreatedOpportunities loggedInUser={this.props.loggedInUser} filter={this.state.languageFilter} search={this.state.search} view={this.state.view}/>
                            </Route>
                            <Route path={"/profile/interestedin"}>
                                <div className="row my-2">
                                    <SearchAndFilterOptions
                                        search={this.state.search}
                                        callback={(search, view, filter) => {
                                            this.setState({
                                                search: search,
                                                view: view,
                                                languageFilter: filter
                                            })
                                        }}/>
                                </div>
                                <InterestedOpportunities loggedInUser={this.props.loggedInUser} filter={this.state.languageFilter} search={this.state.search} view={this.state.view}/>
                            </Route>
                            <Route path={"/profile"}>
                                <div className="p-2">
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
                                </div>
                                <div>
                                    {this.state.isEditing ?
                                        (<button onClick={() => this.save()} className=" btn btn-success float-left"> Save Changes</button>)
                                        :
                                        (<button onClick={() => this.edit()} className=" btn btn-primary float-left"> Edit Profile</button>)
                                    }
                                </div>

                            </Route>
                        </Switch>

                    </div>
                </div>
            </div>
        )
    }
}

export default ProfilePage;