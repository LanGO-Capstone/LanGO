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
                <Footer/>
            </HashRouter>
        );
    }
}

export default App;