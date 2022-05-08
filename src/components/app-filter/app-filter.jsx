import { useState } from 'react';

import './app-filter.css'

const AppFilter = (props) => {
    const [hide, setVisible] = useState(false);

    // const buttonsData = [
    //     {name: 'all', label: 'Все задачи'},
    //     {name: 'all', label: 'Выполненные'},
    //     {name: 'all', label: 'Невыполненные'},
    //     {name: 'all', label: 'По возрастанию'},
    //     {name: 'all', label: 'По убыванию'}
    // ];

    const buttonsData = [
        {filtername: 'all', label: 'Все задачи'},
        {filtername: 'complete', label: 'Выполненные'},
        {filtername: 'uncomplete', label: 'Невыполненные'},
    ];

    const buttons = buttonsData.map(({filtername, label}) => {
        const active = props.filter === filtername;
        const clazz = active ? 'btn-secondary filter-btn-active' : 'btn-outline-secondary filter-btn';
        return (
                <button className={`btn ${clazz}`} 
                        key = {filtername}
                        onClick = {() => props.onFilterSelect(filtername)}>
                        {label}
                </button>
        )
    })

    return (
        <div className="filter-field">
            
                <div className="col open-filter-buttons">
                    <button className="btn btn-filter" 
                    onClick={() => setVisible((!hide))}>
                        <i className="fa fa-sliders fa-lg" aria-hidden = "true"></i>
                    </button>
                </div>
                {hide &&
                <div className="container">
                    <div className="row justify-content-end">
                        <div className = "col filter-buttons">
                            {buttons}
                        </div>
                    </div>
                </div>}
        </div>  
    )
}

export default AppFilter;