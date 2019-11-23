import React from 'react';
import {Link, Route, Switch} from 'react-router-dom';
import UpcomingOpportunities from "../feeds/UpcomingOpportunities";
import AllOpportunities from "../feeds/AllOpportunities";
import InterestedOpportunities from "../feeds/InterestedOpportunities";
import CreatedOpportunities from "../feeds/CreatedOpportunities";
import SearchAndFilterOptions from "../common/SearchAndFilterOptions";

class DashboardPage extends React.Component {

    state = {
        activeTab: 0,
        search: '',
        view: 'list',
        languageFilter: []
    };

    changeTab = index => {
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
                <div className="row">
                    <div className="col-9">
                        <Switch>
                            <Route path={"/dashboard/myopportunities"}>
                                <h1>My Opportunities</h1>
                                <CreatedOpportunities filter={this.state.languageFilter} search={this.state.search} view={this.state.view}/>
                            </Route>
                            <Route path={"/dashboard/interestedin"}>
                                <h1>Interested in</h1>
                                <InterestedOpportunities filter={this.state.languageFilter} search={this.state.search} view={this.state.view}/>
                            </Route>
                            <Route path={"/dashboard/upcoming"}>
                                <h1>Upcoming</h1>
                                <UpcomingOpportunities filter={this.state.languageFilter} search={this.state.search} view={this.state.view}/>
                            </Route>
                            <Route path={"/dashboard"}>
                                <h1>Opportunities</h1>
                                <AllOpportunities filter={this.state.languageFilter} search={this.state.search} view={this.state.view}/>
                            </Route>
                        </Switch>
                    </div>
                    <div className="col-3">
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
                </div>
            </div>
        )
    }
}

export default DashboardPage;