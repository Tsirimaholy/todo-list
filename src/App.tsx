import React, {useState} from 'react';
import TodoList, {TTask} from './components/todo-list';
import "./components/todo-app.css"

function App() {
    const [tasks, setTasks] = useState<TTask[]>([]);
    const handleTaskDone = (task: TTask) => {
        const index = tasks.lastIndexOf(task);
        const modifiedTask = tasks[index];
        modifiedTask.done = true;

        const taskListCopy = [...tasks];
        taskListCopy[index] = modifiedTask;
        setTasks(taskListCopy);
    }
    const handleInsertTask = (task: TTask) => {
        setTasks([task, ...tasks]);
    };


    return (
        <main className="container">
            <div className="todo">
                <h1>Todo</h1>
                <TodoList
                    taskList={tasks.filter(task => !task.done)}
                    onInsert={handleInsertTask}
                    onDone={handleTaskDone}/>
            </div>

            <div className="todo">
                <h1>Done</h1>
                <TodoList
                    taskList={tasks.filter(task => task.done)}
                    hideTodoForm={true}
                />
            </div>
        </main>
    );
}

export default App;
