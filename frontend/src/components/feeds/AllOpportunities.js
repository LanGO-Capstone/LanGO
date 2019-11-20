import React from 'react';
import axios from "axios";
import {buildCards, buildList} from "../../Functions";

class AllOpportunities extends React.Component {

    state = {
        view: this.props.view,
        search: this.props.search,
        opportunities: []
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
        if (prevState.search !== this.state.search){
            let queryString = `?search=${this.state.search}`;

            axios.get('/api/opportunities' + queryString)
                .then(res => this.setState({opportunities: res.data}));
        }
    }

    componentDidMount() {
        let queryString = `?search=${this.state.search}`;

        axios.get('/api/opportunities' + queryString)
            .then(res => this.setState({opportunities: res.data}));
    }


    render() {
        if (this.state.view === 'list') {
            return buildList(this.state.opportunities)
        } else {
            return buildCards(this.state.opportunities)
        }
    }
}

export default AllOpportunities;