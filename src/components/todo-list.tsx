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
    hideTodoForm?: boolean
    onInsert?: (task: TTask) => void
    onDone?: (task: TTask) => void
}

const TodoList: FC<TTodoList> = ({taskList, onInsert, onDone, hideTodoForm = false}) => {
    return (
        <div className="task_list__container">
            <TodoForm onSubmit={task => onInsert && onInsert(task)} visible={!hideTodoForm}/>
            <ul className="task_list">
                {taskList.map((task, index) =>
                    task.name && (
                        <li className="todo_list__item" key={index}>
                            <TodoItem onClick={() => onDone && onDone(task)} task={task}/>
                        </li>
                    ))}
            </ul>
        </div>
    );
};


export default TodoList;