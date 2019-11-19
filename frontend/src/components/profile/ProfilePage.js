import React from 'react';
import axios from 'axios';
import {Link, Route, Switch} from 'react-router-dom';
import OpportunityListItem from "../opportunities/OpportunityListItem";

class ProfilePage extends React.Component {

    state = {
        interested: [],
        created: [],
        loggedInUser: {
            displayName: "",
            interests: "",
            aboutMe: "",
            joinDate: "",
            languages: [],
            profileImage: ""
        }
    };

    componentDidMount() {
        let interestedList = [];
        let createdList = [];

        // Get request to create logged-in user object
        // Hard-coded userId of 1; replace with userId of logged-in user
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
                            return element.language
                        }),
                        profileImage: res.data.userDetails.profileImage.url
                    }
                })
            });


        // Get request to pull "Opportunities I've Created"
        // Hard-coded userId of 19; replace with userId of logged-in user
        axios.get('/api/users/19/created')
            .then(res => {
                console.log(res.data);
                createdList = res.data.map(opportunity => {
                    return (<OpportunityListItem key={opportunity.id} opportunity={opportunity}/>)
                });
                this.setState({created: createdList});
            });

        // Hard-coded userId of 17; replace with userId of logged-in user
        axios.get('/api/users/17/interestedin')
            .then(res => {
                console.log(res.data);
                interestedList = res.data.map(opportunity => {
                    return (<OpportunityListItem key={opportunity.id} opportunity={opportunity}/>)
                });
                this.setState({interested: interestedList});
            });


    }

    changeTab = (index) => {
        this.setState({
            activeTab: index
        });
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
                        <img src={this.state.loggedInUser.profileImage} alt={"Profile Image"}/>
                        <h2 className={"mt-3"}>My Languages</h2>
                        <ul className="list-unstyled">
                            {this.state.loggedInUser.languages}
                            {/*<li>Japanese</li>*/}
                            {/*<li>Spanish</li>*/}
                            {/*<li>German</li>*/}
                            {/*<li>English</li>*/}
                        </ul>
                        <h2 className={"mt-3"}>Join Date</h2>
                        <p>{this.state.loggedInUser.joinDate}</p>
                    </div>

                    {/*Right-hand side: Tabs*/}
                    <div className="col-md-9">

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
                                <ul className="list-unstyled">{this.state.created}</ul>
                            </Route>
                            <Route path={"/profile/interestedin"}>
                                <h2 className={"mt-3"}>Interested in</h2>
                                <ul className="list-unstyled">{this.state.interested}</ul>
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