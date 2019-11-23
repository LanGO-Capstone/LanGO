import React from 'react';

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

    render() {
        if (this.state.isEditing) {
            return (
                <div>
                    <h5>Interests</h5>
                    <div className="input-group">
                        <input
                            className="form-control"
                            onChange={this.handleChange('interests')}
                            value={this.state.interests}
                            type="text"/>
                    </div>
                    <h5>About Me</h5>
                    <div className={"input-group"}>
                        <textarea
                            className="form-control"
                            onChange={this.handleChange('aboutMe')}
                            value={this.state.aboutMe}/>
                    </div>
                </div>
            )
        }

        return (
            <div>
                <h5>Interests</h5>
                <p>{this.state.interests}</p>
                <h5>About Me</h5>
                <p>{this.state.aboutMe}</p>
            </div>
        )
    }
}


export default AboutMe;