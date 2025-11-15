import Popup from "./Popup.js";
export default class PopupWithConfirmation extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._confirmButton = this._popupElement.querySelector(
      ".pop-up__submit_confirm"
    );
  }

  setAction(action) {
    this._action = action;
  }

  setEventListeners() {
    super.setEventListeners();

    this._confirmButton.addEventListener("click", () => {
      this._action();
    });
  }
}
