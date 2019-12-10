import * as React from "react";

class LandingPage extends React.Component {
    render() {
        return (
            <div>
                <div className="carousel slide w-100" data-interval={'10000'} data-ride="carousel">
                    <div className="carousel-inner">
                        <div className="carousel-item active image-gradient">
                            <img className="d-block w-100 h-100" alt="first"
                                 src={require('../../assets/images/carousel/globe.jpg')}/>
                            <div className="carousel-caption d-none d-md-block">
                                <h5>Use Your Language Skills</h5>
                                <p>Find Real World Opportunities with LanGO</p>
                            </div>
                        </div>
                        <div className="carousel-item image-gradient">
                            <img className="d-block w-100 h-100" alt="Second"
                                 src={require('../../assets/images/carousel/outdoorMeetup.jpg')}/>
                            <div className="carousel-caption d-none d-md-block">
                                <h5>Sign Up For Opportunities</h5>
                                <p>Let Other Users Know You’re Interested</p>
                            </div>
                        </div>
                        <div className="carousel-item image-gradient">
                            <img className="d-block w-100 h-100" alt="third"
                                 src={require('../../assets/images/carousel/shibuya.jpg')}/>
                            <div className="carousel-caption d-none d-md-block">
                                <h5>Create Your Own Opportunities</h5>
                                <p>Find People with the Skills to Meet Your Needs</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="bg-info py-5">
                    <h1 className="pb-5 text-white text-center">LanGO Opportunities</h1>
                    <div className="container">
                        <div className="row">
                            <div className="col-sm-12 col-md-4 ">
                                <div className="card shadow p-1 border-0 mb-5">
                                    <img src={require('../../assets/images/muertos.jpg')} className="card-img-top w-100" height={'300'}/>
                                </div>
                            </div>
                            <div className="col-sm-12 col-md-4">
                                <div className="card shadow p-1 border-0 mb-5">
                                    <img src={require('../../assets/images/Korean.jpg')} className="card-img-top w-100" height={'300'}/>
                                </div>
                            </div>
                            <div className="col-sm-12 col-md-4">
                                <div className="card shadow p-1 border-0 mb-5">
                                    <img src={require('../../assets/images/Orange and yellow Funny Pun Business Card.jpg')} className="card-img-top w-100" height={'300'}/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="py-5">
                    <h1 className="pb-5 text-center">Our Users</h1>
                    <div className="container">
                        <div className="card-deck">
                            {/*<div className="col-sm-12 col-md-4">*/}
                            <div className="card shadow p-3 mb-5">
                                <img className="card-img-top rounded-circle z-depth-2 " alt="100x100"
                                     src={require('../../assets/images/users/user1.jpg')}/>
                                <div className="card-body text-left">
                                    "Our agency assists refugees from around the world. LanGO is invaluable for finding
                                    volunteers with the language skills to assist our clients."
                                    <p className={'text-right'}>- Madeleine Guerrero</p>
                                </div>
                                {/*</div>*/}
                            </div>
                            {/*<div className="col-sm-12 col-md-4">*/}
                            <div className="card shadow p-3 mb-5">
                                <img className="card-img-top image-responsive rounded-circle z-depth-2"
                                     src={require('../../assets/images/users/user2.jpg')} alt={''}/>
                                <div className="card-body text-left">
                                    "When I moved here from Japan, I wanted to practice English. I found someone
                                    studying Japanese on LanGO, and now we both help each other!"
                                    <p className={'text-right'}>- Kenji Yasutani</p>
                                </div>
                                {/*</div>*/}
                            </div>
                            {/*<div className="col-sm-12 col-md-4">*/}
                            <div className="card shadow p-3 mb-5">
                                <img className="card-img-top rounded-circle z-depth-2"
                                     src={require('../../assets/images/users/user3.jpg')} alt={''}/>
                                <div className="card-body text-left">
                                    "As a teacher, I love using LanGO to connect my students with real-world
                                    opportunities
                                    to use German out in the community."
                                    <p className={'text-right'}>- Micaela Nixon</p>
                                </div>
                                {/*</div>*/}
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

                            <div className="col-xs-6 col-md-3 mb-5">
                                <div className="card shadow p-1 border-0">
                                    <img src={require('../../assets/images/flags/de.svg')} className={'card-img-top w-100'} alt="german flag"/>
                                </div>
                            </div>
                            <div className="col-xs-6 col-md-3 mb-5">
                                <div className="card shadow p-1 border-0">
                                    <img src={require('../../assets/images/flags/us.svg')} className={'card-img-top w-100'} alt="american flag"/>
                                </div>
                            </div>
                            <div className="col-xs-6 col-md-3 mb-5">
                                <div className="card shadow p-1 border-0">
                                    <img src={require('../../assets/images/flags/kr.svg')} className="card-img-top w-100" alt="south korean flag"/>
                                </div>
                            </div>
                            <div className="col-xs-6 col-md-3 mb-5">
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