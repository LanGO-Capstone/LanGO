import React from 'react';
import './App.css';
import Dashboard from './components/dashboard/Dashboard';
import axios from 'axios';
import NavbarLoggedOut from "./components/common/NavbarLoggedOut";
import NavbarLoggedIn from "./components/common/NavbarLoggedIn";

class App extends React.Component {
    componentDidMount() {
        axios.get('api/users')
            .then(res => console.log(res.data));
    }

    render() {
        return (
          <React.Fragment>
                <NavbarLoggedOut />
                <NavbarLoggedIn />
                <Dashboard/>
          </React.Fragment>
        );
    }
}

export default App;
