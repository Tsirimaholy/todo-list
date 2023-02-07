import React from "react";
import TestRenderer from "react-test-renderer";
import {TodoForm} from "../components/todo-form";
import {cleanup, fireEvent, render, screen} from "@testing-library/react";

afterEach(() => {
    cleanup();
})

describe("Todo form component", () => {
    it('should renders correctly', () => {
        let json = TestRenderer
            .create(<TodoForm onSubmit={jest.fn()}/>)
            .toJSON();
        expect(json).toMatchSnapshot()
    });

    it('should contain the default value provided', function () {
        const DEFAULT_VALUE = "some value";
        render(<TodoForm onSubmit={jest.fn()} defaultValue={DEFAULT_VALUE}/>);
        let input = screen.getAllByRole("textbox")[0] as HTMLInputElement;

        expect(input.value).toEqual(DEFAULT_VALUE);
    });

    it('should call the function that handle keydown', function () {
        const DEFAULT_VALUE = "some value";
        const handleKeyEnterPressedMock = jest.fn();
        render(<TodoForm onSubmit={handleKeyEnterPressedMock} defaultValue={DEFAULT_VALUE}/>);
        const input = screen.getAllByRole("textbox")[0] as HTMLInputElement;

        fireEvent.keyDown(input, {key: "Enter"})
        expect(handleKeyEnterPressedMock).toHaveBeenCalled();
    })


    it('should clean up the input value after enter key pressed', function () {
        const handleKeyEnterPressedMock = jest.fn();
        const testValue = "some value";
        render(<TodoForm onSubmit={handleKeyEnterPressedMock} defaultValue={testValue}/>);
        const input = screen.getAllByRole("textbox")[0] as HTMLInputElement;
        expect(input.value).toBeTruthy();

        fireEvent.keyDown(input, {key: "Enter"});
        expect(input.value).toEqual("");
    });


    it('should contain the user input', function () {
        const handleKeyEnterPressedMock = jest.fn();
        const testValue = 'hello';
        render(<TodoForm onSubmit={handleKeyEnterPressedMock}/>);
        const input = screen.getByPlaceholderText("todo-input") as HTMLInputElement;

        fireEvent.change(input, {target: {value: testValue}})
    });

    it('should be hidden', function () {
        const handleKeyEnterPressedMock = jest.fn();

        const {container: {childElementCount}} = render(<TodoForm onSubmit={handleKeyEnterPressedMock}
                                                                  visible={false}/>);
        expect(childElementCount).toBeFalsy();
    });
})
