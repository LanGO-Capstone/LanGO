import React from 'react';
import {Link} from "react-router-dom";

class NavbarLoggedOut extends React.Component {

    render() {
        return (
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                {/*Brand Link*/}
                <Link className="navbar-brand" to="/">LanGO</Link>
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
                        <li className="nav-item">
                            <form className="form-inline my-2 my-lg-0">
                                <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search"/>
                            </form>
                        </li>
                    </ul>
                    {/*Right-hand side of the Nav Bar -- actions related to registering/authenticating*/}
                    <ul className="navbar-nav ml-auto">
                        <li className="nav-item">
                            <Link className="nav-link" to="/login">Log In</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/register">Register</Link>
                        </li>
                    </ul>
                </div>
            </nav>
        );
    }
}

export default NavbarLoggedOut;
