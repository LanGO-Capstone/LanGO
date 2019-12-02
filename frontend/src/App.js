import React from 'react';
import LoginScreen from "./components/pages/LoginScreen";
import RegisterScreen from "./components/pages/RegisterScreen";
import DashboardPage from './components/pages/DashboardPage';
import ProfilePage from './components/profile/ProfilePage';
import NavbarLoggedOut from "./components/common/NavbarLoggedOut";
import NavbarLoggedIn from "./components/common/NavbarLoggedIn";
import {HashRouter, Route, Switch} from "react-router-dom";
import CreateOpportunity from "./components/opportunities/CreateOpportunity";
import OpportunityPage from "./components/opportunities/OpportunityPage";
import LandingPage from "./components/pages/LandingPage";
import AboutUsPage from "./components/pages/AboutUsPage";
import Footer from "./components/common/Footer";
import UserPage from "./components/pages/UserPage";
import ChatPage from "./components/pages/ChatPage";
import axios from 'axios';
import {displaySpinner} from "./components/common/Functions";

class App extends React.Component {

    state = {
        loggedInUser: null,
        isLoading: true
    };

    componentDidMount() {
        axios.get('api/loggedInUser').then(res => {
            this.setState({
                loggedInUser: res.data,
                isLoading: false
            });
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

    render() {
        if (this.state.isLoading) {
            return displaySpinner()
        }

        return (
            <HashRouter>
                {this.state.loggedInUser ? <NavbarLoggedIn logout={this.logout}/> : <NavbarLoggedOut/>}
                <div className="mt-5">
                    <Switch>
                        <Route path={"/opportunities/create"} render={routeProps => <CreateOpportunity loggedInUser={this.state.loggedInUser}  {...routeProps}/>}/>
                        <Route path={"/opportunities/:id"} render={routeProps => <OpportunityPage loggedInUser={this.state.loggedInUser} {...routeProps}/>}/>
                        <Route path={"/users/:id"} render={routeProps => <UserPage loggedInUser={this.state.loggedInUser} {...routeProps}/>}/>
                        <Route path={"/dashboard"} render={routeProps => <DashboardPage loggedInUser={this.state.loggedInUser} {...routeProps}/>}/>
                        <Route path={"/login"} render={routeProps => <LoginScreen {...routeProps} callback={this.logIn}/>}/>
                        <Route path={"/about"} component={AboutUsPage}/>
                        <Route path={"/profile"} render={routeProps => <ProfilePage loggedInUser={this.state.loggedInUser} {...routeProps}/>}/>
                        <Route path={"/register"} component={RegisterScreen}/>
                        <Route path={"/chat"} component={ChatPage}/>
                        <Route path={"/"} component={LandingPage}/>
                    </Switch>
                <Footer/>
                </div>
            </HashRouter>
        );
    }
}

export default App;