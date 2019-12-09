import OpportunityCardItem from "../opportunities/OpportunityCardItem";
import OpportunityListItem from "../opportunities/OpportunityListItem";
import React from "react";

let buildCards = (opportunities) => {
    let opportunityCards = [];
    for (let i = 0; i < opportunities.length; i += 4) {
        let row = [];
        for (let j = i; j < (i + 4) && (j < opportunities.length); j++) {
            row.push(
                <div key={j} className="col-md-3">
                    <OpportunityCardItem opportunity={opportunities[j]}/>
                </div>
            )
        }
        opportunityCards.push(
            <div key={i} className="row">
                {row}
            </div>
        )
    }
    return (<div className="">{opportunityCards}</div>)
};

let buildList = (opportunities) => {
    let opportunityList = opportunities.map((opportunity) => {
        return (<OpportunityListItem key={opportunity.id} opportunity={opportunity}/>)
    });

    return (<ul className="list-unstyled">{opportunityList}</ul>)
};

let displaySpinner = () => {
    return (
        <div className="vh-100 w-100 d-flex align-items-center justify-content-center">
            <div className="spinner-border" role="status">
                <span className="sr-only">Loading...</span>
            </div>
        </div>
    )
};

export {buildCards, buildList, displaySpinner};