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
                        joinDate: new Date(res.data.userDetails.joinDate),
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
            alert("You must select at least one language.");
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

        axios.post(`/api/users/${this.props.loggedInUser.id}/edit`, `displayName=${encodeURIComponent(this.state.displayName)}&location=${encodeURIComponent(this.state.loggedInUser.location)}&interests=${encodeURIComponent(this.state.loggedInUser.interests)}&aboutMe=${encodeURIComponent(this.state.loggedInUser.aboutMe)}&languages=${languagesString}`)
    };

    render() {
        if (this.state.isLoading) {
            return displaySpinner()
        }

        return (
            <div className={"container mt-5 pt-5"}>
                <h1 className={"text-center"}>
                    {this.state.isEditing ?
                        <div className={'form-inline text-center mb-5 justify-content-center'}>
                            <input
                                className="form-control form-control-lg"
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
                            <div className="card shadow">
                                <div className="card-body">

                                    {this.state.loggedInUser.profileImage === "none" ?
                                        <i className="fas fa-user fa-10x"/>
                                        :
                                        <img src={this.state.loggedInUser.profileImage} alt={"Avatar"} className="w-100"/>
                                    }
                                </div>
                            </div>

                            <div className={'my-3'}>
                                <ReactFilestack
                                    apikey={'APm2qa235SOK43uLAvFPTz'}
                                    componentDisplayMode={{
                                        type: 'button',
                                        customText: 'Change Profile Image',
                                        // Put any bootstrap/css classes inside of customClass
                                        customClass: 'btn btn-secondary btn-block shadow'
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

                        {/*Join Date and Languages card*/}
                        <div className="card shadow mb-5">
                            <div className="card-body">
                                <h5 className={"card-title"}>Join Date</h5>
                                <h6 className={'card-subtitle mb-2 text-muted'}>{Intl.DateTimeFormat('en-US', {dateStyle: 'medium'}).format(this.state.loggedInUser.joinDate)}</h6>

                                <h5 className={"card-title"}>My Languages</h5>
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
                        </div>
                    </div>

                    {/*Right-hand side: Tabs*/}
                    <div className="col-md-9">
                        <div className="card shadow">
                            <div className="card-header">

                                {/*Tab Menu*/}
                                <ul className="nav nav-tabs card-header-tabs">
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
                            </div>
                            {/*Tab Contents*/}
                            <div className="card-body">
                                <Switch>
                                    <Route path={"/profile/myopportunities"}>
                                        <SearchAndFilterOptions
                                            search={this.state.search}
                                            callback={(search, view, filter) => {
                                                this.setState({
                                                    search: search,
                                                    view: view,
                                                    languageFilter: filter
                                                })
                                            }}/>
                                        <CreatedOpportunities loggedInUser={this.props.loggedInUser} filter={this.state.languageFilter} search={this.state.search} view={this.state.view}/>
                                    </Route>

                                    <Route path={"/profile/interestedin"}>
                                        <SearchAndFilterOptions
                                            search={this.state.search}
                                            callback={(search, view, filter) => {
                                                this.setState({
                                                    search: search,
                                                    view: view,
                                                    languageFilter: filter
                                                })
                                            }}/>
                                        <InterestedOpportunities loggedInUser={this.props.loggedInUser} filter={this.state.languageFilter} search={this.state.search} view={this.state.view}/>
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
                                        {this.state.isEditing ?
                                            (<button onClick={() => this.save()} className="btn btn-success float-right mt-2"> Save Changes</button>)
                                            :
                                            (<button onClick={() => this.edit()} className="btn btn-secondary float-right mt-2"> Edit Profile</button>)
                                        }

                                    </Route>
                                </Switch>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default ProfilePage;