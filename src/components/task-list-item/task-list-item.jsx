import { useState } from 'react';


import Modal from '../modal/modal';

import './task-list-item.css'

const TaskListItem = (props) => {

        const {name, desc, id, idTask, increase, onDelete, onToggleIncrease, onUpdateTaskName} = props;

        const [isModal, setModal] = useState(false);

        const onClose = () => setModal(true);
        const onSubmit = () => onUpdateTaskName(idTask, newTaskValue, newDescValue);

        let newTaskValue = name;
        let newDescValue = desc;
        

        return (
            <div className="task-field">
                <div className="title-task">
                    <input 
                        className="form-check-input mt-1" 
                        type="checkbox" 
                        checked = {increase}
                        onChange = {onToggleIncrease} 
                        value="" 
                        id={id} 
                        name = 'task-checkbox'></input>
                    <span className = 'span-task' htmlFor={id} onClick={onClose}>{name}</span>
                    <Modal active = {isModal} setActive = {setModal}>
                        <h2>Задача - {name}</h2>
                        <input type="text" 
                        placeholder = 'Название задачи'
                        className='update-task'
                        id={id}
                        onChange={(e) => (e.target.value.trim() !== '' ? newTaskValue = e.target.value: newTaskValue = name)}>                        
                            </input>
                        <h4>Описание - {desc}</h4>
                        <input type="text" 
                        placeholder = 'Описание задачи'
                        className='update-task'
                        id={id}
                        onChange={(e) => (e.target.value.trim() !== '' ? newDescValue = e.target.value: newDescValue = desc)}>                        
                            </input>
                        <button className = 'btn btn-outline-secondary task-btn-submit' onClick={onSubmit}>Принять</button>
                    </Modal>  
                </div>
                <div className="delete-task">
                    <button className="btn btn-trash" onClick={onDelete}><i className = "fa fa-trash" aria-hidden = "true"></i></button>
                </div>
            </div>

        )
        }

export default TaskListItem;
