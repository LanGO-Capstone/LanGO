import React from 'react';
import axios from 'axios';
import {displaySpinner} from "../common/Functions";
import {Link, Redirect} from "react-router-dom";
import ReactFilestack from 'filestack-react';

class OpportunityPage extends React.Component {

    state = {
        isEditing: false,
        isCreator: false,
        isLoading: true,
        successfulDelete: false,
        // opportunity_id is whatever comes after the last / in the pathname
        oppId: this.props.location.pathname.substring(this.props.location.pathname.lastIndexOf("/") + 1)
    };

    componentDidMount() {
        axios.get(`/api/opportunities/${this.state.oppId}`)
            .then(res => {
                let interestedIn = false;
                let isCreator = false;

                // Check if the user is logged in
                if (this.props.loggedInUser) {
                    res.data.interestedUsers.forEach(user => {
                        if (user.id === this.props.loggedInUser.id) {
                            interestedIn = true;
                        }
                    });

                    if (res.data.creator.id === this.props.loggedInUser.id) {
                        isCreator = true;
                    }
                }

                this.setState({
                        isLoading: false,
                        title: res.data.title,
                        address: res.data.address,
                        body: res.data.body,
                        eventDate: res.data.eventDate,
                        language: res.data.language,
                        creator: res.data.creator,
                        interestedUsers: res.data.interestedUsers,
                        images: res.data.images,
                        interestedIn: interestedIn,
                        isCreator: isCreator
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
            return <li key={index}>
                <Link to={`/users/${element.id}`}>{element.userDetails.displayName}</Link> &nbsp;
                {this.props.loggedInUser ?
                    <Link
                        className={"fas fa-envelope"}
                        to={{
                            pathname: '/inbox',
                            state: {
                                userId: element.id,
                                displayName: element.userDetails.displayName
                            }
                        }}></Link>
                    : ''
                }
            </li>
        });
    };

    createOpportunityImages = () => {
        return this.state.images.map((element, index) => {
            return <div className="removable" key={index}>
                <img src={element.url} alt="Supplied by user" className="mw-100"
                     id={`img-${element.id}`}/>
                {this.state.isCreator ?
                    <a className="deleteIcon" id={element.id}
                       onClick={() => this.deleteImage(element.id)}>
                        <img className="deleteIconSize" src="https://image.flaticon.com/icons/svg/261/261935.svg" alt={''}/>
                    </a>
                    : ''}
            </div>
        });
    };

    deleteImage = (imageId) => {
        axios.post(`/api/opportunities/${this.state.oppId}/images/${imageId}/delete`)
            .then(() => {
                axios.get(`/api/opportunities/${this.state.oppId}`)
                    .then(res => {
                        this.setState({
                            images: res.data.images
                        })
                    })
            })
    };

    deleteOpportunity = () => {
        let deleteConf = window.confirm("Are you sure you want to delete this Opportunity?");
        if(deleteConf){
        axios.post(`/api/opportunities/${this.state.oppId}/delete`)
            .then(() => this.setState({
                successfulDelete: true
            }))
    }
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
        axios.post(`/api/users/${this.props.loggedInUser.id}/interestedin/${this.state.oppId}/add`)
            .then(() => {
                this.state.interestedUsers.push(this.props.loggedInUser);
                this.setState({
                    interestedIn: true
                })
            })
    };

    notInterestedIn = () => {
        axios.post(`/api/users/${this.props.loggedInUser.id}/interestedin/${this.state.oppId}/remove`)
            .then(() => {

                let index;
                this.state.interestedUsers.forEach((user, i) => {
                    if (user.id === this.props.loggedInUser.id) {
                        index = i;
                    }
                });

                this.state.interestedUsers.splice(index, 1);

                this.setState({
                    interestedIn: false
                })
            })
    };

    render() {
        if (this.state.isLoading) {
            return displaySpinner()
        }

        if (this.state.successfulDelete) {
            return (<Redirect to={"/profile/myopportunities"}/>)
        }

        return (
            <div className={"container mt-5 pt-5"}>
                <h1 className={"text-center mb-5"}>
                    {this.state.isEditing ?
                        <input
                            placeholder={'Title'}
                            className="form-control"
                            onChange={this.handleChange(`title`)}
                            type={"title"}
                            value={this.state.title}/>
                        :
                        this.state.title
                    }
                </h1>
                <div className="row">
                    {/*Left-hand side: Opportunity Details*/}
                    <div className="col-md-5">
                        <h3>Opportunity Details
                        {this.state.isCreator ?
                            <div style={{display: 'inline-block'}}>
                                {this.state.isEditing ?
                                    (<button onClick={() => this.save()} className="btn btn-success mx-2"><i
                                        className="fas fa-check"></i></button>)
                                    :
                                    (<button onClick={() => this.edit()} className="btn btn-primary mx-2"><i className="fas fa-edit"></i>
                                    </button>)
                                }
                                <button onClick={() => this.deleteOpportunity()} className="btn btn-danger ">
                                    <i className="fas fa-trash-alt"></i>
                                </button>
                            </div>
                            : ''}
                            </h3>
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
                                        placeholder={'Address'}
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
                                <Link to={`/users/${this.state.creator.id}`}>
                                    {this.state.creator.userDetails.displayName}
                                </Link> &nbsp;
                                {this.props.loggedInUser ?
                                    <Link
                                        className={"fas fa-envelope"}
                                        to={{
                                            pathname: '/inbox',
                                            state: {
                                                userId: this.state.creator.id,
                                                displayName: this.state.creator.userDetails.displayName
                                            }
                                        }}/>
                                    : ''
                                }
                            </li>
                        </ul>
                        <h3>Interested Users</h3>
                        <div>
                            <ul>
                                {this.createInterestedList()}
                            </ul>
                        </div>
                        {!this.state.isCreator && this.props.loggedInUser ?
                            <div>
                                {this.state.interestedIn ?
                                    (<button onClick={() => this.notInterestedIn()} className="btn btn-secondary">Not
                                                                                                                  Interested</button>)
                                    :
                                    (<button onClick={() => this.interestedIn()} className="btn btn-info">I'm
                                                                                                          Interested</button>)
                                }
                            </div> : ''
                        }
                    </div>
                    {/*Right-hand side: Opportunity Description*/}
                    <div className="col-md-7">
                        <h3>Opportunity Description</h3>
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
                        {this.state.isCreator ?
                            <div>
                                <ReactFilestack
                                    apikey={'APm2qa235SOK43uLAvFPTz'}
                                    componentDisplayMode={{
                                        type: 'button',
                                        customText: 'Add an Image'  ,
                                        customClass: 'btn btn-primary mt-4'
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
                            : ''}
                    </div>
                </div>
            </div>
        )
    }
}

export default OpportunityPage;