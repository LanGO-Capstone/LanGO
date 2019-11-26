import React from 'react';
import {Link} from "react-router-dom";

class OpportunityCardItem extends React.Component {

    state = {
        eventDate: new Date(this.props.opportunity.eventDate)
    };

    render() {
        return (
            <div className="card mb-2">
                <div className="card-body">
                    <Link to={`/opportunities/${this.props.opportunity.id}`}>
                        <h5 className={"card-title"}>{this.props.opportunity.title}</h5>
                    </Link>
                    <h6 className="card-subtitle mb-2 text-muted">{this.state.eventDate.toDateString()}</h6>
                    <p className="card-text">
                        {this.props.opportunity.body}
                    </p>
                    <span className={"badge badge-primary"}>{this.props.opportunity.language.language}</span>
                </div>
            </div>
        )
    }
}

export default OpportunityCardItem;