import React from 'react';
import axios from 'axios';
import {displaySpinner} from "../../Functions";
import {Redirect} from "react-router-dom";

class OpportunityPage extends React.Component {

    state = {
        isLoading: true,
        successfulDelete: false,
        interestedIn: false,
        // opportunity_id is whatever comes after the last / in the pathname
        oppId: this.props.location.pathname.substring(this.props.location.pathname.lastIndexOf("/") + 1)
    };

    componentDidMount() {
        axios.get(`/api/opportunities/${this.state.oppId}`)
            .then(res => {
                console.log(res.data);
                this.setState({
                        isLoading: false,
                        opportunity: res.data,
                    }
                );
            })
    }

    createDate = () => {
        let date = [];
        if (this.state.opportunity.eventDate === null) {
            date.push("");
        } else {
            date.push(
                <div key={1}>
                    <span className="font-weight-bold">Date: </span>
                    {this.state.opportunity.eventDate.substring(0, 10)}
                </div>
            );
        }
        return date;
    };

    createAddress = () => {
        let address = [];
        if (this.state.opportunity.address === null) {
            address.push("");
        } else {
            address.push(
                <div key={1}>
                    <span className="font-weight-bold">Address: </span>
                    {this.state.opportunity.address}
                </div>
            );
        }
        return address;
    };

    createInterestedList = () => {
        let interestedList = [];
        for (let i = 0; i < this.state.opportunity.interestedUsers.length; i++) {
            interestedList.push(<li key={i}>{this.state.opportunity.interestedUsers[i].email}</li>);
        }
        return interestedList;
    };

    createOpportunityImages = () => {
        let opportunityImages = [];
        for (let i = 0; i < this.state.opportunity.images.length; i++) {
            opportunityImages.push(<div key={i}><img key={i} src={this.state.opportunity.images[i].url} alt="Supplied by user"/><br/></div>);
        }
        return opportunityImages;
    };

    deleteOpportunity = () => {
        console.log("Attempting to delete opportunity.");
        axios.post(`/api/opportunities/${this.state.oppId}/delete`)
            .then(res => this.setState({
                    successfulDelete: true
                }))
    };

    interestedIn = () => {
        console.log("I'm interested");
        //hard code userId 13
        axios.post(`/api/users/13/add/${this.state.oppId}`)
            .then(res => this.setState({
                    interestedIn: true
            }))
        // this.setState({interestedIn:true})
    };

    notInterestedIn = () => {
        console.log("im not interested");
        this.setState({interestedIn: false})
    };

    render() {
        // Necessary to prevent rendering fail on objects/arrays inside of this.state.opportunity
        if (this.state.isLoading) {
            return (
                displaySpinner()
            )
        }

        if (this.state.successfulDelete) {
            return (<Redirect to={"/profile/myopportunities"}/>)
        }
        return (
            <div className={"container"}>
                <h1 className={"text-center my-4"}>
                    {this.state.opportunity.title}
                </h1>
                <div className="row">
                    {/*Left-hand side: Event Details*/}
                    <div className="col-md-5">
                        <h3>Event Details</h3>
                        <ul className="list-unstyled">
                            <li>
                                <span className={"badge badge-primary"}>{this.state.opportunity.language.language}</span>
                            </li>
                            <li>
                                {this.createDate()}
                            </li>
                            <li>
                                {this.createAddress()}
                            </li>
                            <li>
                                <span className="font-weight-bold">Contact: </span>
                                {this.state.opportunity.creator.userDetails.displayName} (email)
                            </li>
                        </ul>
                        <h3>Interested Users</h3>
                        <div>
                            <ul>
                                {this.createInterestedList()}
                            </ul>
                        </div>
                        <div>
                            {this.state.interestedIn ?
                                (<button onClick={() => this.notInterestedIn()} className="btn btn-secondary">Not Interested</button>)
                                :
                                (<button onClick={() => this.interestedIn()} className="btn btn-info">I'm
                                    Interested</button>)
                            }
                        </div>
                        <br/>
                        <div>
                            <button onClick={() => this.deleteOpportunity()} className="btn btn-danger">Delete this Opportunity</button>
                        </div>
                    </div>
                    {/*Right-hand side: Event Description*/}
                    <div className="col-md-7">
                        <h3>Event Description</h3>
                        {this.state.opportunity.body}
                        <br/>
                        {this.createOpportunityImages()}
                    </div>
                </div>
            </div>
        )
    }
}

export default OpportunityPage;