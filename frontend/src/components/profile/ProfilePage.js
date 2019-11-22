import React from 'react';
import axios from 'axios';
import {Link, Route, Switch} from 'react-router-dom';
import CreatedOpportunities from "../feeds/CreatedOpportunities";
import InterestedOpportunities from "../feeds/InterestedOpportunities";
import AboutMe from "./AboutMe";

class ProfilePage extends React.Component {

    state = {
        view: 'list',
        isLoading: true,
        activeTab: this.props.location.pathname,
        isEditing: false,
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
        // Hard-coded userId of 8; replace with userId of logged-in user
        axios.get('/api/users/13')
            .then(res => {
                console.log(res.data);
                this.setState({
                    isLoading: false,
                    loggedInUser: {
                        displayName: res.data.userDetails.displayName,
                        interests: res.data.userDetails.interests,
                        aboutMe: res.data.userDetails.aboutMe,
                        joinDate: res.data.userDetails.joinDate.substring(0, 10),
                        languages: res.data.userDetails.languages.map(function (element) {
                            return <li key={element.id}>{element.language}</li>
                        }),
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

    changeView = option => {
        this.setState({
            view: option
        })
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

        axios.post('/api/users/3/edit', `displayName=${this.state.loggedInUser.displayName}&location=${this.state.loggedInUser.location}&interests=${this.state.loggedInUser.interests}&aboutMe=${this.state.loggedInUser.aboutMe}&languages=${this.state.loggedInUser.languages}`)
            .then(() => console.log(this.state.loggedInUser))
    };

    render() {
        // Necessary to prevent rendering fail on objects/arrays inside of this.state.opportunity
        if (this.state.isLoading) {
            return (
                <div>Loading</div>
            )
        }
      
        return (
            <div className={"container"}>
                <h1 className={"text-center my-4"}>
                    {this.state.loggedInUser.displayName}'s Profile
                </h1>
                <div className="row">
                    {/*Left-hand side: Static User Details*/}
                    <div className="col-md-3">
                        <img src={this.state.loggedInUser.profileImage} alt={"Avatar"}/>
                        <h2 className={"mt-3"}>My Languages</h2>
                        <ul className="list-unstyled">
                            {this.state.loggedInUser.languages}
                        </ul>
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
                        {/*View Options Buttons*/}
                        {/*Aim to refactor later as a component later*/}
                        <label className={"btn btn-secondary" + (this.state.view === 'list' ? " active" : "")}>
                            <input
                                onChange={() => this.changeView('list')}
                                checked={this.state.view === 'list'}
                                type="radio"
                                value={'list'}
                                id={"list"}
                                name="view"/>List
                        </label>
                        <label className={"btn btn-secondary" + (this.state.view === 'card' ? " active" : "")}>
                            <input
                                onChange={() => this.changeView('card')}
                                checked={this.state.view === 'card'}
                                type="radio"
                                value={'card'}
                                id={"card"}
                                name="view"/>Card
                        </label>
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
                                <h2 className={"mt-3"}>My Opportunities</h2>
                                <CreatedOpportunities view={this.state.view}/>
                            </Route>
                            <Route path={"/profile/interestedin"}>
                                <h2 className={"mt-3"}>Opportunities I'm Interested in</h2>
                                <InterestedOpportunities view={this.state.view}/>
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