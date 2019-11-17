import React from 'react';
import axios from 'axios';

class NavbarLoggedIn extends React.Component {

    // componentDidMount() {
    //     axios.get('api/users')
    //         .then(res => console.log(res.data));
    // }

    render() {
        return (
            <nav class="navbar fixed-top navbar-expand-lg navbar-light bg-light">
                {/*Brand Link*/}
                <a class="navbar-brand" href="#">LanGO</a>

                {/*Collapsible Menu Button for mobile view*/}
                <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>

                {/*Everything inside of this div is part of the collapsible menu*/}
                <div class="collapse navbar-collapse" id="navbarNav">

                    {/*Left-hand side of the Nav Bar -- actions related to account*/}
                    <ul class="navbar-nav">

                        {/*Search Bar*/}
                        <li class="nav-item">
                            <form class="form-inline my-2 my-lg-0">
                                <input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search"/>
                            </form>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="#">Dashboard</a>
                        </li>
                        {/*Pulldown menu for My Profile*/}
                        <li class="nav-item dropdown">
                            <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                My Profile
                            </a>
                            <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                                <a class="dropdown-item" href="#">About Me</a>
                                <a class="dropdown-item" href="#">My Opportunities</a>
                                <a class="dropdown-item" href="#">I'm Interested</a>
                            </div>
                        </li>
                    </ul>

                    {/*Right-hand side of the Nav Bar -- actions related to registering/authenticating*/}
                    <ul class="navbar-nav ml-auto">
                        <li class="nav-item">
                            <a class="nav-link" href="#">Log Out</a>
                        </li>
                    </ul>
                </div>
            </nav>
        );
    }
}

export default NavbarLoggedIn;
