import React from 'react';

class OpportunityCardItem extends React.Component {

    render() {
        return (
            <div className="card">
                <div className="card-body">
                    <h5 className={"card-title"}>{this.props.opportunity.title}</h5>
                    {this.props.opportunity.body}
                    <span className="badge badge-primary">{this.props.opportunity.language.language}</span>
                </div>
            </div>
        )
    }
}

export default OpportunityCardItem;