
import * as React from "react";
import {Link} from "react-router-dom";

class LandingPage extends React.Component{
    render(){
        return (
            <container>

                <div id="carouselExampleIndicators" className="carousel slide" data-ride="carousel">
                    <ol className="carousel-indicators">
                        <li data-target="#carouselExampleIndicators" data-slide-to="0" className="active"></li>
                        <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
                        <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
                    </ol>
                    <div className="carousel-inner">
                        <div className="carousel-item">
                            <img className="d-block w-100 " src="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1189&q=80" alt="Third slide"/>
                        </div>
                        <div className="carousel-item active">
                            <img className="d-block w-100 " src="https://images.unsplash.com/photo-1499602211854-122b55ef8f5d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=746&q=80" alt="First slide"/>
                        </div>
                        <div className="carousel-item">
                            <img className="d-block w-100 " src="https://images.unsplash.com/photo-1485182708500-e8f1f318ba72?ixlib=rb-1.2.1&auto=format&fit=crop&w=785&q=80" alt="Second slide"/>
                        </div>
                    </div>
                    <a className="carousel-control-prev" href="#carouselExampleIndicators" role="button"
                       data-slide="prev">
                        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span className="sr-only">Previous</span>
                    </a>
                    <a className="carousel-control-next" href="#carouselExampleIndicators" role="button"
                       data-slide="next">
                        <span className="carousel-control-next-icon" aria-hidden="true"></span>
                        <span className="sr-only">Next</span>
                    </a>
                </div>


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
