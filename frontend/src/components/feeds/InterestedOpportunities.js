import React from 'react';
import axios from "axios";
import {buildCards, buildList, displaySpinner} from "../common/Functions";

class InterestedOpportunities extends React.Component {

    state = {
        view: this.props.view,
        search: this.props.search,
        filter: this.props.filter.slice(),
        opportunities: [],
        filteredOpportunities: [],
        isLoading: false
    };

    static getDerivedStateFromProps(props, state) {
        if (props.view !== state.view) {
            return {
                view: props.view
            }
        }
        if (props.search !== state.search) {
            return {
                search: props.search
            }
        }
        if (props.filter !== state.filter) {
            return {
                filter: props.filter.slice()
            }
        }
        return null;
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.state.search !== prevState.search || this.state.filter.length !== prevState.filter.length) {
            let newFilter = this.filterOpportunities(this.state.opportunities);

            this.setState({
                filteredOpportunities: newFilter
            })
        }
    }

    filterOpportunities = (opportunities) => {
        return opportunities.filter((element) => {
            if (this.state.filter.length > 0) {
                return this.state.filter.indexOf(element.language.language) !== -1 && (element.title.toLowerCase().includes(this.state.search) || element.body.toLowerCase().includes(this.state.search))
            } else {
                return element.title.toLowerCase().includes(this.state.search) || element.body.toLowerCase().includes(this.state.search)
            }
        })
    };

    componentDidMount() {
        axios.get(`/api/users/${this.props.loggedInUser.id}/interestedin`)
            .then(res => {
                this.setState({
                    opportunities: res.data,
                    filteredOpportunities: this.filterOpportunities(res.data),
                    isLoading: false
                })
            });
    }

    render() {
        if (this.state.isLoading) {
            return displaySpinner()
        }

        if (this.state.view === 'list') {
            return buildList(this.state.filteredOpportunities)
        } else {
            return buildCards(this.state.filteredOpportunities)
        }
    }
}

export default InterestedOpportunities;