import { Component } from 'react';
import axios from 'axios';

import { JSON_API } from '../../helpers/Constants';

import './app-newtask.css'


class AppNewTask extends Component {
    constructor(props){
        super(props);
        this.state = {
            taskname: '',
            desc: '',
        }
    }

    onValueChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    
    onSubmit = (e) => {
        e.preventDefault();
        if (this.state.taskname.length < 3) return;
        axios.post(`${JSON_API}/tasks`, {
            projectID: 1,
            name: this.state.taskname,
            desc: "",
            increase: false
        }).then(({data}) => {
            this.props.onAdd(data.id, this.state.taskname);
            this.setState({
                taskname: ''
            })
        }).catch((err) => console.log(err))

    }

    render() {
        const {taskname} = this.state
        return (
            <form className = "form-newtask" onClick={this.onSubmit}>
                <input className = "input-newtask" placeholder="Создать задачу" name = 'taskname' value = {taskname} onChange={this.onValueChange}/>
                <button className = "btn-newtask" type="submit"><i className = "fa fa-plus" aria-hidden = "true"></i></button>
            </form>
        )
    }

}

export default AppNewTask;
