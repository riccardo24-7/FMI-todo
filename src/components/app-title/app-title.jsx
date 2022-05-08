import { useState } from 'react';

import Modal from '../modal/modal';
import GetDate from './date';

import './app-title.css'

const AppTitle = ({prname, onUpdateProjectName, onCheckProjects}) => {

    const onOpen = () => setModal(true)
    const onSubmit = () => onUpdateProjectName(inputValue)

    const [isModal, setModal] = useState(false); 

    let inputValue = prname;

    return (
        <div className="app-title">
                <div className="project-title">
                    <h1 className='h1-title'>Проект:</h1>
                </div>
                <div className="project-name">
                    <h1 className='h1-prname' key={prname}>{prname}</h1>
                </div>
                <div className="time-title">
                    <h1>{<GetDate/>}</h1>
                </div>
                <div className="auth-btn">
                    <button 
                    className="btn btn-outline-secondary title-btn"
                    onClick={onOpen}>Настройки</button>
                    <Modal active = {isModal} setActive = {setModal}>
                        <h2>Проект - "{prname}"</h2>
                        <input type="text" 
                        placeholder = 'Название проекта'
                        className='new-title' 
                        onChange={(e) => 
                            (e.target.value.trim() !== '' ? inputValue = e.target.value: inputValue = prname)}>
                            </input>
                        <button className = 'btn btn-outline-secondary title-btn-submit' onClick={onSubmit}>Принять</button>
                    </Modal>    
                    <button className="btn btn-outline-secondary title-btn" onClick={onCheckProjects}>Войти</button>
                </div>
        </div>
    )
}

export default AppTitle;