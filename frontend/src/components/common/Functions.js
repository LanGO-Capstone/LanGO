import OpportunityCardItem from "../opportunities/OpportunityCardItem";
import OpportunityListItem from "../opportunities/OpportunityListItem";
import React from "react";

let buildCards = (opportunities) => {
    let opportunityCards = [];
    for (let i = 0; i < opportunities.length; i += 4) {
        let row = [];
        for (let j = i; j < (i + 4) && (j < opportunities.length); j++) {
            row.push(
                <OpportunityCardItem opportunity={opportunities[j]}/>
            )
        }

        if (row.length < 4) {
            opportunityCards.push(
                <div key={i} className="row">
                    <div className={"col-md-" + row.length * 3}>
                        <div className="card-deck">
                            {row}
                        </div>
                    </div>
                </div>
            )
        } else {
            opportunityCards.push(
                <div key={i} className="card-deck">
                    {row}
                </div>
            )
        }
    }
    return (<div className="w-100">{opportunityCards}</div>)
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