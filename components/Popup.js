export default class Popup {
  constructor(popupSelector) {
    this._popupElement = document.querySelector(popupSelector);
  }

  open() {
    this._popupElement.classList.add("pop-up__opened");
    document.addEventListener("keydown", this._handleEscClose);
    this.setEventListeners();
  }

  close() {
    this._popupElement.classList.remove("pop-up__opened");
    document.removeEventListener("keydown", this._handleEscClose);
  }

  _handleEscClose = (evt) => {
    if (evt.key === "Escape") {
      this.close();
    }
  };

  setEventListeners() {
    const closeButton = this._popupElement.querySelector(".pop-up__close");
    closeButton.addEventListener("click", () => this.close());

    this._popupElement.addEventListener("click", (evt) => {
      if (evt.target === this._popupElement) {
        this.close();
      }
    });
  }
  getPopupElement() {
    return this._popupElement;
  }
}
