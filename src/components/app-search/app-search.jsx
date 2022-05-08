import { Component } from 'react';

import './app-search.css'

class AppSearch extends Component {
    constructor(props){
        super(props);
        this.state = {
            term: ''
        }
    }

    onUpdateSearch = (e) => {
        const term = e.target.value;
        this.setState({term});
        this.props.onUpdateSearch(term);
    }
    render() {
        return (
            <div className = "form-search">
                <input className = "input-search" value = {this.state.term} onChange = {this.onUpdateSearch} placeholder="Поиск по задачам"/>
                <button type="submit" className = "btn-search"><i className = "fa fa-search" aria-hidden = "true"></i></button>
            </div>
        )
    }

}

export default AppSearch;