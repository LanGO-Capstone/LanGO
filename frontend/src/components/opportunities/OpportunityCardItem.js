import React from 'react';
import {Link} from "react-router-dom";

class OpportunityCardItem extends React.Component {

    state = {
        eventDate: new Date(this.props.opportunity.eventDate)
    };

    render() {
        return (
            <div className="card my-3 shadow">
                {this.props.opportunity.images[0] &&
                <img src={this.props.opportunity.images[0].url} className={'card-img-top card-img'} height={100} alt=""/>
                }
                <div className="card-body">
                    <Link to={`/opportunities/${this.props.opportunity.id}`}>
                        <h5 className={"card-title"}>{this.props.opportunity.title}</h5>
                    </Link>
                    {this.state.eventDate.getFullYear() !== 1969 && <h6 className="card-subtitle mb-2 text-muted">{Intl.DateTimeFormat('en-US', {dateStyle: 'medium'}).format(this.state.eventDate)}</h6>}
                    <span className={"badge badge-secondary"}>{this.props.opportunity.language.language}</span>
                </div>
            </div>
        )
    }
}

export default OpportunityCardItem;