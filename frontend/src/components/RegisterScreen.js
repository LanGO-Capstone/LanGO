import React from 'react';


class RegisterScreen extends React.Component {

    // this.handleInputCHange =
    //     this.handleInputCHange.bind(this);
    //
    // handleInputChange(event) {
    //     const target = event.target;
    //     const value = target.type === 'checkbox' ? target.checked
    //         : target.value;
    //     const name = target.name;
    //
    //     this.setState({
    //         [name] : value
    //     });




    render() {
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
            </form>
            </div>
        )
    }

}

export default RegisterScreen;