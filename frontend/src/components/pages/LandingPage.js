import * as React from "react";
import {Link} from "react-router-dom";


class LandingPage extends React.Component {
    render() {
        return (
            <div className={'my-5 pt-5'}>
                <div id="carouselExampleIndicators" className="carousel slide" data-ride="carousel">

                    <div className="carousel-inner">
                        <div className="carousel-item active">
                            <img className="d-block w-100 h-100" alt="First" src={require('../../assets/images/carousel/group-pic.jpg')}/>
                            <div className="carousel-caption d-none d-md-block">
                                <h5>Connect Our Community</h5>
                                <p>Match Your Language Skills With Real World Opportunities</p>
                                <button className="btn btn-light mb-5 rounded" type="submit" value="submit"><Link to={"/register"}>JOIN NOW</Link></button>
                            </div>
                        </div>

                        <div className="carousel-item">
                            <img className="d-block w-100 h-100" alt="Second" src={require('../../assets/images/carousel/globe.jpg')}/>
                            <div className="carousel-caption d-none d-md-block">
                                <h5>Connect Our Community</h5>
                                <p>Match Your Language Skills With Real World Opportunities</p>
                                <button className="btn btn-light mb-5 rounded" type="submit" value="submit"><Link to={"/register"}>JOIN NOW</Link></button>
                            </div>
                        </div>

                        <div className="carousel-item">
                            <img className="d-block w-100 h-100"  alt="Third" src={require('../../assets/images/carousel/outdoorMeetup.jpg')}/>
                            <div className="carousel-caption d-none d-md-block">
                                <h5>Connect Our Community</h5>
                                <p>Match Your Language Skills With Real World Opportunities</p>
                                <button className="btn btn-light mb-5 rounded" type="submit" value="submit"><Link to={"/register"}>JOIN NOW</Link></button>
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
                <h1 className="mb-5 mt-5 text-center">LanGO Opportunities</h1>
                <div className="row">
                    <div id="languageContainer">
                        <div className="row">
                            <div className="card mr-5  mb-2" style={{width: '12rem'}}>
                                <img src="http://placeholder.pics/svg/200" alt={''}/>
                            </div>

                            <div className="card mb-2 mr-5 ml-5" style={{width: '12rem'}}>
                                <img src="http://placeholder.pics/svg/200" alt={''}/>
                            </div>

                            <div className="card mb-2 ml-5" style={{width: '12rem'}}>
                                <img src="http://placeholder.pics/svg/200" alt={''}/>
                            </div>
                        </div>
                    </div>
                </div>


                <h1 className="mb-5 mt-5 text-center">Our Users</h1>
                <div className="row">
                    <div id="usersContainer">
                        <div className="row">
                            <div className="card mb-2 mr-5 border-0" style={{width: '15rem'}}>
                                <img className="rounded-circle z-depth-2" alt="100x100" src={require('../../assets/images/users/user1.jpg')}/>
                                <p className="mt-5 text-center">
                                    "Our agency assists refugees from around the world. LanGO is invaluable for finding
                                    volunteers with the language skills to assist our clients."
                                </p>
                            </div>

                            <div className="card mb-2 mr-5 border-0" style={{width: '15rem'}}>
                                <img className="rounded-circle z-depth-2" src={require('../../assets/images/users/user2.jpg')} alt={''}/>
                                <p className="mt-5 text-center">
                                    "When I moved here from Japan, I wanted to practice English. I found someone
                                    studying Japanese on LanGO, and now we both help each other!"
                                </p>
                            </div>

                            <div className="card mb-2 border-0" style={{width: '15rem'}}>
                                <img className="rounded-circle z-depth-2"  src={require('../../assets/images/users/user3.jpg')} alt={''}/>
                                <p className="mt-5 text-center">
                                    "As a teacher, I love using LanGO to connect my students with real-world opportunities
                                    to use German out in the community."
                                </p>
                            </div>
                        </div>
                    </div>
                </div>


                <h1 className="mb-5 text-center">Languages</h1>
                <div className="row">
                    <div id="languagesContainer1">
                        <div className="row">
                            <div className="card mb-5 mx-5 border-0" style={{width: '8rem'}}>
                                <img src={require('../../assets/images/flags/fr.svg')} alt="french flag" height="100"/>
                            </div>

                            <div className="card mb-24 mx-5 border-0" style={{width: '8rem'}}>
                                <img src={require('../../assets/images/flags/jp.svg')} alt="japanese flag" height="100"/>
                            </div>

                            <div className="card mb-5 mx-5 border-0" style={{width: '8rem'}}>
                                <img src={require('../../assets/images/flags/mx.svg')} alt="mexican flag" height="100"/>
                            </div>

                            <div className="card mb-5 mx-5 border-0" style={{width: '8rem'}}>
                                <img src={require('../../assets/images/flags/eg.svg')} alt="egyptian flag" height="100"/>
                            </div>
                        </div>
                    </div>
                </div>


                <div className="row">
                    <div id="languagesContainer2">
                        <div className="row">
                            <div className="card mb-2 mx-5 border-0" style={{width: '8rem'}}>
                                <img src={require('../../assets/images/flags/de.svg')} alt="german flag" height="100"/>
                            </div>

                            <div className="card mb-2 mx-5 border-0" style={{width: '8rem'}}>
                                <img src={require('../../assets/images/flags/us.svg')} alt="american flag" height="100"/>
                            </div>

                            <div className="card mb-2 mx-5 border-0" style={{width: '8rem'}}>
                                <img src={require('../../assets/images/flags/kr.svg')} alt="south korean flag" height="100"/>
                            </div>

                            <div className="card mb-2 mx-5 border-0" style={{width: '8rem'}}>
                                <img src={require('../../assets/images/flags/un.svg')} alt="united nations flag" height="100"/>
                            </div>
                        </div>
                    </div>
                </div>

            </div>


        );
    }


}

export default LandingPage;
