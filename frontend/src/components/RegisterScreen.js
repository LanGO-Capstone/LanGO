import React from 'react';
import {Link} from "react-router-dom";


class RegisterScreen extends React.Component {

    render() {
        return (
            <div>
            <div>
                Register
            </div>
            <form method={"post"} action={"/api/register"} >
                <div>
                    <input name={"email"} placeholder={"Email"}/>
                </div>
                <div>
                    <input type={"password"} name={"password"} placeholder={"Password"}/>
                </div>
                <div>
                    <input type={"password"} name={"confirmpassword"} placeholder={"Confirm password"}/>
                </div>
                <button>Continue</button>
            </form>
            </div>
        )
    }

}

export default RegisterScreen;