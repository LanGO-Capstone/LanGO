import React from 'react';
import axios from "axios";

class CreateOpportunity extends React.Component {

   // id, address, body, created date, event date, is active, title, creator id, language id




    state = {
        //array that collects the lists of languages from the database
        dbLangs: [],
        view:this.props.view,
        title: '',
        datetime: '',
        address: '',
        description:'',
        isLoading: true,



    };


    //get request that populates the dbLangs array with the content from the languages table
    componentDidMount() {
        axios.get('/api/languages')
            .then(res => {
                this.setState({dbLangs: res.data,
                isLoading: false})
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


    handleOptionChange(changeEvent){
        this.setState({
            selectedOption: changeEvent.target.value
        });
    }



    render() {
        if( this.state.isLoading){
            return(
                <div>Loading</div>
            )
        }
        let languagesList = this.state.dbLangs.map((element) => {
            return (<li key={element.id}>
                <input
                    onChange={() => {
                        this.handleOptionChange(element.language)
                    }}
                    // checked={this.state.selectedOption}
                    type="radio"
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
    return(
        <div>
            <div>
                Create an opportunity!
            </div>
            <form method={"post"} action={"/api/create-opportunity"}>
                <label htmlFor="title">Title:</label>
                <div>
                <input onChange={this.handleInput('title')}
               type={"text"} name={"title"} placeholder={"Opportunity Title"}/>
                </div>
                <label htmlFor="datetime">Opportunity Date/Time:</label>
                <div>
                    <input onChange={this.handleInput('datetime')} id={"b"} type="datetime-local"/>
                </div>
                <label htmlFor="address">Opportunity Address:</label>
                <div>
                    <input onChange={this.handleInput('opportunity-address')} type="text" name={"opportunity-address"} placeholder={"Opportunity Address"}/>
                </div>
                <label htmlFor="body">Opportunity Description:</label>
                <div>
                    <textarea onChange={this.handleInput('body')} name="body" id="body" cols="30" rows="10">

                    </textarea>
                </div>
            <label htmlFor="opportunitylanguages">Opportunity Languages</label>
            <ul className={"list-unstyled"}>{languagesList}</ul>
                <div>
                    <button type="submit" value="submit"
                            onClick={this.submitOpportunityButton}>
                        Create Opportunity!
                    </button>
                </div>
            </form>
        </div>
    );


}
}

export default CreateOpportunity;