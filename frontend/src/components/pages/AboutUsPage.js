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
                                <h2 className="text-center">
                                    <a href="https://alumni.codeup.com/students/697" target="_blank">
                                    Kevin<br />Arnall
                                    </a>
                                </h2>
                                <p>A detail-oriented problem solver and challenge seeker. Always looking for new technologies to
                                    learn and problems to overcome. I bring patience, humility and a hunger to go above and
                                    beyond to any project I work on.</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-xs-12 col-md-6 col-lg-3">
                        <div className="card border-0">
                            <img className="card-img-top rounded-circle" src={require('../../assets/images/john.jpg')} alt={'John'}/>
                            <div className="card-body">
                                <h2 className="text-center">
                                    <a href="https://alumni.codeup.com/students/707" target="_blank">
                                    John<br />Cadena
                                    </a>
                                </h2>
                                <p>Highly creative maker with a love for designing and building things for others to use. Excellent
                                    interpersonal skills and a strong background in working collaboratively to solve complicated
                                    problems and tackle extensive projects. Seeking to become a developer at a firm that values
                                    diversity, growing its team members, and giving back to the community.</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-xs-12 col-md-6 col-lg-3">
                        <div className="card border-0">
                            <img className="card-img-top rounded-circle" src={require('../../assets/images/BeverlyJ.jpg')} alt={'Bev'}/>
                            <div className="card-body">
                                <h2 className="text-center">
                                    <a href="https://alumni.codeup.com/students/704" target="_blank">
                                    Beverly<br />Jaimes-Puente
                                    </a>
                                </h2>
                                <p>A full-stack web developer with extensive customer service experience who always keeps the end user in mind.
                                    Values continuous self-improvement and looks forward to learning new programming languages. Seeks a team
                                    driven by the challenge of creating solutions to real-world problems with code.</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-xs-12 col-md-6 col-lg-3">
                        <div className="card border-0">
                            <img className="card-img-top rounded-circle" src={require('../../assets/images/Annette.jpg')} alt={'Annette'}/>
                            <div className="card-body">
                                <h2 className="text-center">
                                    <a href="https://alumni.codeup.com/students/717" target="_blank">
                                    Annette<br />Iglesias
                                    </a>
                                </h2>
                                <p>I am a goal-driven, team-oriented and dependable software developer with a penchant for design
                                    and a vested interest in bridging the gap between modern problems with cutting-edge solutions. As
                                    a full-stack software developer, my aim is to stay abreast with the leading technologies and
                                    languages as to remain ahead of the curve and ensure stream-lined results and team success.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default AboutUsPage;