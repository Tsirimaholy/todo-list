import React, {FC, useState} from "react";
import {TTask} from "./todo-list";

type TTodoForm = {
    onSubmit: (task: TTask) => void
}
export const TodoForm: FC<TTodoForm> = (props) => {
    const [currentTask, setCurrentTask] = useState<TTask>({name: "", done: false});
    const handleAdd = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key !== 'Enter' && currentTask.name.length > 0) return
        props.onSubmit(currentTask);
        // reset the current task value
        setCurrentTask({name: "", done: false})
    }

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        setCurrentTask({...currentTask, name: e.target.value})
    }


    return (
        <div className="todo_list__form">
            <input
                type="text"
                onKeyDown={handleAdd}
                onChange={handleChange}
                value={currentTask.name}
            />
        </div>
    );
};