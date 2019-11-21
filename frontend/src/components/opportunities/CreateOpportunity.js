import React from 'react';

class CreateOpportunity extends React.Component {

   // id, address, body, created date, event date, is active, title, creator id, language id

    //function that sets the state from the user input
    handleInput = type => event => {
        this.setState({
            [type]: event.target.value
        });
    };

    render() {
    return(
        <div>
            <div>
                Create an opportunity!
            </div>
            <form method={"post"} action={"/api/create-opportunity"}>
                <label htmlFor="title">Title</label>
                <div>
                <input onChange={this.handleInput('title')}
               type={"text"} name={"title"} placeholder={"Opportunity Title"}/>
                </div>
                <label htmlFor="opportunity-date">Opportunity Date</label>
                <div>
                    <input type="text"/>
                </div>
            </form>
        </div>
    );
    }

}

export default CreateOpportunity;