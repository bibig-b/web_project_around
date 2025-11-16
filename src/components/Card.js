class Card {
  constructor(
    data,
    cardSelector,
    handleCardClick,
    handleDeleteCard,
    handleDeleteConfirmation,
    handleLikeCard
  ) {
    this._name = data.name;
    this._link = data.link;
    this._id = data._id;
    this._handleCardClick = handleCardClick;
    this._likes = data.likes || [];
    this._isLiked = data.isLiked || false;
    this._handleDeleteCard = handleDeleteCard;
    this._handleDeleteConfirmation = handleDeleteConfirmation;
    this._handleLikeCard = handleLikeCard;
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
      .addEventListener("click", () => this._onLikeClick());
    this._element
      .querySelector(".elements__delete-button")
      .addEventListener("click", () => this._handleDeleteClick());
    this._element
      .querySelector(".elements__image")
      .addEventListener("click", () => this._handleImageClick());
  }

  generateCard() {
    this._element = this._getTemplate();

    // Primeiro defina os elementos
    this._likeButton = this._element.querySelector(".elements__like");
    this._deleteButton = this._element.querySelector(
      ".elements__delete-button"
    );
    this._cardImage = this._element.querySelector(".elements__image");

    // Depois configure os dados
    this._element.querySelector(".elements__place").textContent = this._name;
    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;

    // Por último, adicione os event listeners e atualize o botão
    this._setEventListeners();
    this._updateLikeButton();

    return this._element;
  }

  // ← NOVO MÉTODO: lida com o clique do botão delete
  _handleDeleteClick() {
    if (this._handleDeleteConfirmation) {
      this._handleDeleteConfirmation(this._id, this._element);
    }
  }

  _onLikeClick() {
    this._handleLikeCard(this._id, this._isLiked)
      .then((updatedCard) => {
        this._isLiked = updatedCard.isLiked;
        this._likes = updatedCard.likes || []; // ← Adicione || [] como fallback
        this._updateLikeButton();
      })
      .catch((err) => {});
  }

  _updateLikeButton() {
    this._likeButton.classList.toggle("elements__like_active", this._isLiked);
  }

  _handleImageClick() {
    this._handleCardClick({
      name: this._name,
      link: this._link,
    });
  }
}

export default Card;
