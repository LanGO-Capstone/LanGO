import React from 'react';
import axios from "axios";
import {displaySpinner} from "../../Functions";

class MyLanguages extends React.Component {

    state = {
        languages: this.props.languages,
        isEditing: this.props.isEditing,
        allLanguages: [],
        isLoading: true
    };

    static getDerivedStateFromProps(props, state) {
        if (props.isEditing !== state.isEditing) {
            return {
                isEditing: props.isEditing
            }
        }

        return null;
    }

    componentDidMount() {
        axios.get('/api/languages')
            .then(res => this.setState({
                allLanguages: res.data,
                isLoading: false
            }))
    }

    // Handles the checkbox changes
    handleChange = (element) => {
        let langs = this.state.languages;
        let found = false;
        let pos;

        // Loops through languages to see if already exists
        langs.forEach((language, index) => {
            if (language.language === element.language) {
                found = true;
                pos = index;
            }
        });

        // If it was there, the user unchecked it, so remove it from state
        if (found) {
            langs.splice(pos, 1)
            // If it wasn't found the user checked it, so put in in state
        } else {
            langs.push(element)
        }

        this.setState({
            languages: langs
        }, () => {
            this.props.callback(this.state.languages)
        })
    };

    buildAllLanguages = () => {
        return this.state.allLanguages.map((element) => {

            // Check to see if the user already has this lang so it can be checked by default
            let found = false;
            this.state.languages.forEach(language => {
                if (language.language === element.language) {
                    found = true;
                }
            });

            return (<div className={'form-check'} key={element.id}>
                <input
                    onChange={() => {
                        this.handleChange(element)
                    }}
                    className={'form-check-input'}
                    type="checkbox"
                    checked={found}
                    value={element.language}
                    name={element.language}
                    id={element.language}/>
                <label htmlFor={element.language}>{element.language}</label>
            </div>)
        })
    };

    buildSelectedLanguages = () => {
        return this.state.languages.map(function (element) {
            return <li key={element.id}>{element.language}</li>
        });
    };

    render() {
        if (this.state.isLoading) {
            return displaySpinner()
        }

        if (this.state.isEditing) {
            return (
                <div className={'form-group'}>
                    {this.buildAllLanguages()}
                </div>
            )
        }

        return (
            <ul className="list-unstyled">
                {this.buildSelectedLanguages()}
            </ul>
        )
    }
}

export default MyLanguages;