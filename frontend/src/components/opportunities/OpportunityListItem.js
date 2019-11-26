import React from 'react';
import {Link} from "react-router-dom";

class OpportunityListItem extends React.Component {

    state = {
        eventDate: new Date(this.props.opportunity.eventDate)
    };

    render() {
        return (
            <li className="media my-4">
                <div className="media-body">
                    <Link to={`/opportunities/${this.props.opportunity.id}`}>
                        <h5 className={"card-title"}>{this.props.opportunity.title}</h5>
                    </Link>
                    <h6 className="text-muted">{this.state.eventDate.toDateString()}</h6>
                    <p>{this.props.opportunity.body}</p>
                    <span className={"badge badge-primary"}>{this.props.opportunity.language.language}</span>
                </div>
            </li>
        )
    }
}

export default OpportunityListItem;