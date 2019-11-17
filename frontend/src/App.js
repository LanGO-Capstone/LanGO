import React from 'react';
import './App.css';
import Dashboard from './components/dashboard/Dashboard';

class App extends React.Component {

    render() {
        return (
            <React.Fragment>
                <Dashboard/>
            </React.Fragment>
        );
    }
}

export default App;
