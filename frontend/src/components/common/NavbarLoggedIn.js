import React from 'react';
import {Link, Redirect} from "react-router-dom";

class NavbarLoggedIn extends React.Component {

    state = {
        searched: false,
        search: ''
    };

    handleSearch = event => {
        if (event.key === 'Enter') {
            event.preventDefault();
            this.setState({
                searched: true
            }, () => {
                this.setState({
                    searched: false,
                    search: ''
                })
            })
        }
    };

    handleInput = event => {
        this.setState({
            search: event.target.value
        });
    };

    render() {
        return (
            <nav className="navbar nav-color fixed-top navbar-expand-lg navbar-light bg-light">
                {this.state.searched ? <Redirect to={{
                    pathname: '/dashboard',
                    state: {
                        search: this.state.search
                    }
                }}/> : ''}
                {/*Brand Link*/}
                <img className="logo mr-2" src={require('../../assets/images/langopic.jpg')}/>
                {/*Collapsible Menu Button for mobile view*/}
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon">
                    </span>
                </button>
                {/*Everything inside of this div is part of the collapsible menu*/}
                <div className="collapse navbar-collapse" id="navbarNav">
                    {/*Left-hand side of the Nav Bar -- actions related to account*/}
                    <ul className="navbar-nav">
                        {/*Search Bar*/}
                        {this.props.searchBox ?
                            <li className="nav-item">
                                <form className="form-inline my-2 my-lg-0">
                                    <input
                                        onChange={this.handleInput}
                                        onKeyPress={this.handleSearch}
                                        defaultValue={this.state.search}
                                        className="form-control mr-sm-2"
                                        type="search"
                                        placeholder="Search"
                                        aria-label="Search"/>
                                </form>
                            </li>
                            : ''}
                        <li className="nav-item">
                            <Link className="nav-link" to="/dashboard">Dashboard</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/inbox">Inbox</Link>
                        </li>
                        {/*Pulldown menu for My Profile*/}
                        <li className="nav-item dropdown">
                            <Link className="nav-link dropdown-toggle" to="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                My Profile</Link>
                            <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                                <Link className="dropdown-item" to="/profile">About Me</Link>
                                <Link className="dropdown-item" to="/profile/myopportunities">My Opportunities</Link>
                                <Link className="dropdown-item" to="/profile/interestedin">Opportunities I'm Interested In</Link>
                                <Link className="dropdown-item" to="/opportunities/create">Create New Opportunity</Link>
                            </div>
                        </li>
                    </ul>
                    {/*Right-hand side of the Nav Bar -- actions related to registering/authenticating*/}
                    <ul className="navbar-nav ml-auto">
                        <li className="nav-item">
                            <Link onClick={this.props.logout} className="nav-link" to="/">Log Out</Link>
                        </li>
                    </ul>
                </div>
            </nav>
        );
    }
}

export default NavbarLoggedIn;
