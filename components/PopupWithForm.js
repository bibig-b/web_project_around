import Popup from "./Popup.js";
export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector);
    this._formElement = this.getPopupElement().querySelector(".pop-up__form");
    this._inputList = this._formElement.querySelectorAll(".pop-up__input");
    this._handleFormSubmit = handleFormSubmit;
  }

  open() {
    super.open();
    this._formElement.reset();
  }

  close() {
    super.close();
  }

  _getInputValues() {
    const formValues = {};
    this._inputList.forEach((input) => {
      formValues[input.name] = input.value;
    });
    return formValues;
  }
  setEventListeners() {
    super.setEventListeners();
    this._formElement.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._handleFormSubmit(this._getInputValues());
    });
  }
}
