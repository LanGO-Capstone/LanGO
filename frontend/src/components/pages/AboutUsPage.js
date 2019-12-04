import * as React from "react";

class AboutUsPage extends React.Component {

    render() {
        return (
            <div className={"container mt-5 pt-5"}>
                <h1 className=" my-5 text-center">About Us</h1>
                <div className="row">
                    <div className="col">
                        <div className="card border-0">
                            <img className="rounded-circle" alt="Kevin" src={require('../../assets/images/KevinA.jpg')}/>
                            <div className="card-body">
                                <p className="mt-5 text-center">Lorem ipsum dolor sit amet, mucius graecis in sit, per liber phaedrum cu. Offendit detraxit nomin</p>
                            </div>
                        </div>
                    </div>
                    <div className="col">
                        <div className="card border-0">
                            <img className="rounded-circle" src={require('../../assets/images/john.jpg')} alt={'John'}/>
                            <div className="card-body">
                                <p className="mt-5 text-center">Lorem ipsum dolor sit amet, mucius graecis in sit, per liber phaedrum cu. Offendit detraxit nomin</p>
                            </div>
                        </div>
                    </div>
                    <div className="col">
                        <div className="card border-0">
                            <img className="rounded-circle" src={require('../../assets/images/BeverlyJ.jpg')} alt={'Bev'}/>
                            <div className="card-body">
                                <p className="mt-5 text-center">Lorem ipsum dolor sit amet, mucius graecis in sit, per liber phaedrum cu. Offendit detraxit nomin</p>
                            </div>
                        </div>
                    </div>
                    <div className="col">
                        <div className="card border-0">
                            <img className="rounded-circle" src={require('../../assets/images/Annette.jpg')} alt={'Annette'}/>
                            <div className="card-body">
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