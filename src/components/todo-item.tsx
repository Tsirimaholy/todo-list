import React from "react";
import {TTask} from "./todo-list";

type TodoItemProps = { onClick: () => void, task: TTask };
export const TodoItem = (props: TodoItemProps) => {
    const {onClick, task} = props;


    return (<>
        {!task.done && <input type={"checkbox"} onClick={onClick}/>}
        <span>{task.name}</span>
    </>)
};