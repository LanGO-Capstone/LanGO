import React from 'react';
import ReactMde from "react-mde";
import "react-mde/lib/styles/css/react-mde-all.css";
import ReactMarkdown from "react-markdown";

class AboutMe extends React.Component {

    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);

        this.state = {
            interests: this.props.interests,
            aboutMe: this.props.aboutMe,
            isEditing: this.props.isEditing
        };
    }

    static getDerivedStateFromProps(props, state) {
        if (props.isEditing !== state.isEditing) {
            return {
                isEditing: props.isEditing
            }
        }
        return null;
    }

    handleChange = type => event => {
        this.setState({
                [type]: event.target.value
            },
            () => {
                this.props.callback(this.state.interests, this.state.aboutMe)
            })
    };

    handleMDChange = type => event => {
        this.setState({
                [type]: event
            },
            () => {
                this.props.callback(this.state.interests, this.state.aboutMe)
            })
    };

    render() {
        if (this.state.isEditing) {
            return (
                <div className={'card'}>
                    <div className="card-body">

                        <h3>Interests</h3>
                        <div className="input-group">
                            <input
                                className="form-control"
                                onChange={this.handleChange('interests')}
                                value={this.state.interests}
                                type="text"/>
                        </div>
                        <h3>About Me</h3>
                        <ReactMde
                            onChange={this.handleMDChange('aboutMe')}
                            value={this.state.aboutMe}
                        />
                    </div>
                </div>
            )
        }

        return (
            <div className={'card'}>
                <div className="card-body">

                    <h3>Interests</h3>
                    <p>{this.state.interests}</p>
                    <h3>About Me</h3>
                    <ReactMarkdown source={this.state.aboutMe}/>
                </div>
            </div>
        )
    }
}

export default AboutMe;