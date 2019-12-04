import React from 'react';
import {Link} from "react-router-dom";

class OpportunityListItem extends React.Component {

    state = {
        eventDate: new Date(this.props.opportunity.eventDate)
    };

    render() {
        return (
            <li className="media my-5">
                <div className="media-body">
                    <Link to={`/opportunities/${this.props.opportunity.id}`}>
                        <h4 className={"card-title"}>
                            {this.props.opportunity.title}
                        </h4>
                    </Link>
                    <h5 className="text-muted">{this.state.eventDate.toDateString()}</h5>
                    <span className={"badge badge-secondary mr-2"}>{this.props.opportunity.language.language}</span>
                </div>
            </li>
        )
    }
}

export default OpportunityListItem;