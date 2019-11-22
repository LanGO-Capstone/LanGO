import React from 'react';
import {Link} from "react-router-dom";

class OpportunityListItem extends React.Component {

    state = {
        eventDate: new Date(this.props.opportunity.eventDate)
        // isLoading: true
    };

    componentDidMount() {
        if (this.props.opportunity.eventDate) {
            this.setState({
                eventDate: new Date(this.props.opportunity.eventDate)
            })
        }
    }

    render() {
        // // Necessary to prevent rendering fail on objects/arrays inside of this.state.opportunity
        // if (this.state.isLoading) {
        //     return (
        //         <div>Loading</div>
        //     )
        // }
        // console.log(this.props.opportunity);
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