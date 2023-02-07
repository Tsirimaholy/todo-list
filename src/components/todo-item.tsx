import React from "react";
import {TTask} from "./todo-list";

type TodoItemProps = { isDone?: boolean, onClick: () => void, task: TTask };
export const TodoItem = (props: TodoItemProps) => {
    const {isDone = false, onClick, task} = props;


    return (<>
        {!isDone && <input type={"checkbox"} onClick={onClick}/>}
        <span>{task.name}</span>
    </>)
};