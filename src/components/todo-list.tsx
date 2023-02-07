import React, {FC} from 'react';
import {TodoForm} from "./todo-form";
import "./todo-list.css"
import {TodoItem} from "./todo-item";

export type TTask = {
    name: string;
    done: boolean
}


type TTodoList = {
    taskList: TTask[];
    isDoneList?: boolean
    onInsert?: (task: TTask) => void
    onDone?: (task: TTask) => void
}

const TodoList: FC<TTodoList> = ({taskList, onInsert, onDone, isDoneList = false}) => {
    return (
        <div className="task_list__container">
            {!isDoneList && <TodoForm onSubmit={task => onInsert && onInsert(task)}/>}
            <ul className="task_list">
                {taskList.map(task =>
                    task.name && (
                        <li className="todo_list__item">
                            <TodoItem isDone={isDoneList} onClick={() => onDone && onDone(task)} task={task}/>
                        </li>
                    ))}
            </ul>
        </div>
    );
};


export default TodoList;