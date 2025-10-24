class Card {
  constructor(data, handleCardClick, cardSelector) {
    this._name = data.name;
    this._link = data.link;
    this._handleCardClick = handleCardClick;
    this._cardSelector = cardSelector;
  }

  _getTemplate() {
    const cardTemplate = document.querySelector("#card-template");
    const cardElement = cardTemplate.content
      .querySelector(".elements__card")
      .cloneNode(true);
    return cardElement;
  }

  _setEventListeners() {
    this._element
      .querySelector(".elements__like")
      .addEventListener("click", () => this._handleLikeCard());
    this._element
      .querySelector(".elements__delete-button")
      .addEventListener("click", () => this._handleDeleteCard());
    this._element
      .querySelector(".elements__image")
      .addEventListener("click", () => this._handleImageClick());
  }

  generateCard() {
    this._element = this._getTemplate();

    this._setEventListeners();

    this._likeButton = this._element.querySelector(".elements__like");
    this._deleteButton = this._element.querySelector(".elements__delete");
    this._cardImage = this._element.querySelector(".elements__image");

    this._element.querySelector(".elements__place").textContent = this._name;
    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;

    return this._element;
  }

  _handleDeleteCard() {
    this._element.remove();
    this._element = null;
  }
  _handleLikeCard() {
    this._element.querySelector(".elements__like");
    this._element
      .querySelector(".elements__like")
      .classList.toggle("elements__like_active");
  }
  _handleImageClick() {
    this._handleCardClick({
      name: this._name,
      link: this._link,
    });
  }
}

export default Card;
