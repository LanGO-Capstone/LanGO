import * as React from "react";
import {Link} from "react-router-dom";





class AboutUsPage extends React.Component {
    render() {
        return (

       <div>
           <h1 className="mb-5 mt-5 text-center">About Us</h1>
                <div className="row">
                    <div id="aboutContainer" className="my-auto mx-auto mb-5">
                        <div className="row">
                            <div className="card mb-2 mr-5 border-0" style={{width: '15rem'}}>
                                <img className="rounded-circle z-depth-2" alt="100x100" src={require('../AboutUs/AboutUsImages/KevinA.jpg')}/>
                                    <p className="mt-5 text-center">Lorem ipsum dolor sit amet, mucius graecis in sit, per liber phaedrum cu.
                                        Offendit detraxit nomin</p>
                            </div>

                                <div className="card mb-2 mr-5 border-0" style={{width: '15rem'}}>
                                    <img className="rounded-circle z-depth-2" src={require('../AboutUs/AboutUsImages/john.jpg')} alt={''}/>
                                        <p className="mt-5 text-center">Lorem ipsum dolor sit amet, mucius graecis in sit, per liber phaedrum cu. Offendit detraxit nomin</p>
                                </div>

                                <div className="card mb-2 border-0" style={{width: '15rem'}}>
                                    <img className="rounded-circle z-depth-2" src={require('../AboutUs/AboutUsImages/BeverlyJ.jpg')} alt={''}/>
                                    <p className="mt-5 text-center">Lorem ipsum dolor sit amet, mucius graecis in sit, per liber phaedrum cu. Offendit detraxit nomin</p>
                                </div>

                                <div className="card mb-2 ml-5 border-0" style={{width: '15rem'}}>
                                    <img className="rounded-circle z-depth-2" src={require('../AboutUs/AboutUsImages/Annette.jpg')}alt={''}/>
                                    <p className="mt-5 text-center">Lorem ipsum dolor sit amet, mucius graecis in sit, per liber phaedrum cu. Offendit detraxit nomin</p>
                                </div>
                        </div>
                    </div>
                </div>
       </div>

        );
    }


}

export default AboutUsPage;