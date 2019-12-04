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
                <div>
                    <h2>Interests</h2>
                    <div className="input-group">
                        <input
                            className="form-control"
                            onChange={this.handleChange('interests')}
                            value={this.state.interests}
                            type="text"/>
                    </div>
                    <h2>About Me</h2>
                    <ReactMde
                        onChange={this.handleMDChange('aboutMe')}
                        value={this.state.aboutMe}
                    />
                </div>
            )
        }

        return (
            <div>
                <h2>Interests</h2>
                <p>{this.state.interests}</p>
                <h2>About Me</h2>
                <ReactMarkdown source={this.state.aboutMe}/>
            </div>
        )
    }
}

export default AboutMe;