import React from 'react';
import LoginScreen from "./components/pages/LoginScreen";
import RegisterScreen from "./components/pages/RegisterScreen";
import ProfilePage from './components/profile/ProfilePage';
import NavbarLoggedOut from "./components/common/NavbarLoggedOut";
import NavbarLoggedIn from "./components/common/NavbarLoggedIn";
import {BrowserRouter, Route, Switch} from "react-router-dom";
import CreateOpportunity from "./components/opportunities/CreateOpportunity";
import OpportunityPage from "./components/opportunities/OpportunityPage";
import LandingPage from "./components/pages/LandingPage";
import AboutUsPage from "./components/pages/AboutUsPage";
import UserPage from "./components/pages/UserPage";
import InboxPage from "./components/pages/InboxPage";
import axios from 'axios';
import {displaySpinner} from "./components/common/Functions";
import ExplorePage from "./components/pages/ExplorePage";
import DashboardPage from "./components/pages/DashboardPage";
import ErrorPage from "./components/common/404";

class App extends React.Component {

    state = {
        loggedInUser: null,
        isLoading: true,
        search: true
    };

    componentDidMount() {
        axios.get('api/loggedInUser')
            .then(res => {
                if (typeof res.data === "object") {
                    this.setState({
                        loggedInUser: res.data,
                        isLoading: false
                    });
                } else {
                    this.setState({
                        isLoading: false
                    })
                }
            })
    }

    logIn = () => {
        axios.get('api/loggedInUser').then(res => {
            this.setState({
                loggedInUser: res.data
            });
        })
    };

    logout = () => {
        axios.post('api/logout').then(() => {
            this.setState({
                loggedInUser: null
            })
        })
    };

    toggleSearch = () => {
        this.setState({
            search: !this.state.search
        })
    };

    render() {
        if (this.state.isLoading) {
            return displaySpinner()
        }

        return (
            <BrowserRouter>
                {this.state.loggedInUser ?
                    <NavbarLoggedIn
                        searchBox={this.state.search}
                        logout={this.logout}/>
                    :
                    <NavbarLoggedOut searchBox={this.state.search}/>}
                <div>
                    <Switch>
                        <Route path={"/opportunities/create"}
                               render={routeProps => <CreateOpportunity loggedInUser={this.state.loggedInUser}  {...routeProps}/>}/>
                        <Route path={"/opportunities/:id"}
                               render={routeProps => <OpportunityPage loggedInUser={this.state.loggedInUser} {...routeProps}/>}/>
                        <Route path={"/users/:id"}
                               render={routeProps => <UserPage loggedInUser={this.state.loggedInUser} {...routeProps}/>}/>
                        <Route path={"/dashboard"}
                               render={routeProps => <DashboardPage callback={() => this.toggleSearch()} loggedInUser={this.state.loggedInUser} {...routeProps}/>}/>
                        <Route path={"/explore"}
                               render={routeProps => <ExplorePage callback={() => this.toggleSearch()} {...routeProps}/>}/>
                        <Route path={"/login"}
                               render={routeProps => <LoginScreen {...routeProps} callback={this.logIn}/>}/>
                        <Route path={"/about"}
                               component={AboutUsPage}/>
                        <Route path={"/profile"}
                               render={routeProps => <ProfilePage loggedInUser={this.state.loggedInUser} {...routeProps}/>}/>
                        <Route path={"/register"}
                               component={RegisterScreen}/>
                        <Route path={"/inbox"}
                               render={routeProps => <InboxPage loggedInUser={this.state.loggedInUser} {...routeProps}/>}/>
                        <Route path={"/404"}
                               component={ErrorPage}/>
                        <Route exact path={"/"}
                               component={LandingPage}/>
                        <Route path={"*"}
                               component={ErrorPage}/>
                    </Switch>
                </div>
            </BrowserRouter>
        );
    }
}

export default App;