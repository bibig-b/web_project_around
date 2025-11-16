import Popup from "./Popup.js";
export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._imageElement = this.getPopupElement().querySelector(".img__pop-up");
    this._captionElement = this.getPopupElement().querySelector(
      ".img__pop-up__caption"
    );
  }

  open({ name, link }) {
    this._imageElement.src = link;
    this._imageElement.alt = name;
    this._captionElement.textContent = name;
    super.open();
  }

  close() {
    super.close();
    this._imageElement.src = "";
    this._imageElement.alt = "";
    this._captionElement.textContent = "";
  }
}
