import { v4 as uuidv4 } from 'https://jspm.dev/uuid';

import { initialTodos, validationConfig } from "../utils/constant.js";
import Todo from "../components/todo.js";
import FormValidatior from "../components/FormValidator.js";
import Section from '../components/Section.js';
import PopupWithForm from '../components/PopupWithForm.js';

const addTodoButton = document.querySelector(".button_action_add");
const addTodoPopupElement = document.querySelector("#add-todo-popup");
const addTodoForm = addTodoPopupElement.querySelector(".popup__form");
const addTodoCloseBtn = addTodoPopupElement.querySelector(".popup__close");
const todoTemplate = document.querySelector("#todo-template");
const todosList = document.querySelector(".todos__list");


const generateTodo = (data) => {
  const todo = new Todo(data, "#todo-template");
  const todoElement = todo.getView();
  return todoElement;
};

addTodoButton.addEventListener("click", () => {
  addTodoPopup.open();
});


addTodoForm.addEventListener("submit", (evt) => {
  evt.preventDefault();
  const name = evt.target.name.value;
  const dateInput = evt.target.date.value;

  // Create a date object and adjust for timezone
  const date = new Date(dateInput);
  date.setMinutes(date.getMinutes() + date.getTimezoneOffset());

  const id = uuidv4();
  const values = { name, date, id };
  const todo = generateTodo(values);
  todoSection.addItem(todo);
  addTodoPopup.close();
  newTodoValidator.resetValidation();
});

const newTodoValidator = new FormValidatior(validationConfig, addTodoForm);
newTodoValidator.enableValidation();

const todoSection = new Section({ 
  items: initialTodos, 
  renderer: (item) => {
    const todo = generateTodo(item);
    todoSection.addItem(todo);
  }, 
  containerSelector: '.todos__list'
});

todoSection.renderItems();

const addTodoPopup = new PopupWithForm({ 
  popupSelector: "#add-todo-popup", 
  handleFormSubmit: () => {}
});

addTodoPopup.setEventListeners();