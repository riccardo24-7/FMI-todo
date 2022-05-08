import { useEffect } from "react";

import './modal.css'
    
const Modal = ({active, setActive, children}) => {

    const onClose = () => setActive(false)

    const keydownHandler = ({ key }) => {
      switch (key) {
        case 'Escape':
          onClose();
          break;
        default:
      }
    };
  
    useEffect(() => {
      document.addEventListener('keydown', keydownHandler);
      return () => document.removeEventListener('keydown', keydownHandler);
    });

    return !active ? null : (
      <div className={active ? "modal active" : "modal"} onClick={onClose}>
        <div className={active ? "modal-content active" : "modal-content"} onClick={e => e.stopPropagation()}>
            {children}
            <button className = 'btn btn-outline-secondary modal-btn' onClick={onClose}>Закрыть</button>
        </div>
      </div>
    )
  }

  export default Modal