import React, {FC, useState} from "react";
import {TTask} from "./todo-list";

type TTodoForm = {
    onSubmit: (task: TTask) => void;
    defaultValue?: string;
}
export const TodoForm: FC<TTodoForm> = ({onSubmit, defaultValue}): React.ReactElement => {
    const [currentTask, setCurrentTask] = useState<TTask>({name: defaultValue || "", done: false});
    const handleAdd = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key !== 'Enter' && currentTask.name.length > 0) return
        onSubmit(currentTask);
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
                placeholder="todo-input"
                onKeyDown={handleAdd}
                onChange={handleChange}
                value={currentTask.name}
            />
        </div>
    );
};