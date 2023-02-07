import {create} from "react-test-renderer";
import {TodoItem} from "../components/todo-item";
import React from "react";
import {TTask} from "../components/todo-list";
import {cleanup, render, screen} from "@testing-library/react";

afterEach(() => {
    cleanup();
})


describe('Todo Item', () => {
    it('should renders correctly', function () {
        const onCLickMock = jest.fn();
        const taskMock: TTask = {
            name: "some task",
            done: false
        };

        const renderer = create(<TodoItem onClick={onCLickMock} task={taskMock}/>);
        const toJSON = renderer.toJSON();
        expect(toJSON).toMatchSnapshot();
    });


    it('should display the provided task name', function () {
        const onCLickMock = jest.fn();
        const taskMock: TTask = {
            name: "some task",
            done: false
        };

        render(<TodoItem onClick={onCLickMock} task={taskMock}/>);

        const text = screen.getByText("some task");
        expect(text).toBeInTheDocument();
    });

    it('should display display a checkbox of a task that was not done yet', () => {
        const onClickMock = jest.fn();
        const taskMock: TTask = {
            name: "some task",
            done: false
        };

        render(<TodoItem onClick={onClickMock} task={taskMock}/>);

        const checkBox = screen.getByRole("checkbox") as HTMLInputElement;
        expect(checkBox).toBeInTheDocument();
        // the checkbox is not checked
        expect(checkBox.checked).toBeFalsy();
    });

    it('should "not" display display a checkbox on a done task', () => {
        const onClickMock = jest.fn();
        const taskMock: TTask = {
            name: "some task",
            done: true
        };

        render(<TodoItem onClick={onClickMock} task={taskMock}/>);

        const {length} = screen.queryAllByRole("checkbox");
        expect(length).toEqual(0);

        const textWrapper = screen.getByText("some task") as HTMLSpanElement;
        expect(textWrapper).toBeTruthy();
    });
});