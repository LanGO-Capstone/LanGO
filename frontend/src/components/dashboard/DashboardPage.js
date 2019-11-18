import React from 'react';
import axios from 'axios';
import {Link, Route, Switch} from 'react-router-dom';
import OpportunityListItem from "../opportunities/OpportunityListItem";

class DashboardPage extends React.Component {

    state = {
        opportunities: [],
        activeTab: 0
    };

    componentDidMount() {
        let opportunityList = [];

        axios.get('/api/opportunities')
            .then(res => {
                console.log(res.data);
                opportunityList = res.data.map(opportunity => {
                    // console.log(opportunity);
                    return (<OpportunityListItem key={opportunity.id} opportunity={opportunity}/>)
                });
                this.setState({opportunities: opportunityList});
            });
    }

    changeTab = (index) => {
        this.setState({
            activeTab: index
        });
    };

    render() {
        return (
            <div className="container">
                <h1 className={"text-center"}>Dashboard</h1>
                <ul className="nav nav-tabs">
                    <li className="nav-item">
                        <Link
                            to={"/dashboard/"}
                            onClick={() => this.changeTab(0)}
                            className={"nav-link" + (this.state.activeTab === 0 ? " active" : "")}>
                            Opportunities
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link
                            to={"/dashboard/myopportunities"}
                            onClick={() => this.changeTab(1)}
                            className={"nav-link" + (this.state.activeTab === 1 ? " active" : "")}>
                            My Opportunities
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link
                            to={"/dashboard/interestedin"}
                            onClick={() => this.changeTab(2)}
                            className={"nav-link" + (this.state.activeTab === 2 ? " active" : "")}>
                            Opportunities I'm Interested In
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link
                            to={"/dashboard/upcoming"}
                            onClick={() => this.changeTab(3)}
                            className={"nav-link" + (this.state.activeTab === 3 ? " active" : "")}>
                            Upcoming Opportunities
                        </Link>
                    </li>
                </ul>
                <Switch>
                    <Route path={"/dashboard/myopportunities"}>
                        <h1>My Opportunities</h1>
                    </Route>
                    <Route path={"/dashboard/interestedin"}>
                        <h1>Interested in</h1>
                    </Route>
                    <Route path={"/dashboard/upcoming"}>
                        <h1>Upcoming</h1>
                    </Route>
                    <Route path={"/dashboard"}>
                        <h1>Opportunities</h1>
                        <ul className="list-unstyled">{this.state.opportunities}</ul>
                    </Route>
                </Switch>
            </div>
        )
    }
}

export default DashboardPage;