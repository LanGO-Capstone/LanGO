import * as React from "react";

class AboutUsPage extends React.Component {

    render() {
        return (
            <div className={"custom-container mt-5 pt-5"}>
                <h1 className="text-center">About Us</h1>
                <div className="row">
                    <div className="col-xs-12 col-md-6 col-lg-3">
                        <div className="card p-3 shadow mb-3">
                            <div>
                                <h2 className="text-center">Kevin<br/>Arnall</h2>
                            </div>
                            <img className="card-img-top rounded-circle" alt="Kevin" src={require('../../assets/images/KevinA.jpg')}/>
                        </div>
                        <div className="card p-3 shadow mb-5">
                            <ul>
                                <li className="my-2">
                                    <img alt="codeup icon" style={{width: 20}} className="mr-3"
                                         src={require('../../assets/images/CodeupFullColorChevron.png')}/>
                                    <a className="lead" href="https://alumni.codeup.com/students/697">Codeup</a></li>
                                <li className="my-2"><i className="fab fa-github mr-3 lead"/><a className="lead" href="https://github.com/kevinarnall">GitHub</a></li>
                                <li className="my-2"><i className="fab fa-linkedin-in mr-3 lead"/><a className="lead" href="https://www.linkedin.com/in/kevinarnall/">LinkedIn</a></li>
                            </ul>
                        </div>
                    </div>
                    <div className="col-xs-12 col-md-6 col-lg-3">
                        <div className="card p-3 shadow mb-3">
                            <div>
                                <h2 className="text-center">John<br/>Cadena</h2>
                            </div>
                            <img className="card-img-top rounded-circle" src={require('../../assets/images/john.jpg')} alt={'John'}/>
                        </div>
                        <div className="card p-3 shadow mb-5">
                            <ul>
                                <li className="my-2">
                                    <img alt="codeup icon" style={{width: 20}} className="mr-3"
                                         src={require('../../assets/images/CodeupFullColorChevron.png')}/>
                                    <a className="lead" href="https://alumni.codeup.com/students/707">Codeup</a></li>
                                <li className="my-2"><i className="fab fa-github mr-3 lead"/><a className="lead" href="https://github.com/cadenajohn85">GitHub</a></li>
                                <li className="my-2"><i className="fab fa-linkedin-in mr-3 lead"/><a className="lead" href="https://www.linkedin.com/in/cadenajohn85/">LinkedIn</a></li>
                            </ul>
                        </div>
                    </div>
                    <div className="col-xs-12 col-md-6 col-lg-3">
                        <div className="card p-3 shadow mb-3">
                            <div className="px-0">
                                <h2 className="text-center">Beverly<br/>Jaimes-Puente</h2>
                            </div>
                            <img className="card-img-top rounded-circle" src={require('../../assets/images/BeverlyJ.jpg')} alt={'Bev'}/>
                        </div>
                        <div className="card p-3 shadow mb-5">
                            <ul>
                                <li className="my-2">
                                    <img alt="codeup icon" style={{width: 20}} className="mr-3"
                                         src={require('../../assets/images/CodeupFullColorChevron.png')}/>
                                    <a className="lead" href="https://alumni.codeup.com/students/704">Codeup</a></li>
                                <li className="my-2"><i className="fab fa-github mr-3 lead"/><a className="lead" href="https://github.com/beverlyjaimes">GitHub</a></li>
                                <li className="my-2"><i className="fab fa-linkedin-in mr-3 lead"/><a className="lead" href="https://www.linkedin.com/in/beverly-jaimes-puente/">LinkedIn</a></li>
                            </ul>
                        </div>
                    </div>
                    <div className="col-xs-12 col-md-6 col-lg-3">
                        <div className="card p-3 shadow mb-3">
                            <div>
                                <h2 className="text-center">Annette<br/>Iglesias</h2>
                            </div>
                            <img className="card-img-top rounded-circle" src={require('../../assets/images/Annette.jpg')} alt={'Annette'}/>
                        </div>
                        <div className="card p-3 shadow mb-5">
                            <ul>
                                <li className="my-2">
                                    <img alt="codeup icon" style={{width: 20}} className="mr-3"
                                         src={require('../../assets/images/CodeupFullColorChevron.png')}/>
                                    <a className="lead" href="https://alumni.codeup.com/students/717">Codeup</a></li>
                                <li className="my-2"><i className="fab fa-github mr-3 lead"/><a className="lead" href="https://github.com/iglesiasannette">GitHub</a></li>
                                <li className="my-2"><i className="fab fa-linkedin-in mr-3 lead"/><a className="lead" href="https://www.linkedin.com/in/iglesias-annette/">LinkedIn</a></li>
                            </ul>
                        </div>
                    </div>
                </div>

            </div>
        );
    }
}

export default AboutUsPage;