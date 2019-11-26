import React from 'react';
import axios from 'axios';
import {displaySpinner} from "../common/Functions";
import {Redirect} from "react-router-dom";
import ReactFilestack from 'filestack-react';

class OpportunityPage extends React.Component {

    state = {
        isEditing: false,
        isLoading: true,
        successfulDelete: false,
        //needs to be set based on logged in user authentication
        interestedIn: false,
        // opportunity_id is whatever comes after the last / in the pathname
        oppId: this.props.location.pathname.substring(this.props.location.pathname.lastIndexOf("/") + 1)
    };

    componentDidMount() {
        axios.get(`/api/opportunities/${this.state.oppId}`)
            .then(res => {
                this.setState({
                        isLoading: false,
                        title: res.data.title,
                        address: res.data.address,
                        body: res.data.body,
                        eventDate: res.data.eventDate,
                        language: res.data.language,
                        creator: res.data.creator,
                        interestedUsers: res.data.interestedUsers,
                        images: res.data.images
                    }
                );
            })
    }

    createDate = () => {
        if (this.state.eventDate === null) {
            return null;
        } else {
            let date = new Date(this.state.eventDate);
            return (
                <div>
                    <span className="font-weight-bold">Date: </span>
                    {date.toDateString()}
                </div>
            );
        }
    };

    createAddress = () => {
        if (this.state.address === null) {
            return null
        } else {
            return (
                <div>
                    <span className="font-weight-bold">Address: </span>
                    {this.state.address}
                </div>
            );
        }
    };

    createInterestedList = () => {
        return this.state.interestedUsers.map((element, index) => {
            return <li key={index}>{element.email}</li>
        });
    };
    //
    // createOpportunityImages = () => {
    //     return this.state.images.map((element, index) => {
    //         return <div key={index}><img src={element.url} alt="Supplied by user"
    //         id={`img-${element.id}`}
    //         /></div>
    //     });
    // };


    createOpportunityImages = () => {
        return this.state.images.map((element, index) => {
            return <div className="removable" key={index}>
                <img src={element.url} alt="Supplied by user"
                                         id={`img-${element.id}`}/>
                <a className="deleteIcon" id={element.id}
                    onClick={this.deleteImage}>
                    <img className="deleteIconSize" src="https://image.flaticon.com/icons/svg/261/261935.svg"/>

                </a>
            </div>
        });
    };


    deleteImage = () => {
        console.log("deleting image")
    };

    deleteOpportunity = () => {
        axios.post(`/api/opportunities/${this.state.oppId}/delete`)
            .then(() => this.setState({
                successfulDelete: true
            }))
    };

    edit = () => {
        this.setState({
            isEditing: true
        })
    };

    save = () => {
        this.setState({
            isEditing: false
        });

        axios.post(`/api/opportunities/${this.state.oppId}/edit`,
            `title=${this.state.title}&address=${this.state.address}&body=${this.state.body}&eventDate=${this.state.eventDate}&language=${this.state.language}&creator=${this.state.creator}$interestedUsers=${this.state.interestedUsers}&images=${this.state.images}`)
    };

    handleChange = type => event => {
        this.setState({
            [type]: event.target.value
        })
    };

    interestedIn = () => {
        axios.post(`/api/users/13/interestedin/${this.state.oppId}/add`)
            .then(() => this.setState({
                interestedIn: true
            }))
    };

    notInterestedIn = () => {
        axios.post(`/api/users/13/interestedin/${this.state.oppId}/remove`)
            .then(() => this.setState({
                interestedIn: false
            }))
    };

    render() {
        if (this.state.isLoading) {
            return displaySpinner()
        }

        if (this.state.successfulDelete) {
            return (<Redirect to={"/profile/myopportunities"}/>)
        }

        return (
            <div className={"container"}>
                <h1 className={"text-center my-4"}>
                    {this.state.isEditing ?
                        <input
                            className="form-control"
                            onChange={this.handleChange(`title`)}
                            type={"title"}
                            value={this.state.title}/>
                        :
                        this.state.title
                    }
                </h1>
                <div className="row">
                    {/*Left-hand side: Event Details*/}
                    <div className="col-md-5">
                        <h3>Event Details</h3>
                        <ul className="list-unstyled">
                            <li>
                                <span className={"badge badge-primary"}>{this.state.language.language}</span>
                            </li>
                            <li>
                                {this.state.isEditing ?
                                    <input
                                        className="form-control"
                                        onChange={this.handleChange('eventDate')}
                                        type={"datetime-local"}
                                        value={this.state.eventDate}/>
                                    :
                                    this.createDate()
                                }
                            </li>
                            <li>
                                {this.state.isEditing ?
                                    <input
                                        className="form-control"
                                        onChange={this.handleChange('address')}
                                        type={"address"}
                                        value={this.state.address}/>
                                    :
                                    this.createAddress()
                                }
                            </li>
                            <li>
                                <span className="font-weight-bold">Contact: </span>
                                {this.state.creator.userDetails.displayName} (email)
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
                                (<button onClick={() => this.notInterestedIn()} className="btn btn-secondary">Not
                                    Interested</button>)
                                :
                                (<button onClick={() => this.interestedIn()} className="btn btn-info">I'm
                                    Interested</button>)
                            }
                        </div>
                        <div>
                            {this.state.isEditing ?
                                (<button onClick={() => this.save()} className="btn btn-success">Save</button>)
                                :
                                (<button onClick={() => this.edit()} className="btn btn-primary">Edit</button>)
                            }
                        </div>
                        <div>
                            <button onClick={() => this.deleteOpportunity()} className="btn btn-danger">Delete this
                                Opportunity
                            </button>
                        </div>
                    </div>
                    {/*Right-hand side: Event Description*/}
                    <div className="col-md-7">
                        <h3>Event Description</h3>
                        {this.state.isEditing ?
                            <textarea
                                className="form-control"
                                onChange={this.handleChange('body')}
                                type={"body"}
                                value={this.state.body}/>
                            :
                            this.state.body
                        }
                        {this.createOpportunityImages()}
                        <div>
                            <ReactFilestack
                                apikey={'APm2qa235SOK43uLAvFPTz'}
                                componentDisplayMode={{
                                    type: 'button',
                                    customText: 'Add an Opportunity Image',
                                    customClass: 'btn btn-primary'
                                }}
                                onSuccess={
                                    (res) => {
                                        axios.post(`/api/opportunities/${this.state.oppId}/images/add`,
                                            `fsHandle=${res.filesUploaded[0].handle}`)
                                            .then(() => {
                                                axios.get(`/api/opportunities/${this.state.oppId}`)
                                                    .then(res2 => {
                                                        this.setState({
                                                                images: res2.data.images
                                                            }
                                                        );
                                                    })
                                            })
                                    }
                                }
                            />
                        </div>
                    </div>

                </div>
            </div>
        )
    }
}

export default OpportunityPage;