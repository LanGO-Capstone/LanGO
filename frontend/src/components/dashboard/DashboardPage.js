import React from 'react';
import axios from 'axios';
import OpportunityListItem from "../opportunities/OpportunityListItem";

class DashboardPage extends React.Component {

    state = {
        opportunities: []
    };

    componentDidMount() {
        let opportunityList = [];

        axios.get('/api/opportunities')
            .then(res => {
                console.log(res.data);
                opportunityList = res.data.map(opportunity => {
                    // console.log(opportunity);
                    return (<OpportunityListItem key={opportunity.id} opportunity={opportunity}/>)
                });
                this.setState({opportunities: opportunityList});
            });
    }

    render() {
        return (
            <div className="container">
                <h1>Dashboard</h1>
                <ul className="list-unstyled">{this.state.opportunities}</ul>
            </div>
        )
    }
}

export default DashboardPage;