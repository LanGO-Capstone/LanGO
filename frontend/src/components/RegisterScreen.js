import React from 'react';
import axios from "axios";


class RegisterScreen extends React.Component {

     languages= ['Arabic', 'A.S.L','English', 'French', 'German', 'Japanese', 'Korean', 'Spanish', 'Tagalog', 'Vietnamese'];

      state = {
          email:'',
          password:'',
          confirmPassword:'',
          displayName:'',
          view:this.props.view,
          languages: []
    };

    handleInput = type => event => {
        this.setState({
            [type]: event.target.value
        })
        console.log(this.state.languages)
    };



    static getDerivedStateFromProps(props, languages) {
              if (props.view !== languages.view) {
                  return {
                      view: props.view
        }
        }
              return null;
      }

    render() {

        let languagesList = this.languages.map((language) => {
            return(<li key={language}>
                <label htmlFor={"language"}>
                    <input
                        onChange={() => {
                            if(this.state.languages.indexOf({language}) === -1){
                                this.state.languages.push({language});
                                console.log(this.state.languages.indexOf({language}));
                            } else {
                            //    search for a method to remove an element from an array by passing in that element
                            let index = this.state.languages.indexOf({language});
                                this.state.languages.splice(index, 1);
                            }
                        }}
                        type="checkbox"
                        value={"language"}
                        name={"language"}
                    />
                </label>
                {language}</li>)
        });
        return (
            <div>
            <div>
                Register
            </div>
            <form method={"post"} action={"/api/register"} >
                <label htmlFor="email">E-mail</label>
                <div>
                    <input
                        onChange={this.handleInput('email')}

                        name={"email"} placeholder={"E-mail"}/>
                </div>
                <label htmlFor="password">Password</label>
                <div>
                    <input type={"password"} name={"password"} placeholder={"Password"}/>
                </div>
                <label htmlFor="confirmPassword">Confirm Password</label>
                <div>
                    <input type={"password"} name={"confirmPassword"} placeholder={"Confirm password"}/>
                </div>
                {/*<button>Continue</button>*/}
                <label htmlFor="displayName">Display Name</label>
                <div>
                    <input type={"text"} name={"displayName"} placeholder={"Display name"}/>
                </div>
                <label htmlFor="mylanguages">My Languages</label>
                <ul className={"list-unstyled"}>{languagesList}</ul>

            </form>
            </div>

        )
    }

}

export default RegisterScreen;