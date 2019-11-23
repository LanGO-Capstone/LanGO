import React from 'react';
import axios from "axios";
import {buildCards, buildList, displaySpinner} from "../../Functions";

class InterestedOpportunities extends React.Component {

    state = {
        view: this.props.view,
        search: this.props.search,
        filter: this.props.filter,
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
        if (props.filter !== state.languageFilter) {
            return {
                filter: props.filter.slice()
            }
        }
        return null;
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.state.search !== prevState.search || this.state.filter.length !== prevState.filter.length) {
            this.setState({
                filteredOpportunities: this.state.opportunities.filter((element) => {
                    if (this.state.filter.length > 0) {
                        return this.state.filter.indexOf(element.language.language) !== -1 && (element.title.includes(this.state.search) || element.body.includes(this.state.search))
                    } else {
                        return element.title.includes(this.state.search) || element.body.includes(this.state.search)
                    }
                })
            })
        }
    }

    componentDidMount() {
        // Hard-coded userId of 19; replace with userId of logged-in user
        axios.get('/api/users/13/interestedin')
            .then(res => this.setState({
                opportunities: res.data,
                filteredOpportunities: res.data,
                isLoading: false
            }));
    }

    render() {
        // Necessary to prevent rendering fail on objects/arrays inside of this.state.opportunity
        if (this.state.isLoading) {
            return (
                displaySpinner()
            )
        }

        if (this.state.view === 'list') {
            return buildList(this.state.filteredOpportunities)
        } else {
            return buildCards(this.state.filteredOpportunities)
        }
    }
}

InterestedOpportunities.defaultProps = {
    filter: []
};

export default InterestedOpportunities;