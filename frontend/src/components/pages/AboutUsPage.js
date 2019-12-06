import * as React from "react";

class AboutUsPage extends React.Component {

    render() {
        return (
            <div className={"container mt-5 pt-5"}>
                <h1 className="my-5 text-center">About Us</h1>
                <div className="row">
                    <div className="col-xs-12 col-md-6 col-lg-3">
                        <div className="card border-0">
                            <img className="card-img-top rounded-circle" alt="Kevin" src={require('../../assets/images/KevinA.jpg')}/>
                            <div className="card-body">
                                <h2 className="text-center">Kevin<br />Arnall</h2>
                            </div>
                        </div>
                    </div>
                    <div className="col-xs-12 col-md-6 col-lg-3">
                        <div className="card border-0">
                            <img className="card-img-top rounded-circle" src={require('../../assets/images/john.jpg')} alt={'John'}/>
                            <div className="card-body">
                                <h2 className="text-center">John<br />Cadena</h2>
                            </div>
                        </div>
                    </div>
                    <div className="col-xs-12 col-md-6 col-lg-3">
                        <div className="card border-0">
                            <img className="card-img-top rounded-circle" src={require('../../assets/images/BeverlyJ.jpg')} alt={'Bev'}/>
                            <div className="card-body">
                                <h2 className="text-center">Beverly<br />Jaimes-Puente</h2>
                            </div>
                        </div>
                    </div>
                    <div className="col-xs-12 col-md-6 col-lg-3">
                        <div className="card border-0">
                            <img className="card-img-top rounded-circle" src={require('../../assets/images/Annette.jpg')} alt={'Annette'}/>
                            <div className="card-body">
                                <h2 className="text-center">Annette<br />Iglesias</h2>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="col-xs-12 col-md-6 col-lg-3">
                        <div className="card border-0">
                            <ul>
                                <li className="my-2"><a className="lead" href="https://alumni.codeup.com/students/697">Alumni Portal</a></li>
                                <li className="my-2"><a className="lead" href="https://github.com/kevinarnall">GitHub</a></li>
                                <li className="my-2"><a className="lead" href="https://www.linkedin.com/in/kevinarnall/">LinkedIn</a></li>
                            </ul>
                        </div>
                    </div>
                    <div className="col-xs-12 col-md-6 col-lg-3">
                        <div className="card border-0">
                            <ul>
                                <li className="my-2"><a className="lead" href="https://alumni.codeup.com/students/707">Alumni Portal</a></li>
                                <li className="my-2"><a className="lead" href="https://github.com/cadenajohn85">GitHub</a></li>
                                <li className="my-2"><a className="lead" href="https://www.linkedin.com/in/cadenajohn85/">LinkedIn</a></li>
                            </ul>
                        </div>
                    </div>
                    <div className="col-xs-12 col-md-6 col-lg-3">
                        <div className="card border-0">
                            <ul>
                                <li className="my-2"><a className="lead" href="https://alumni.codeup.com/students/704">Alumni Portal</a></li>
                                <li className="my-2"><a className="lead" href="https://github.com/beverlyjaimes">GitHub</a></li>
                                <li className="my-2"><a className="lead" href="https://www.linkedin.com/in/beverly-jaimes-puente/">LinkedIn</a></li>
                            </ul>
                        </div>
                    </div>
                    <div className="col-xs-12 col-md-6 col-lg-3">
                        <div className="card border-0">
                            <ul>
                                <li className="my-2"><a className="lead" href="https://alumni.codeup.com/students/717">Alumni Portal</a></li>
                                <li className="my-2"><a className="lead" href="https://github.com/iglesiasannette">GitHub</a></li>
                                <li className="my-2"><a className="lead" href="https://www.linkedin.com/in/iglesias-annette/">LinkedIn</a></li>
                            </ul>
                        </div>
                    </div>
                </div>

            </div>
        );
    }
}

export default AboutUsPage;