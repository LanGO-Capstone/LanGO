import React from 'react';
import axios from "axios";
import OpportunityCardItem from "../opportunities/OpportunityCardItem";
import OpportunityListItem from "../opportunities/OpportunityListItem";

class InterestedOpportunities extends React.Component {

    state = {
        view: this.props.view,
        opportunities: []
    };

    static getDerivedStateFromProps(props, state) {
        if (props.view !== state.view) {
            return {
                view: props.view
            }
        }
        return null;
    }

    componentDidMount() {
        // Hard-coded userId of 17; replace with userId of logged-in user
        axios.get('/api/users/17/interestedin')
            .then(res => this.setState({opportunities: res.data}));
    }

    render() {
        if (this.state.view === 'list') {
            let opportunityList = this.state.opportunities.map((opportunity) => {
                return (<OpportunityListItem key={opportunity.id} opportunity={opportunity}/>)
            });

            return (<ul className="list-unstyled">{opportunityList}</ul>)
        } else {
            let opportunityList = this.state.opportunities.map((opportunity) => {
                return (<OpportunityCardItem key={opportunity.id} opportunity={opportunity}/>)
            });

            return (<div>{opportunityList}</div>)
        }
    }
}

export default InterestedOpportunities;