import React from 'react';
import axios from 'axios';
import {Link, Route, Switch} from 'react-router-dom';
import OpportunityListItem from "../opportunities/OpportunityListItem";
import CreatedOpportunities from "../feeds/CreatedOpportunities";
import InterestedOpportunities from "../feeds/InterestedOpportunities";

class ProfilePage extends React.Component {

    state = {
        view: 'list',
        loggedInUser: {
            displayName: '',
            interests: '',
            aboutMe: '',
            joinDate: '',
            languages: [],
            profileImage: ''
        }
    };

    componentDidMount() {
        // Get request to create logged-in user object
        // Hard-coded userId of 8; replace with userId of logged-in user
        axios.get('/api/users/8')
            .then(res => {
                console.log(res.data);
                this.setState({
                    loggedInUser: {
                        displayName: res.data.userDetails.displayName,
                        interests: res.data.userDetails.interests,
                        aboutMe: res.data.userDetails.aboutMe,
                        joinDate: res.data.userDetails.joinDate.substring(0, 10),
                        languages: res.data.userDetails.languages.map(function(element) {
                            return <li key={element.id}>{element.language}</li>
                        }),
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

    render() {
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
                                    to={"/profile/"}
                                    onClick={() => this.changeTab(0)}
                                    className={"nav-link" + (this.state.activeTab === 0 ? " active" : "")}>
                                    About Me
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link
                                    to={"/profile/myopportunities"}
                                    onClick={() => this.changeTab(1)}
                                    className={"nav-link" + (this.state.activeTab === 1 ? " active" : "")}>
                                    My Opportunities
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link
                                    to={"/profile/interestedin"}
                                    onClick={() => this.changeTab(2)}
                                    className={"nav-link" + (this.state.activeTab === 2 ? " active" : "")}>
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
                                <h2 className={"my-3"}>About Me</h2>
                                <h4>My Interests</h4>
                                <p>{this.state.loggedInUser.interests}</p>
                                <h4>More About Me</h4>
                                <p>{this.state.loggedInUser.aboutMe}</p>
                            </Route>
                        </Switch>

                    </div>


                </div>




            </div>
        )
    }
}

export default ProfilePage;