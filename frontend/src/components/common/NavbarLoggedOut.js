import React from 'react';
import {Link, Redirect} from "react-router-dom";

class NavbarLoggedOut extends React.Component {

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
            <nav className="navbar fixed-top navbar-expand-lg navbar-dark bg-dark">
                {this.state.searched && <Redirect to={{
                    pathname: '/explore',
                    state: {
                        search: this.state.search
                    }
                }}/>}
                {/*Brand Link*/}
                <Link to={"/"}> <img className="logo mr-3" src={require('../../assets/images/lango.png')}/></Link>
                {/*Collapsible Menu Button for mobile view*/}
                <button className="navbar-toggler " type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon">
                    </span>
                </button>
                {/*Everything inside of this div is part of the collapsible menu*/}
                <div className="collapse navbar-collapse" id="navbarNav">
                    {/*Left-hand side of the Nav Bar -- actions related to account*/}
                    <ul className="navbar-nav">
                        {/*Search Bar*/}
                        {this.props.searchBox &&
                        <li className="nav-item">
                            <form onSubmit={this.handleSearch} className="form-inline my-2 my-lg-0">
                                <input
                                    onChange={this.handleInput}
                                    onKeyPress={this.handleSearch}
                                    value={this.state.search}
                                    className="form-control mr-sm-2"
                                    type="search"
                                    placeholder="Search"
                                    aria-label="Search"/>
                            </form>
                        </li>
                        }
                        <li className="nav-item">
                            <Link className="custom-nav-link nav-link" to="/explore">Explore</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="custom-nav-link nav-link" to="/about">About Us</Link>
                        </li>
                    </ul>
                    {/*Right-hand side of the Nav Bar -- actions related to registering/authenticating*/}
                    <ul className="navbar-nav ml-auto">
                        <li className="nav-item">
                            <Link className="custom-nav-link nav-link" to="/login">Log In</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="custom-nav-link nav-link" to="/register">Register</Link>
                        </li>
                    </ul>
                </div>
            </nav>
        );
    }
}

export default NavbarLoggedOut;
