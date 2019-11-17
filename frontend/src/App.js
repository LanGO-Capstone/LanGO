import React from 'react';
import './App.css';
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
            <div>
                <h1>Hello World</h1>
                <NavbarLoggedOut />
                <NavbarLoggedIn />
            </div>
        );
    }
}

export default App;
