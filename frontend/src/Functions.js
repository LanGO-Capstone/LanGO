import OpportunityCardItem from "./components/opportunities/OpportunityCardItem";
import OpportunityListItem from "./components/opportunities/OpportunityListItem";
import React from "react";

let buildCards = (opportunities) => {
    let opportunityCards = [];
    for (let i = 0; i < opportunities.length; i += 3) {
        let row = [];
        for (let j = i; j < (i + 3) && (j < opportunities.length); j++) {
            row.push(
                <div key={j} className="col-md-4">
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
    return (<div>{opportunityCards}</div>)

};

let buildList = (opportunities) => {
    let opportunityList = opportunities.map((opportunity) => {
        return (<OpportunityListItem key={opportunity.id} opportunity={opportunity}/>)
    });

    return (<ul className="list-unstyled">{opportunityList}</ul>)
};

export {buildCards, buildList};