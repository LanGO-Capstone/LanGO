import React from 'react';
import axios from 'axios';
import {displaySpinner} from "../common/Functions";
import {Link, Redirect} from "react-router-dom";
import ReactFilestack from 'filestack-react';
import ReactMarkdown from "react-markdown";
import ReactMde from "react-mde";

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
                if (!res.data.eventDate) {
                    this.setState({eventDate: ''})
                }
            })
    }

    createDate = () => {
        if (this.state.eventDate === '') {
            return null;
        } else {
            let date = new Date(this.state.eventDate);
            return (
                <div>
                    <h5 className="card-title">Date </h5>
                    <h6 className="card-subtitle mb-2 text-muted">
                        {Intl.DateTimeFormat('en-US', {dateStyle: 'medium', timeStyle: 'short'}).format(date)}
                    </h6>
                </div>
            );
        }
    };

    createAddress = () => {
        if (this.state.address === null || this.state.address === '') {
            return null
        } else {
            return (
                <div>
                    <h5 className="card-title">Address</h5>
                    <h6 className="card-subtitle mb-2 text-muted">
                        {this.state.address}
                    </h6>
                </div>
            );
        }
    };

    createInterestedList = () => {
        if (this.state.interestedUsers.length === 0) {
            return (
                <h5 className={'card-title text-center text-muted'}>No interested users yet</h5>
            )
        }
        return this.state.interestedUsers.map((element, index) => {
                return (
                    <h6 key={index} className="card-subtitle mb-2">
                        <Link to={`/users/${element.id}`}>{element.userDetails.displayName}</Link>
                        &nbsp;
                        <Link className={"fas fa-envelope"} to={{pathname: '/inbox', state: {userId: element.id, displayName: element.userDetails.displayName}}}/>
                    </h6>)
            }
        )
    };

    createOpportunityImages = () => {
        return this.state.images.map((element, index) => {
            return <div className="removable mt-3" key={index}>
                <img src={element.url} alt="Supplied by user" className="mw-100"
                     id={`img-${element.id}`}/>
                {this.state.isCreator &&
                <a className="deleteIcon" id={element.id}
                   onClick={() => this.deleteImage(element.id)}>
                    <img className="deleteIconSize" src="https://image.flaticon.com/icons/svg/261/261935.svg" alt={''}/>
                </a>}
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
        if (deleteConf) {
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
            `title=${encodeURIComponent(this.state.title)}&address=${encodeURIComponent(this.state.address)}&body=${encodeURIComponent(this.state.body)}&eventDate=${this.state.eventDate}&language=${this.state.language}&creator=${this.state.creator}$interestedUsers=${this.state.interestedUsers}&images=${this.state.images}`)
    };

    handleChange = type => event => {
        this.setState({
            [type]: event.target.value
        })
    };

    handleMDChange = type => event => {
        this.setState({
            [type]: event
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
                            className="form-control form-control-lg"
                            onChange={this.handleChange(`title`)}
                            type={"title"}
                            value={this.state.title}/>
                        :
                        this.state.title
                    }
                </h1>
                <div className="row">

                    {/*Left-hand side: Opportunity Details*/}
                    <div className="col-md-4 text-center">
                        <h3>Details</h3>

                        {/*Language and Creator Card*/}
                        <div className="card mb-3 text-left shadow">
                            <div className="card-body">
                                <h5 className="card-title">Language</h5>
                                <h6 className="card-subtitle mb-2 text-muted">
                                    {this.state.language.language}
                                </h6>

                                <h5 className="card-title">Creator</h5>
                                <h6 className="card-subtitle mb-2 text-muted">
                                    {this.props.loggedInUser && this.props.loggedInUser.id === this.state.creator.id ?
                                        <Link to={'/profile'}>
                                            {this.state.creator.userDetails.displayName}
                                        </Link>
                                        :
                                        <Link to={`/users/${this.state.creator.id}`}>
                                            {this.state.creator.userDetails.displayName}
                                        </Link>
                                    }
                                    &nbsp;
                                    {this.props.loggedInUser && this.props.loggedInUser.id !== this.state.creator.id &&
                                    <Link
                                        className={"fas fa-envelope"}
                                        to={{
                                            pathname: '/inbox',
                                            state: {
                                                userId: this.state.creator.id,
                                                displayName: this.state.creator.userDetails.displayName
                                            }
                                        }}/>
                                    }
                                </h6>
                            </div>
                        </div>

                        {/*Date and Address Card*/}
                        {((this.state.eventDate || this.state.address) || this.state.isEditing) &&
                        <div className="card mb-3 text-left shadow">
                            <div className="card-body">
                                {this.state.isEditing ?
                                    <div className="form-group">
                                        <h5 className={'card-title'} htmlFor="">Date </h5>
                                        <input
                                            className="form-control"
                                            onChange={this.handleChange('eventDate')}
                                            type={"datetime-local"}
                                            value={this.state.eventDate}/>
                                    </div>
                                    :
                                    this.createDate()
                                }
                                {this.state.isEditing ?
                                    <div className="form-group">
                                        <h5 className={'card-title'} htmlFor="">Address</h5>
                                        <input
                                            placeholder={'Address'}
                                            className="form-control"
                                            onChange={this.handleChange('address')}
                                            type={"address"}
                                            value={this.state.address}/>
                                    </div>
                                    :
                                    this.createAddress()
                                }
                            </div>
                        </div>
                        }

                        {/*Edit and Delete Button, creator only*/}
                        {this.state.isCreator &&
                        <div className={'row mb-3'}>
                            <div className="col-6">
                                {this.state.isEditing ?
                                    <button onClick={() => this.save()} className="btn btn-success btn-block mr-2 shadow">
                                        Save
                                    </button>
                                    :
                                    <button onClick={() => this.edit()} className="btn btn-secondary btn-block mr-2 shadow">
                                        Edit Opportunity
                                    </button>
                                }
                            </div>
                            <div className="col-6">

                                <button onClick={() => this.deleteOpportunity()} className="btn btn-danger btn-block shadow">
                                    Delete
                                </button>
                            </div>
                        </div>}

                        {/*Interested List Card*/}
                        {this.state.isCreator &&
                        <div>
                            <h3>Interested Users</h3>
                            <div className={'card text-left shadow mb-5'}>
                                <div className="card-body">
                                    {this.createInterestedList()}
                                </div>
                            </div>
                        </div>
                        }

                        {/*I'm Interested button*/}
                        {!this.state.isCreator && this.props.loggedInUser &&
                        <div>
                            {this.state.interestedIn ?
                                (<button onClick={() => this.notInterestedIn()} className="btn btn-secondary">Not Interested</button>)
                                :
                                (<button onClick={() => this.interestedIn()} className="btn btn-info">I'm Interested</button>)
                            }
                        </div>}
                    </div>

                    {/*Right-hand side: Opportunity Description*/}
                    <div className="col-md-8 text-center">
                        <h3>Description</h3>
                        {this.state.isEditing ?
                            <ReactMde
                                onChange={this.handleMDChange('body')}
                                value={this.state.body}/>
                            :
                            <div className="card text-left shadow">
                                <div className="card-body">
                                    <ReactMarkdown source={this.state.body}/>
                                </div>
                            </div>
                        }

                        {this.createOpportunityImages()}

                        {this.state.isCreator &&
                        <div>
                            <ReactFilestack
                                apikey={'APm2qa235SOK43uLAvFPTz'}
                                componentDisplayMode={{
                                    type: 'button',
                                    customText: 'Add an Image',
                                    customClass: 'btn btn-secondary mt-4'
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
                        }
                    </div>
                </div>
            </div>
        )
    }
}

export default OpportunityPage;