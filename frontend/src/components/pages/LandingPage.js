import * as React from "react";
import {Link} from "react-router-dom";

class LandingPage extends React.Component {
    render() {
        return (
            <div className={'mt-5 pt-2'}>
                <div className="carousel slide w-100" data-ride="carousel">
                    <div className="carousel-inner">
                        <div className="carousel-item active">
                            <img className="d-block w-100 h-100" alt="First"
                                 src={require('../../assets/images/carousel/group-pic.jpg')}/>
                            <div className="carousel-caption d-none d-md-block">
                                <h5>Connect Our Community</h5>
                                <p>Match Your Language Skills With Real World Opportunities</p>
                                <button className="custom-btn btn btn-light mb-5 rounded" type="submit" value="submit"><Link
                                    to={"/register"}>JOIN NOW</Link></button>
                            </div>
                        </div>
                        <div className="carousel-item">
                            <img className="d-block w-100 h-100" alt="Second"
                                 src={require('../../assets/images/carousel/globe.jpg')}/>
                            <div className="carousel-caption d-none d-md-block">
                                <h5>Connect Our Community</h5>
                                <p>Match Your Language Skills With Real World Opportunities</p>
                                <button className="btn btn-light mb-5 rounded" type="submit" value="submit"><Link
                                    to={"/register"}>JOIN NOW</Link></button>
                            </div>
                        </div>
                        <div className="carousel-item">
                            <img className="d-block w-100 h-100" alt="Third"
                                 src={require('../../assets/images/carousel/outdoorMeetup.jpg')}/>
                            <div className="carousel-caption d-none d-md-block">
                                <h5>Connect Our Community</h5>
                                <p>Match Your Language Skills With Real World Opportunities</p>
                                <button className="btn btn-light mb-5 rounded" type="submit" value="submit"><Link
                                    to={"/register"}>JOIN NOW</Link></button>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="bg-info py-5">
                    <h1 className="pb-5 text-white text-center">LanGO Opportunities</h1>
                    <div className="container">
                        <div className="row">
                            <div className="col-sm-12 col-md-4 ">
                                <div className="card shadow p-1 border-0">
                                    <img src={require('../../assets/images/muertos.jpg')} className="card-img-top w-100" height={'300'}/>
                                </div>
                            </div>
                            <div className="col-sm-12 col-md-4">
                                <div className="card shadow p-1 border-0">
                                    <img src={require('../../assets/images/Korean.jpg')} className="card-img-top w-100" height={'300'}/>
                                </div>
                            </div>
                            <div className="col-sm-12 col-md-4">
                                <div className="card shadow p-1 border-0">
                                    <img src={require('../../assets/images/Orange and yellow Funny Pun Business Card.jpg')} className="card-img-top w-100" height={'300'}/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="py-5">
                    <h1 className="pb-5 text-center">Our Users</h1>
                    <div className="container">
                        <div className="row">
                            <div className="col-sm-12 col-md-4">
                                <div className="card shadow p-3 border-0">
                                    <img className="card-img-top rounded-circle z-depth-2 " alt="100x100"
                                         src={require('../../assets/images/users/user1.jpg')}/>
                                    <div className="card-body text-left">
                                        "Our agency assists refugees from around the world. LanGO is invaluable for finding
                                        volunteers with the language skills to assist our clients."
                                    </div>
                                </div>
                            </div>
                            <div className="col-sm-12 col-md-4">
                                <div className="card shadow p-3 border-0">
                                    <img className="card-img-top image-responsive rounded-circle z-depth-2"
                                         src={require('../../assets/images/users/user2.jpg')} alt={''}/>
                                    <div className="card-body text-left">
                                        "When I moved here from Japan, I wanted to practice English. I found someone
                                        studying Japanese on LanGO, and now we both help each other!"
                                    </div>
                                </div>
                            </div>
                            <div className="col-sm-12 col-md-4">
                                <div className="card shadow p-3 border-0">
                                    <img className="card-img-top rounded-circle z-depth-2"
                                         src={require('../../assets/images/users/user3.jpg')} alt={''}/>
                                    <div className="card-body text-left">
                                        "As a teacher, I love using LanGO to connect my students with real-world
                                        opportunities
                                        to use German out in the community."
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="py-5 bg-info">
                    <h1 className="pb-5 text-white text-center">Languages</h1>
                    <div className="container">
                        <div className="row">
                            <div className="col-xs-6 col-md-3 mb-5">
                                <div className="card shadow p-1 border-0">
                                    <img src={require('../../assets/images/flags/fr.svg')} className={'card-img-top w-100'} alt="french flag"/>
                                </div>
                            </div>
                            <div className="col-xs-6 col-md-3 mb-5">
                                <div className="card shadow p-1 border-0">
                                    <img src={require('../../assets/images/flags/jp.svg')} className={'card-img-top w-100'} alt="japanese flag"/>
                                </div>
                            </div>
                            <div className="col-xs-6 col-md-3 mb-5">
                                <div className="card shadow p-1 border-0">
                                    <img src={require('../../assets/images/flags/mx.svg')} className={'card-img-top w-100'} alt="mexican flag"/>
                                </div>
                            </div>
                            <div className="col-xs-6 col-md-3 mb-5">
                                <div className="card shadow p-1 border-0">
                                    <img src={require('../../assets/images/flags/eg.svg')} className={'card-img-top w-100'} alt="egyptian flag"/>
                                </div>
                            </div>

                            <div className="col-xs-6 col-md-3">
                                <div className="card shadow p-1 border-0">
                                    <img src={require('../../assets/images/flags/de.svg')} className={'card-img-top w-100'} alt="german flag"/>
                                </div>
                            </div>
                            <div className="col-xs-6 col-md-3">
                                <div className="card shadow p-1 border-0">
                                    <img src={require('../../assets/images/flags/us.svg')} className={'card-img-top w-100'} alt="american flag"/>
                                </div>
                            </div>
                            <div className="col-xs-6 col-md-3">
                                <div className="card shadow p-1 border-0">
                                    <img src={require('../../assets/images/flags/kr.svg')} className="card-img-top w-100" alt="south korean flag"/>
                                </div>
                            </div>
                            <div className="col-xs-6 col-md-3">
                                <div className="card shadow p-1 border-0">
                                    <img src={require('../../assets/images/flags/un.svg')} className="card-img-top w-100" alt="united nations flag"/>
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