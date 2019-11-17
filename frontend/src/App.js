import React from 'react';
import './App.css';
import axios from 'axios';
import LoginScreen from "./components/LoginScreen";

class App extends React.Component {

    componentDidMount() {
        axios.get('api/users')
            .then(res => console.log(res.data));
    }

    render() {
        return (
            <div>
            <h1>Hello World</h1>
            <LoginScreen/>
            </div>
        );
    }
}

export default App;
