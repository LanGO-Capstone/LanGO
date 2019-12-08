import React from 'react';
import {Link} from "react-router-dom";

class OpportunityListItem extends React.Component {

    state = {
        eventDate: new Date(this.props.opportunity.eventDate)
    };

    render() {
        return (
            <li className="media my-5">
                {this.props.opportunity.images[0] &&
                <img src={this.props.opportunity.images[0].url} height={100} className={'mr-2 align-self-center'} alt=""/>
                }
                <div className="media-body">
                    <Link to={`/opportunities/${this.props.opportunity.id}`}>
                        <h4 className={"card-title"}>
                            {this.props.opportunity.title}
                        </h4>
                    </Link>
                    {this.state.eventDate.getFullYear() !== 1969 && <h5 className="text-muted">{Intl.DateTimeFormat('en-US', {dateStyle: 'medium'}).format(this.state.eventDate)}</h5>}
                    <span className={"badge badge-secondary mr-2 custom-bg"}>{this.props.opportunity.language.language}</span>
                </div>
            </li>
        )
    }
}

export default OpportunityListItem;