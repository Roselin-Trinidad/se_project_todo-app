import { v4 as uuidv4 } from 'https://jspm.dev/uuid';

import { initialTodos, validationConfig } from "../utils/constant.js";
import Todo from "../components/todo.js";
import FormValidatior from "../components/FormValidator.js";
import Section from '../components/Section.js';
import PopupWithForm from '../components/PopupWithForm.js';
import TodoCounter from '../components/TodoCounter.js';

const addTodoButton = document.querySelector(".button_action_add");
const addTodoPopupElement = document.querySelector("#add-todo-popup");
const addTodoForm = document.forms["add-todo-form"];
const addTodoCloseBtn = addTodoPopupElement.querySelector(".popup__close");
const todoTemplate = document.querySelector("#todo-template");
const todosList = document.querySelector(".todos__list");

function handleCheck(completed){
  todoCounter.updateCompleted(completed);
}

function handleDelete(completed) {
  if (completed) { 
  todoCounter.updateCompleted(false);
  }
  todoCounter.updateTotal(false);
}

const todoCounter = new TodoCounter(initialTodos,".counter__text");

const generateTodo = (data) => {
  const todo = new Todo(data, "#todo-template", handleCheck, handleDelete);
  const todoElement = todo.getView();
  return todoElement;
};

addTodoButton.addEventListener("click", () => {
  addTodoPopup.open();
});

const newTodoValidator = new FormValidatior(validationConfig, addTodoForm);
newTodoValidator.enableValidation();

const renderTodo = (item) => {
  const todo = generateTodo(item);
  todoSection.addItem(todo);
};

const todoSection = new Section({ 
  items: initialTodos, 
  renderer: renderTodo,
  containerSelector: '.todos__list'
});

todoSection.renderItems();

const addTodoPopup = new PopupWithForm({ 
  popupSelector: "#add-todo-popup", 
  handleFormSubmit: (inputValues) => {
    const name = inputValues.name;
    const dateInput = inputValues.date;
  
    // Create a date object and adjust for timezone
    const date = new Date(dateInput);
    date.setMinutes(date.getMinutes() + date.getTimezoneOffset());
    const id = uuidv4();
    const values = { name, date, id };
    renderTodo(values);
    addTodoPopup.close();
    todoCounter.updateTotal(true);
    newTodoValidator.resetValidation();
  }
});

addTodoPopup.setEventListeners();