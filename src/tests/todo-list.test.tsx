import React from "react";
import {create} from "react-test-renderer";
import TodoList, {TTask} from "../components/todo-list";
import {cleanup, fireEvent, render, screen} from "@testing-library/react";


afterEach(() => {
    cleanup();
})

describe('todo list component', function () {
    it('should render correctly', function () {
        const renderer = create(<TodoList taskList={[]}/>);
        expect(renderer.toJSON()).toMatchSnapshot();
    });

    it('should contain all provided tasks', function () {
        const TODO_LIST_MOCK: TTask[] = [
            {name: "todo1", done: false},
            {name: "todo2", done: true},
            {name: "todo3", done: true}
        ]

        const EXPECTED_NUMBER_OF_TASKS = 3;

        render(<TodoList taskList={TODO_LIST_MOCK}/>)
        const {children: {length: actualNumbersOfTasks}} = screen.getByRole("list") as HTMLUListElement;
        expect(actualNumbersOfTasks).toEqual(EXPECTED_NUMBER_OF_TASKS);
    });


    it('should call the onInsert func when the "Enter" key is pressed', function () {
        const TODO_LIST_MOCK: TTask[] = [
            {name: "todo1", done: false},
            {name: "todo2", done: true},
            {name: "todo3", done: true}
        ]
        const onInsertMock = jest.fn();

        render(<TodoList taskList={TODO_LIST_MOCK} onInsert={onInsertMock}/>);

        const textInput = screen.getByRole("textbox");

        fireEvent.keyDown(textInput, {key: "Enter"});
        expect(onInsertMock).toHaveBeenCalled();
    });

    it('should call the onDone func when the checkbox is clicked', function () {
        const TODO_LIST_MOCK: TTask[] = [
            {name: "todo1", done: false},
        ]
        const onDoneMock = jest.fn();

        render(<TodoList taskList={TODO_LIST_MOCK} onDone={onDoneMock}/>);


        const firstTodoCheckBox = screen.getAllByRole("checkbox")[0];
        fireEvent.click(firstTodoCheckBox);

        expect(onDoneMock).toHaveBeenCalled();
    });
});