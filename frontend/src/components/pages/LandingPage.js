import * as React from "react";
import {Link} from "react-router-dom";


class LandingPage extends React.Component {
    render() {
        return (
            <div className={'my-5 pt-5'}>
                <div id="carouselExampleIndicators" className="carousel slide" data-ride="carousel">

                    <div className="carousel-inner">
                        <div className="carousel-item active">
                            <img className="d-block w-100 h-100" alt="First"
                                 src={require('../../assets/images/carousel/group-pic.jpg')}/>
                            <div className="carousel-caption d-none d-md-block h-75">
                                <h5>Connect Our Community</h5>
                                <p>Match Your Language Skills With Real World Opportunities</p>
                                <button className="custom-btn btn btn-light mb-5 rounded" type="submit" value="submit"><Link
                                    to={"/register"}>JOIN NOW</Link></button>
                            </div>
                        </div>

                        <div className="carousel-item">
                            <img className="d-block w-100 h-100" alt="Second"
                                 src={require('../../assets/images/carousel/globe.jpg')}/>
                            <div className="carousel-caption d-none d-md-block h-75">
                                <h5>Connect Our Community</h5>
                                <p>Match Your Language Skills With Real World Opportunities</p>
                                <button className="btn btn-light mb-5 rounded" type="submit" value="submit"><Link
                                    to={"/register"}>JOIN NOW</Link></button>
                            </div>
                        </div>

                        <div className="carousel-item">
                            <img className="d-block w-100 h-100" alt="Third"
                                 src={require('../../assets/images/carousel/outdoorMeetup.jpg')}/>
                            <div className="carousel-caption d-none d-md-block h-75">
                                <h5>Connect Our Community</h5>
                                <p>Match Your Language Skills With Real World Opportunities</p>
                                <button className="btn btn-light mb-5 rounded" type="submit" value="submit"><Link
                                    to={"/register"}>JOIN NOW</Link></button>
                            </div>
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


                {/*<div className="ml-5">*/}
                <div className="container">
                    <h1 className="mb-5 mt-5 text-center">LanGO Opportunities</h1>
                    <div className="row ">
                        <div className="col-sm-12 col-md-4">
                            <div className="card mb-2 border-0" >
                                <img src={require('../../assets/images/Teal Mexican Cinco De Mayo Instagram Post.png')} className="shadow p-3 border-0" height="300"/>
                            </div>
                        </div>


                        <div className="col-sm-12 col-md-4">
                            <div className="card mb-2 border-0" >
                                <img src={require('../../assets/images/Korean.jpg')} className="shadow p-3 border-0"  height="300"/>
                            </div>
                        </div>

                        <div className="col-sm-12 col-md-4">
                            <div className="card mb-2 border-0" >
                                <img src={require('../../assets/images/Orange and yellow Funny Pun Business Card.jpg')} className="shadow p-3 border-0" height="300"/>
                            </div>
                        </div>

                    </div>
                </div>


                <h1 className="mb-5 mt-5 text-center">Our Users</h1>
                <div className="row">
                    <div id="usersContainer">
                        <div className="row">

                            <div className="col-sm-12 col-md-4">
                            <div className="card mb-2 border-0">
                                <img className="card-img-top rounded-circle z-depth-2 " alt="100x100"
                                     src={require('../../assets/images/users/user1.jpg')}/>
                                <p className="mt-5 text-left">
                                    "Our agency assists refugees from around the world. LanGO is invaluable for finding
                                    volunteers with the language skills to assist our clients."
                                </p>
                            </div>
                            </div>

                            <div className="col-sm-12 col-md-4">
                            <div className="card mb-2 border-0">
                                <img className="card-img-top image-responsive rounded-circle z-depth-2"
                                     src={require('../../assets/images/users/user2.jpg')} alt={''}/>
                                <p className="mt-5 text-left">
                                    "When I moved here from Japan, I wanted to practice English. I found someone
                                    studying Japanese on LanGO, and now we both help each other!"
                                </p>
                            </div>
                            </div>

                            <div className="col-sm-12 col-md-4">
                            <div className="card mb-2 border-0" >
                                <img className="card-img-top rounded-circle z-depth-2"
                                     src={require('../../assets/images/users/user3.jpg')} alt={''}/>
                                <p className="mt-5 text-left">
                                    "As a teacher, I love using LanGO to connect my students with real-world
                                    opportunities
                                    to use German out in the community."
                                </p>
                            </div>
                            </div>
                        </div>
                    </div>
                </div>


                <h1 className="mb-5 text-center">Languages</h1>
                <div className="row">
                    <div id="languagesContainer1">
                        <div className="row">
                            <div className="col-xs-6 col-md-3">
                            <div className="card mb-5 mx-5 border-0">
                                <img src={require('../../assets/images/flags/fr.svg')} className="shadow p-3" alt="french flag" width="100"/>
                            </div>
                            </div>

                            <div className="col-xs-6 col-md-3">
                            <div className="card mb-5 mx-5 border-0" >
                                <img src={require('../../assets/images/flags/jp.svg')} className="shadow p-3" alt="japanese flag"
                                     width="100"/>
                            </div>
                            </div>



                            <div className="col-xs-6 col-md-3">
                            <div className="card mb-5 mx-5 border-0">
                                <img src={require('../../assets/images/flags/mx.svg')} className="shadow p-3" alt="mexican flag" width="100"/>
                            </div>
                            </div>

                            <div className="col-xs-6 col-md-3">
                            <div className="card mb-5 mx-5 border-0">
                                <img src={require('../../assets/images/flags/eg.svg')} className="shadow p-3" alt="egyptian flag"
                                     width="100"/>
                            </div>
                            </div>
                        </div>
                    </div>
                </div>


                <div className="row">
                    <div id="languagesContainer2">
                        <div className="row">
                            <div className="col-xs-6 col-md-3">
                            <div className="card mb-5 mx-5 border-0">
                                <img src={require('../../assets/images/flags/de.svg')} className="shadow p-3" alt="german flag" width="100"/>
                            </div>
                            </div>

                            <div className="col-xs-6 col-md-3">
                            <div className="card mb-5 mx-5 border-0">
                                <img src={require('../../assets/images/flags/us.svg')} className="shadow p-3" alt="american flag"
                                     width="100"/>
                            </div>
                            </div>

                            <div className="col-xs-6 col-md-3">
                            <div className="card mb-5 mx-5 border-0">
                                <img src={require('../../assets/images/flags/kr.svg')}
                                     className="shadow p-3" alt="south korean flag"
                                     width="100"/>
                            </div>
                            </div>

                            <div className="col-xs-6 col-md-3">
                            <div className="card mb-2 mx-5 border-0">
                                <img src={require('../../assets/images/flags/un.svg')}
                                     className="shadow p-3 card mb-2 border-0" alt="united nations flag"
                                     width="100"/>
                            </div>
                            </div>

                        </div>
                    </div>
                </div>

            </div>


        );
    }


}

export default LandingPage;
