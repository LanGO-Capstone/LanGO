import React from 'react';

class OpportunityListItem extends React.Component {

    render() {
        return (
            <li className="media my-4">
                <div className="media-body">
                    <h5>{this.props.opportunity.title}
                        <span className="badge badge-primary">{this.props.opportunity.language.language}</span>
                    </h5>
                    {this.props.opportunity.body}
                </div>
            </li>
        )
    }
}

export default OpportunityListItem;