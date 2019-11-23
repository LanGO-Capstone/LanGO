import React from 'react';
import axios from "axios";

class SearchAndFilterOptions extends React.Component {

    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);

        this.state = {
            search: '',
            view: 'list',
            languages: [],
            languageFilter: [],
            isLoading: true
        }
    }

    handleChange = event => {
        this.setState({search: event.target.value}, () => {
            this.props.searchCallback(this.state.search)
        });
    };

    changeView = option => {
        this.setState({view: option}, () => {
            this.props.viewCallback(this.state.view)
        })
    };

    changeFilter = (element) => {
        let newFilter = this.state.languageFilter;

        if (this.state.languageFilter.indexOf(element.language) === -1) {
            newFilter.push(element.language);
        } else {
            let index = this.state.languageFilter.indexOf(element.language);
            newFilter.splice(index, 1);
        }

        this.setState({
            languageFilter: newFilter
        }, () => {
            this.props.filterCallback(this.state.languageFilter)
        })
    };

    componentDidMount() {
        axios.get('/api/languages')
            .then(res => this.setState({
                languages: res.data,
                isLoading: false
            }))
    }

    render() {
        let languagesList = this.state.languages.map((element) => {
            return (<div className={'form-check'} key={element.id}>
                <input
                    onChange={() => {
                        this.changeFilter(element)
                    }}
                    className={'form-check-input'}
                    type="checkbox"
                    value={element.language}
                    name={element.language}
                    id={element.language}/>
                <label htmlFor={element.language}>{element.language}</label>
            </div>)
        });

        return (
            <div className="card mt-2">
                <div className="card-header text-center">
                    <p className="h5 mb-0">Options</p>
                </div>
                <div className="card-body">
                    <form
                        onSubmit={e => {
                            e.preventDefault()
                        }}
                        className="mb-0">
                        <div className="form-group">
                            <input
                                name="search"
                                type="text"
                                className="form-control"
                                id="searchBox"
                                value={this.state.search}
                                onChange={this.handleChange}
                                placeholder="Search"/>
                        </div>
                        <div className="form-group">
                            <p className="h5">View</p>
                            <div className="form-check">
                                <label>
                                    <input
                                        className={'form-check-input'}
                                        onChange={() => this.changeView('list')}
                                        checked={this.state.view === 'list'}
                                        type="radio"
                                        value={'list'}
                                        id={"list"}
                                        name="view"/> List
                                </label>
                            </div>
                            <div className="form-check">
                                <label>
                                    <input
                                        className={'form-check-input'}
                                        onChange={() => this.changeView('card')}
                                        checked={this.state.view === 'card'}
                                        type="radio"
                                        value={'card'}
                                        id={"card"}
                                        name="view"/> Card
                                </label>
                            </div>
                        </div>
                        <div className="form-group">
                            <p className="h5">Filter By Language</p>
                            {languagesList}
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}

export default SearchAndFilterOptions;