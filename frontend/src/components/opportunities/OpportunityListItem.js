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
                    <h5>{this.props.opportunity.title}
                        <span className="text-muted">{this.state.eventDate.toDateString()}</span>
                    </h5>
                    {this.props.opportunity.body}
                </div>
            </li>
        )
    }
}

export default OpportunityListItem;