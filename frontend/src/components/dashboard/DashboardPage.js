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
                <div className="row mt-2">
                    <Switch>
                        <Route path={"/dashboard/myopportunities"}>
                            <CreatedOpportunities filter={this.state.languageFilter} search={this.state.search} view={this.state.view}/>
                        </Route>
                        <Route path={"/dashboard/interestedin"}>
                            <InterestedOpportunities filter={this.state.languageFilter} search={this.state.search} view={this.state.view}/>
                        </Route>
                        <Route path={"/dashboard/upcoming"}>
                            <UpcomingOpportunities filter={this.state.languageFilter} search={this.state.search} view={this.state.view}/>
                        </Route>
                        <Route path={"/dashboard"}>
                            <AllOpportunities filter={this.state.languageFilter} search={this.state.search} view={this.state.view}/>
                        </Route>
                    </Switch>
                </div>
            </div>
        )
    }
}

export default DashboardPage;