import Popup from "./Popup.js";

class PopupWithForm extends Popup {
    constructor({ popupSelector, handleFormSubmit}) {
        super({ popupSelector: popupSelector });
        this._popupForm = this._popupElement.querySelector(".popup__form");
        this._handleFormSubmit = handleFormSubmit;
        this._getInputValues = this._getInputValues.bind(this);
    }

    _getInputValues() {
        this._inputList = this._popupForm.querySelectorAll(".popup__input");
        const inputValues= {};
        this._inputList.forEach((input) => {
            inputValues[input.name] = input.value;
        })
        return inputValues;
    }

    setEventListeners() {
        super.setEventListeners();
        this._popupElement.addEventListener("submit", (evt) => {
            evt.preventDefault();
            const inputValues = this._getInputValues();
            this._handleFormSubmit(inputValues);
        });
    }
}

export default PopupWithForm;