import React from 'react';
import './App.css';
import axios from 'axios';

class App extends React.Component {

    componentDidMount() {
        axios.get('api/users/5')
            .then(res => console.log(res.data));
    }

    render() {
        return (
            <h1>Hello World</h1>
        );
    }
}

export default App;
