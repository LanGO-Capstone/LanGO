import React from 'react';
import {Link, Route, Switch} from 'react-router-dom';
import UpcomingOpportunities from "../feeds/UpcomingOpportunities";
import AllOpportunities from "../feeds/AllOpportunities";
import InterestedOpportunities from "../feeds/InterestedOpportunities";
import CreatedOpportunities from "../feeds/CreatedOpportunities";
import SearchAndFilterOptions from "../common/SearchAndFilterOptions";

class DashboardPage extends React.Component {

    state = {
        activeTab: this.props.location.pathname,
        search: '',
        view: 'list',
        languageFilter: []
    };


    static getDerivedStateFromProps(props, state) {
        if (props.location.pathname !== state.activeTab) {
            return {
                activeTab: props.location.pathname
            }
        }
        return null;
    }

    changeTab = tabName => {
        this.setState({
            activeTab: tabName
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
                            to={"/dashboard"}
                            onClick={() => this.changeTab("/dashboard")}
                            className={"nav-link" + (this.state.activeTab === "/dashboard" ? " active" : "")}>
                            Opportunities
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link
                            to={"/dashboard/myopportunities"}
                            onClick={() => this.changeTab("/dashboard/myopportunities")}
                            className={"nav-link" + (this.state.activeTab === "/dashboard/myopportunities" ? " active" : "")}>
                            My Opportunities
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link
                            to={"/dashboard/interestedin"}
                            onClick={() => this.changeTab("/dashboard/interestedin")}
                            className={"nav-link" + (this.state.activeTab === "/dashboard/interestedin" ? " active" : "")}>
                            Opportunities I'm Interested In
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link
                            to={"/dashboard/upcoming"}
                            onClick={() => this.changeTab("/dashboard/upcoming")}
                            className={"nav-link" + (this.state.activeTab === "/dashboard/upcoming" ? " active" : "")}>
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