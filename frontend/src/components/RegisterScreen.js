import React from 'react';
import axios from "axios";


class RegisterScreen extends React.Component {


     userLanguages= [];

      state = {
          dbLangs : [],
          view:this.props.view,
          email:'',
          password:'',
          confirmPassword:'',
          displayName:'',
          languages: []
    };

    componentDidMount() {
        axios.get('/api/languages')
            .then(res => {
                this.setState({dbLangs: res.data})
                })
    }

    handleInput = type => event => {
        this.setState({
            [type]: event.target.value
        });
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

     verifyCheckbox(language) {
         if(this.userLanguages.indexOf(language) === -1){
             this.userLanguages.push(language);
         } else {
             let index = this.userLanguages.indexOf(language);
         this.userLanguages.splice(index, 1);
         }
         this.setState({languages : this.userLanguages});
     }

     registerButton = event => {
        event.preventDefault();
        console.log(`email=${this.state.email}&password=${this.state.password}&displayName=${this.state.displayName}&languages=${this.state.languages}`);
        axios.post("/api/register", `email=${this.state.email}&password=${this.state.password}&displayName=${this.state.displayName}&languages=${this.state.languages}`).then(() => console.log("button pressed"))
     };

    render() {

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