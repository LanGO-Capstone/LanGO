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
        view: 'card',
        languageFilter: []
    };

    static getDerivedStateFromProps(props, state) {
        if (props.location.pathname !== state.activeTab) {
            return {
                activeTab: props.location.pathname
            }
        }
        if (props.location.state) {
            if (props.location.state.search !== state.search) {
                return {
                    search: props.location.state.search
                }
            }
        }
        return null;
    }

    changeTab = tabName => {
        this.setState({
            activeTab: tabName
        });
    };

    componentDidMount() {
        this.props.callback();
        if (this.props.location.state) {
            this.setState({
                search: this.props.location.state.search
            })
        }
    }

    componentWillUnmount() {
        this.props.callback()
    }

    render() {
        return (
            <div className="container mt-5 pt-5">
                <h1 className={"text-center"}>Dashboard</h1>
                <div className="row my-2">
                    <SearchAndFilterOptions
                        loggedInUser={this.props.loggedInUser}
                        search={this.state.search}
                        callback={(search, view, filter) => {
                            this.setState({
                                search: search,
                                view: view,
                                languageFilter: filter
                            })
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
                            <CreatedOpportunities loggedInUser={this.props.loggedInUser} filter={this.state.languageFilter} search={this.state.search} view={this.state.view}/>
                        </Route>
                        <Route path={"/dashboard/interestedin"}>
                            <InterestedOpportunities loggedInUser={this.props.loggedInUser} filter={this.state.languageFilter} search={this.state.search} view={this.state.view}/>
                        </Route>
                        <Route path={"/dashboard/upcoming"}>
                            <UpcomingOpportunities loggedInUser={this.props.loggedInUser} filter={this.state.languageFilter} search={this.state.search} view={this.state.view}/>
                        </Route>
                        <Route path={"/dashboard"}>
                            <AllOpportunities loggedInUser={this.props.loggedInUser} filter={this.state.languageFilter} search={this.state.search} view={this.state.view}/>
                        </Route>
                    </Switch>
                </div>
            </div>
        )
    }
}

export default DashboardPage;