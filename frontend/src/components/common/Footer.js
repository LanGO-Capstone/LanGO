import * as React from "react";
import {Link} from "react-router-dom";

class Footer extends React.Component {
    render() {
        return (
            <footer>
                <div className="container-expand-lg bg-light sticky-bottom">
                    <div className="row">
                        <div className="col text-black my-4 text-center ">
                            <span className=" font-weight-bold ">LanGO</span>
                            <p className="text-info my-2">Match Your Language Skills With Real World Opportunities</p>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col text-center mb-5">
                            <p className="font-weight-bold">
                                <Link className="text-info mx-5" to="/">Home</Link>
                                |
                                <Link className="text-info mx-5" to="/about">About</Link>
                                |
                                <Link className="text-info mx-5" to="/login">Log In</Link>
                                |
                                <Link className="text-info mx-5" to="/register">Register</Link>
                            </p>
                        </div>
                    </div>
                </div>
            </footer>
        );
    }
}

export default Footer;