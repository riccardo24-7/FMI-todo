import {Component} from "react";
import axios from "axios";
// import { Route } from "react-router-dom";

import AppTitle from "../components/app-title/app-title";
import AppInfo from "../components/app-info/app-info";
import AppSearch from "../components/app-search/app-search";
import AppFilter from "../components/app-filter/app-filter";
import TaskList from "../components/task-list/task-list";
import AppNewTask from "../components/app-newtask/app-newtask";

import './app.css';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            data: [],
        // {"id": 4, "projectID":2, "name": "Верстка сайта", "increase": false},
        // {"id": 5, "projectID":2, "name": "Изучение React JS", "increase": true},
        // {"id": 6, "projectID":3, "name": "PostgreSQL", "increase": false}
            term: '',
            filter: "all",
            projectname: '',
        }
    }

    componentDidMount() {
        
        axios.get("http://localhost:3001/projects").then(({data}) => this.setState({projectname: data[0].name}))
        axios.get("http://localhost:3001/tasks?_embed=project").then(({data}) => this.setState({data: data}))
        axios.get("http://localhost:3001/filters").then(({data}) => this.setState({filter: data}))

      }

    
    deleteItem = (id) => {
        this.setState(({data}) => {
            return {
                data: data.filter(item => item.id !== id)
            }

        })
    }

    addItem = (taskID, name) => {
        const newItem = {
            id: taskID,
            projectID: 1,
            name,
            desc: "",
            increase: false
        }

        this.setState(({data}) => {
            const newArr = [...data, newItem];
            return {
                data: newArr
            }
        })

    }

    onToggleIncrease = (id) => {

        this.setState(({data}) => ({
            data: data.map(item => {
                if (item.id === id) {
                    axios.patch("http://localhost:3001/tasks/" + id, {
                        increase: !item.increase
                    }).catch(()=>{alert("Не удалось обновить состояние задачи")})
                    return {...item, increase: !item.increase}
                }
                return item;
            })
        }))

    }

    searchTask = (items, term) => {
        if (term.length === 0) {
            return items;
        } 

        return items.filter(item => {
            return item.name.indexOf(term) > -1
        })
    }

    onUpdateSearch = (term) => {
        this.setState({term});
    }

    filterPost = (items, filter) => {
        switch (filter) {
            case 'complete':
                return items.filter(item => item.increase === true);
            case 'uncomplete':
                return items.filter(item => item.increase === false);
            default:
                return items
        }
    }

    onFilterSelect = (filter) => {
        this.setState({filter});
    }

    onUpdateProjectName = (projectname) => {
        axios.patch("http://localhost:3001/projects/" + 1, {
            name: projectname
        }).catch(()=>{alert("Не удалось обновить название проекта")})
        this.setState({projectname});
    }

    onUpdateTaskName = (id, newtaskName, desc) => {

        this.setState(({data}) => ({
            data: data.map(item => {
                if (item.id === id) {
                    if (item.name !== newtaskName) {
                        axios.patch("http://localhost:3001/tasks/" + id, {
                            name: newtaskName
                        }).catch(()=>{alert("Не удалось обновить название задачи")})
                        item.name = newtaskName;
                    }
                    if (item.desc !== desc) {
                        axios.patch("http://localhost:3001/tasks/" + id, {
                            desc: desc
                        }).catch(()=>{alert("Не удалось обновить описание задачи")})
                        item.desc = desc;
                    }
                }
                return item;
            })
        }))
    }

    render() {

        const {data, term, filter, projectname} = this.state;

        const visibleData = this.filterPost(this.searchTask(data, term), filter);
        return (
            <div className = "app">
                <AppTitle
                prname = {projectname} 
                onUpdateProjectName = {this.onUpdateProjectName}
                onCheckProjects = {this.projectData}/>
                <div className = "container">
                    <div className = "row align-items-start">
                        <div className = "col app__info">
                            <AppInfo/>
                        </div>
                        <div className = "col app__input">
                            <div className = "container">
                                <div className = "row align-items-start">
                                    <div className = "col app__newtask">
                                        <AppNewTask
                                        onAdd = {this.addItem}/>
                                    </div>
                                    <div className = "col app__search">
                                        <AppSearch
                                        onUpdateSearch = {this.onUpdateSearch}/>
                                    </div>
                                    <div className = "col app__filter">
                                        <AppFilter filter = {filter}
                                        onFilterSelect = {this.onFilterSelect}/>
                                    </div>
                                </div>
                            </div>                                                        
                        </div>
                        <div className="app__tasks">
                            {/* <Route exact path="/"> */}
                                <TaskList 
                                data = {visibleData}
                                onDelete = {this.deleteItem}
                                onToggleIncrease = {this.onToggleIncrease}
                                onUpdateTaskName = {this.onUpdateTaskName}
                                />
                            {/* </Route> */}

                        </div>
                        
                        
                    </div>
                    
                </div>
                
            </div>
        )
    } 
}

export default App;
