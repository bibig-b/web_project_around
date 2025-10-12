class Card {
  constructor(cardData, handleCardClick) {
    this._name = cardData.name;
    this._link = cardData.link;
    this._handleCardClick = handleCardClick;
  }

  _getTemplate() {
    const cardTemplate = document.querySelector("#card-template");
    const cardElement = cardTemplate.content.cloneNode(true);
    return cardElement.querySelector(".elements__card");
  }

  _setEventListeners() {
    this._cardElement
      .querySelector(".elements__like")
      .addEventListener("click", () => {
        this.handleLikeCard();
      });

    this._cardElement
      .querySelector(".elements__delete-button")
      .addEventListener("click", () => {
        this.handleDeleteCard();
      });

    this._cardElement
      .querySelector(".elements__image")
      .addEventListener("click", () => {
        this.handleImageClick();
      });
  }

  generateCard() {
    this._cardElement = this._getTemplate();

    this._cardElement.querySelector(".elements__place").textContent =
      this._name;
    this._cardElement.querySelector(".elements__image").src = this._link;
    this._cardElement.querySelector(".elements__image").alt = this._name;

    this._setEventListeners();

    return this._cardElement;
  }

  handleDeleteCard() {
    this._cardElement.remove();
  }
  handleLikeCard() {
    console.log("CardElement:", this._cardElement);
    console.log(
      "LikeButton:",
      this._cardElement.querySelector(".elements__like")
    );
    this._cardElement
      .querySelector(".elements__like")
      .classList.toggle("elements__like_active");
  }
  handleImageClick() {
    this._handleCardClick(this._link, this._name);
  }
}

export default Card;
