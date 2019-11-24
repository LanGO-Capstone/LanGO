
import * as React from "react";
import {Link} from "react-router-dom";



class Footer extends React.Component {
    render() {
        return (

<footer>
    <div className="container-expand-lg bg-light sticky-bottom mt-5">
        <div className="row ">


            <div className="col-md-12 text-black my-4 text-center ">
                <span className=" font-weight-bold ">LanGO</span>
                <p className="text-info my-2">Match Your Language Skills With Real World Opportunities</p>
            </div>
        </div>




        <div className="row">
            <div className="col-md-12 text-center mb-5">

            <div className="py-0">

                <p className="font-weight-bold">
                    <a className="text-info ml-5 mr-5" href="/">Home</a>
                    |
                    <a className="text-info ml-5 mr-5" href="#">About</a>
                    |
                    <a className="text-info ml-5 mr-5" href="#">Contact</a>
                    |
                    <Link className="text-info ml-5 mr-5" to="/login">Log In</Link>
                    |
                    <Link className="text-info ml-5 mr-5" to="/register">Register</Link>
                </p>
            </div>
        </div>
        </div>
    </div>
</footer>

        );
    }


}

export default Footer;