import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from '@testing-library/user-event'
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store/store";

import AskQuestionModal from "./components/User/AskQuestionModal";

const Modal = (props) => {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <AskQuestionModal onSubmit = {props.onSubmit}/>
      </Provider>
    </BrowserRouter>
  );
};

test("Question Field Existance test", () => {
  render(<Modal/>);
  const qstnEl = screen.getByTestId('question');
  expect(qstnEl).toBeInTheDocument();
});

test("Tag field existance test", () => {
  render(<Modal/>);
  const tagEl = screen.getByTestId('tags');
  expect(tagEl).toBeInTheDocument();
})

test("Link field existance test", () => {
  render(<Modal/>);
  const linkEl = screen.getByTestId('link');
  expect(linkEl).toBeInTheDocument();
})

test("Details field existance test", () => {
  render(<Modal/>);
  const detailEl = screen.getByTestId('details');
  expect(detailEl).toBeInTheDocument();
})

test("Question Field input test", () => {
  render(<Modal/>);
  const qstnEl = screen.getByTestId('question');
  userEvent.type(qstnEl, "Give examples of NoSQL Databases");
  expect(qstnEl).toHaveValue("Give examples of NoSQL Databases");
});

test("Tag field input test", () => {
  render(<Modal/>);
  const tagEl = screen.getByTestId('tags');
  userEvent.type(tagEl, "Database");
  expect(tagEl).toHaveValue("Database");
})

test("Link field input test", () => {
  render(<Modal/>);
  const linkEl = screen.getByTestId('link');
  userEvent.type(linkEl, "www.google.com");
  expect(linkEl).toHaveValue("www.google.com");
})

test("Details field input test", () => {
  render(<Modal/>);
  const detailEl = screen.getByTestId('details');
  userEvent.type(detailEl, "Examples of NoSQL")
  expect(detailEl).toHaveValue("Examples of NoSQL");
})

it("submits", () => {
  const onSubmit = jest.fn();
  render(<Modal onSubmit = {onSubmit}/>)
  const form = screen.getByTestId("form")
  fireEvent.submit(form);
  expect(onSubmit).toHaveBeenCalled();
});