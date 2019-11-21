import React from 'react';
import axios from "axios";
import {buildCards, buildList} from "../../Functions";

class InterestedOpportunities extends React.Component {

    state = {
        view: this.props.view,
        search: this.props.search,
        opportunities: [],
        filteredOpportunities: []
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
        return null;
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevState.search !== this.state.search) {
            if (prevState.search !== this.state.search) {
                this.setState({
                    filteredOpportunities: this.state.opportunities.filter((element) => element.title.includes(this.state.search) || element.body.includes(this.state.search))
                })
            }
        }
    }

    componentDidMount() {
        // Hard-coded userId of 19; replace with userId of logged-in user
        axios.get('/api/users/19/interestedin')
            .then(res => this.setState({
                opportunities: res.data,
                filteredOpportunities: res.data
            }));
    }

    render() {
        if (this.state.view === 'list') {
            return buildList(this.state.filteredOpportunities)
        } else {
            return buildCards(this.state.filteredOpportunities)
        }
    }
}

export default InterestedOpportunities;