import TaskListItem from "../task-list-item/task-list-item";
import { JSON_API } from "../../helpers/Constants";

const TaskList = ({data, onDelete, onToggleIncrease, onUpdateTaskName}) => {

    const elements = data.map(item => {
        const {id,  ...itemProps} = item;
        return (
            <TaskListItem 
            key = {id} 
            {...itemProps}
            idTask = {id}
            onDelete = {() => fetch(`${JSON_API}/tasks/` + id, { method: 'DELETE' }).then(()=>{
                onDelete(id)
            })}
            onToggleIncrease = {() => onToggleIncrease(id)}
            onUpdateTaskName = {onUpdateTaskName}
            />
        )
    })

    return (
        <div className="task-list">
            {elements} 
        </div>
         
    )
}

export default TaskList;