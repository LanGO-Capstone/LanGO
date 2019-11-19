import React from 'react';

class OpportunityListItem extends React.Component {

    state = {
        eventDate: new Date(this.props.opportunity.eventDate)
    };

    componentDidMount() {
        if (this.props.opportunity.eventDate) {
            this.setState({
                eventDate: new Date(this.props.opportunity.eventDate)
            })
        }
    }

    render() {
        return (
            <li className="media my-4">
                <div className="media-body">
                    <h5>{this.props.opportunity.title}</h5>
                    <h6 className="text-muted">{this.state.eventDate.toDateString()}</h6>
                    <p>{this.props.opportunity.body}</p>
                    <span className={"badge badge-primary"}>{this.props.opportunity.language.language}</span>
                </div>
            </li>
        )
    }
}

export default OpportunityListItem;