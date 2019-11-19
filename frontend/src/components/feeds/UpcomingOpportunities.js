import React from 'react';
import axios from "axios";
import {buildCards, buildList} from "../../Functions";

class UpcomingOpportunities extends React.Component {

    state = {
        view: this.props.view,
        opportunities: []
    };

    static getDerivedStateFromProps(props, state) {
        if (props.view !== state.view) {
            return {
                view: props.view
            }
        }
        return null;
    }

    componentDidMount() {
        axios.get('/api/opportunities/upcoming')
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

export default UpcomingOpportunities;