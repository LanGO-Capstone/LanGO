
import * as React from "react";
import {Link} from "react-router-dom";

class LandingPage extends React.Component{
    render(){
        return (
            <container>
                <div className="row">
                    <button className="ml-2 btn btn-sm btn-danger rounded text-white" type="submit" value="submit"><Link to={"/register"}>Join</Link></button>
                </div>

                <h1 className="ml-4">LanGo Opportunities</h1>
                <div className="row">
                <div className="card mb-2 ml-5" style={{ width: '18rem' }}>
                    <img src="http://placeholder.pics/svg/300"/>
                </div>

                <div className="card mb-2 ml-5" style={{ width: '18rem' }}>
                    <img src="http://placeholder.pics/svg/300"/>
                </div>

                <div className="card mb-2 ml-5" style={{ width: '18rem' }}>
                    <img src="http://placeholder.pics/svg/300"/>
                </div>
                </div>

                <h1 className="ml-4">Our Users</h1>
                <div className="row">
                    <div className="card mb-2  ml-5 border-0" style={{ width: '18rem' }}>
                        <img className="rounded-circle z-depth-2" alt="100x100"src="http://placeholder.pics/svg/300"/>
                    </div>

                    <div className="card mb-2 ml-5 border-0" style={{ width: '18rem' }}>
                        <img className="rounded-circle z-depth-2" src="http://placeholder.pics/svg/300"/>
                    </div>

                    <div className="card mb-2 ml-5 border-0" style={{ width: '18rem' }}>
                        <img className="rounded-circle z-depth-2" src="http://placeholder.pics/svg/300"/>
                    </div>
                </div>




            </container>

        );
    }


}

export default LandingPage;
