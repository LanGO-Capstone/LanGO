import React from 'react';
import {Link, Route, Switch} from 'react-router-dom';
import UpcomingOpportunities from "../feeds/UpcomingOpportunities";
import AllOpportunities from "../feeds/AllOpportunities";
import InterestedOpportunities from "../feeds/InterestedOpportunities";
import CreatedOpportunities from "../feeds/CreatedOpportunities";

class DashboardPage extends React.Component {

    state = {
        activeTab: 0,
        view: 'list'
    };

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
            <div className="container">
                <h1 className={"text-center"}>Dashboard</h1>
                {/*<div data-toggle={"buttons"} className="btn-group btn-group-toggle">*/}
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
                {/*</div>*/}
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
                        <CreatedOpportunities view={this.state.view}/>
                    </Route>
                    <Route path={"/dashboard/interestedin"}>
                        <h1>Interested in</h1>
                        <InterestedOpportunities view={this.state.view}/>
                    </Route>
                    <Route path={"/dashboard/upcoming"}>
                        <h1>Upcoming</h1>
                        <UpcomingOpportunities view={this.state.view}/>
                    </Route>
                    <Route path={"/dashboard"}>
                        <h1>Opportunities</h1>
                        <AllOpportunities view={this.state.view}/>
                    </Route>
                </Switch>
            </div>
        )
    }
}

export default DashboardPage;