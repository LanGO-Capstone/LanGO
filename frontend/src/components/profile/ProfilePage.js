import React from 'react';
import axios from 'axios';
import {Link, Route, Switch} from 'react-router-dom';
import OpportunityListItem from "../opportunities/OpportunityListItem";

class ProfilePage extends React.Component {

    state = {
        interested: [],
        created: []
    };

    componentDidMount() {
        let interestedList = [];
        let createdList = [];

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
                    Userfirst Userlast's Profile
                </h1>

                <div className="row">
                    {/*Left-hand side: Static User Details*/}
                    <div className="col-md-3">
                        <img src={"https://via.placeholder.com/200"} alt={"Profile Image"}/>
                        <h2 className={"mt-3"}>My Languages</h2>
                        <ul>
                            <li>Japanese</li>
                            <li>Spanish</li>
                            <li>German</li>
                            <li>English</li>
                        </ul>
                        <h2 className={"mt-3"}>Join Date</h2>
                        <p>11/15/2019</p>
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
                                <h2 className={"mt-3"}>About Me</h2>
                            </Route>
                        </Switch>

                    </div>


                </div>




            </div>
        )
    }
}

export default ProfilePage;