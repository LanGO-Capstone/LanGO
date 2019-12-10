import React from 'react';
import {Link, Route, Switch} from 'react-router-dom';
import UpcomingOpportunities from "../feeds/UpcomingOpportunities";
import AllOpportunities from "../feeds/AllOpportunities";
import SearchAndFilterOptions from "../common/SearchAndFilterOptions";

class ExplorePage extends React.Component {

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
                <h1 className={"text-center"}>Explore</h1>
                <div className="row mx-0 my-2">
                    <SearchAndFilterOptions
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
                            to={"/explore"}
                            onClick={() => this.changeTab("/explore")}
                            className={"nav-link" + (this.state.activeTab === "/explore" ? " active" : "")}>
                            Opportunities
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link
                            to={"/explore/upcoming"}
                            onClick={() => this.changeTab("/explore/upcoming")}
                            className={"nav-link" + (this.state.activeTab === "/explore/upcoming" ? " active" : "")}>
                            Upcoming Opportunities
                        </Link>
                    </li>
                </ul>
                <div className="row m-0">
                    <Switch>
                        <Route path={"/explore/upcoming"}>
                            <UpcomingOpportunities filter={this.state.languageFilter} search={this.state.search} view={this.state.view}/>
                        </Route>
                        <Route path={"/explore"}>
                            <AllOpportunities filter={this.state.languageFilter} search={this.state.search} view={this.state.view}/>
                        </Route>
                    </Switch>
                </div>
            </div>
        )
    }
}

export default ExplorePage;