import React from 'react';
import './App.css';
import LoginScreen from "./components/LoginScreen";
import RegisterScreen from "./components/RegisterScreen";
import DashboardPage from './components/dashboard/DashboardPage';
import ProfilePage from './components/profile/ProfilePage';
import NavbarLoggedOut from "./components/common/NavbarLoggedOut";
import NavbarLoggedIn from "./components/common/NavbarLoggedIn";
import {HashRouter, Route, Switch} from "react-router-dom";

class App extends React.Component {

    render() {
        return (
            <HashRouter>
                <NavbarLoggedIn/>
                <NavbarLoggedOut/>
                <Switch>
                    <Route path={"/dashboard"} component={DashboardPage}/>
                    <Route path={"/login"} component={LoginScreen}/>
                    <Route path={"/profile"} component={ProfilePage}/>
                    <Route path={"/register"} component={RegisterScreen}/>
                </Switch>
            </HashRouter>
        );
    }
}

export default App;
