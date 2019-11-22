import React from 'react';
import axios from "axios";


class RegisterScreen extends React.Component {

    //empty array to hold the user selections during registration
     userLanguages= [];

      state = {

          //array that collects the lists of languages from the database
          dbLangs : [],
          view:this.props.view,
          email:'',
          password:'',
          confirmPassword:'',
          displayName:'',

          //array that will eventually be sent to the database for the user's specifications
          languages: [],
          isLoading: true
    };


      //get request that populates the dbLangs array with the content from the languages table
      componentDidMount() {
        axios.get('/api/languages')
            .then(res => {
                this.setState({
                    dbLangs: res.data,
                    isLoading: false
                })
            })
    }


    //function that sets the state from the user input
    handleInput = type => event => {
        this.setState({
            [type]: event.target.value
        });
    };

    static getDerivedStateFromProps(props, languages) {
              if (props.view !== languages.view) {
                  return {
                      view: props.view
                  }
              }
              return null;
      }

      // adds/ removes the language from the userLanguages array when the checkbox is checked/unchecked
     verifyCheckbox(langfromDB) {
         if(this.userLanguages.indexOf(langfromDB.language) === -1){
             this.userLanguages.push(langfromDB.language);
         } else {
             let index = this.userLanguages.indexOf(langfromDB.language);
             this.userLanguages.splice(index, 1);
         }
         this.setState({languages : this.userLanguages});
     }

     //posts all the information from the register form to the register controller
     registerButton = event => {
        event.preventDefault();
        // console.log(`email=${this.state.email}&password=${this.state.password}&displayName=${this.state.displayName}&languages=${this.state.languages}`);
        axios.post("/api/register", `email=${this.state.email}&password=${this.state.password}&displayName=${this.state.displayName}&languages=${this.state.languages}`).then(() => console.log("button pressed"))
     };

    render() {
        // Necessary to prevent rendering fail on objects/arrays inside of this.state.opportunity
        if (this.state.isLoading) {
            return (
                <div>Loading</div>
            )
        }

        let languagesList = this.state.dbLangs.map((element) => {
            return(<li key={element.id}>
                <input
                    onChange={() => {
                        this.verifyCheckbox(element)
                    }}
                    type="checkbox"
                    value={element.language}
                    name={element.language}
                    id={element.language}
                />

                {/*//input id has to match the label's htmlFor attribute */}
                <label htmlFor={element.language}>
                {element.language}
                </label>

                </li>)
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
                    <input
                        onChange={this.handleInput('password')}
                        type={"password"} name={"password"} placeholder={"Password"}/>
                </div>
                <label htmlFor="confirmPassword">Confirm Password</label>
                <div>
                    <input
                        onChange={this.handleInput('confirmPassword')}
                        type={"password"} name={"confirmPassword"} placeholder={"Confirm password"}/>
                </div>
                {/*<button>Continue</button>*/}
                <label htmlFor="displayName">Display Name</label>
                <div>
                    <input
                        onChange={this.handleInput('displayName')}
                        type={"text"} name={"displayName"} placeholder={"Display name"}/>
                </div>
                <label htmlFor="mylanguages">My Languages</label>
                <ul className={"list-unstyled"}>{languagesList}</ul>
                <div>
                    <button type="submit" value="submit"
                        onClick={this.registerButton}>
                        Register
                    </button>
                </div>

            </form>
            </div>

        )
    }

}

export default RegisterScreen;