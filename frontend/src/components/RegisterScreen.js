import React from 'react';
import axios from "axios";


class RegisterScreen extends React.Component {

     languages= ['Arabic', 'A.S.L','English', 'French', 'French', 'German', 'Japanese', 'Japanese', 'Korean', 'Spanish', 'Tagalog', 'Vietnamese'];

      state = {
          view:this.props.view,
          languages: []
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
                    <input name={"email"} placeholder={"E-mail"}/>
                </div>
                <label htmlFor="password">Password</label>
                <div>
                    <input type={"password"} name={"password"} placeholder={"Password"}/>
                </div>
                <label htmlFor="confirmpassword">Confirm Password</label>
                <div>
                    <input type={"password"} name={"confirmpassword"} placeholder={"Confirm password"}/>
                </div>
                {/*<button>Continue</button>*/}
                <label htmlFor="displayname">Display Name</label>
                <div>
                    <input type={"text"} name={"displayname"} placeholder={"Display name"}/>
                </div>
                <label htmlFor="mylanguages">My Languages</label>
                <ul className={"list-unstyled"}>{languagesList}</ul>

            </form>
            </div>
        )
    }

}

export default RegisterScreen;