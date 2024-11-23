class Todo {
    constructor(data, selector, handleCheck, handleDelete) {
        this._data = data;
        this._templateElement = document.querySelector(selector);
        this._handleCheck = handleCheck;
        this._handleDelete = handleDelete;
        this._completed = data.completed;
        
    }

    _setEventListeners() {
       this._todoCheckboxEl.addEventListener("change", () => {
           this._toggleCompletion();
           this._handleCheck(this._completed);
        })
       this._todoDeleteBtn.addEventListener("click", () => {
            this._handleDelete(this._completed);
            this._todoElement.remove();
        });
    }

    _generateDateEl() {
        this._todoDate = this._todoElement.querySelector(".todo__date");
        this._dueDate = new Date(this._data.date);
        
        if (!isNaN(this._dueDate)) {
           this._todoDate.textContent = `Due: ${this._dueDate.toLocaleString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
           })}`;
        }
    }

    _generateCheckboxEl() {
        this._todoCheckboxEl = this._todoElement.querySelector(".todo__completed");
        this._todoLabel = this._todoElement.querySelector(".todo__label");
        
        this._todoNameEl.textContent = this._data.name;
        this._todoCheckboxEl.checked = this._data.completed;

        this._todoCheckboxEl.id = `todo-${this._data.id}`;
        this._todoLabel.setAttribute("for", `todo-${this._data.id}`);

    }

    _toggleCompletion() {
        this._completed = !this._completed;
    }

    _removeTodo() {
        this._todoElement.romove();
        
    }
    
    getView() {
        this._todoElement = this._templateElement.content
            .querySelector(".todo")
            .cloneNode(true);
        this._todoNameEl = this._todoElement.querySelector(".todo__name");
        
        
        this._todoDeleteBtn = this._todoElement.querySelector(".todo__delete-btn");
        this._generateCheckboxEl();
        this._generateDateEl();
        this._setEventListeners();
        
        return this._todoElement;
    }
}

export default Todo