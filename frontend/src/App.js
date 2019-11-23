import React from 'react';
import './App.css';
import LoginScreen from "./components/LoginScreen";
import RegisterScreen from "./components/RegisterScreen";
import DashboardPage from './components/dashboard/DashboardPage';
import ProfilePage from './components/profile/ProfilePage';
import NavbarLoggedOut from "./components/common/NavbarLoggedOut";
import NavbarLoggedIn from "./components/common/NavbarLoggedIn";
import {HashRouter, Route, Switch} from "react-router-dom";
import CreateOpportunity from "./components/opportunities/CreateOpportunity";
import OpportunityPage from "./components/opportunities/OpportunityPage";
import LandingPage from "./components/LandingPage";
import AboutUsPage from "./components/AboutUs/AboutUsPage";


class App extends React.Component {

    render() {
        return (
            <HashRouter>
                <NavbarLoggedIn/>
                <NavbarLoggedOut/>
                <Switch>
                    <Route path={"/opportunities/create"} component={CreateOpportunity}/>
                    <Route path={"/opportunities/:id"} component={OpportunityPage}/>
                    <Route path={"/dashboard"} component={DashboardPage}/>
                    <Route path={"/login"} component={LoginScreen}/>
                    <Route path={"/about"} component={AboutUsPage}/>
                    <Route path={"/profile"} component={ProfilePage}/>
                    <Route path={"/register"} component={RegisterScreen}/>
                    <Route path={"/"} component={LandingPage}/>
                </Switch>
            </HashRouter>
        );
    }
}

export default App;