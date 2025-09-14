// Seleção dos elementos do pop-up
const formElement = document.querySelector(".pop-up__form");
const editButton = document.querySelector(".profile__edit");
const closeButton = document.querySelector(".pop-up__close");
const popup = document.querySelector("#edit-pop-up");

// Seleção dos elementos do pop-up de adicionar card
const addButton = document.querySelector(".profile__add");
const addCloseButton = document.querySelector("#add-pop-up .pop-up__close");
const addPopup = document.querySelector("#add-pop-up");
const addFormElement = document.querySelector("#add-pop-up .pop-up__form");

const placeInput = document.querySelector('.pop-up__input[name="place"]');
const linkInput = document.querySelector('.pop-up__input[name="link"]');

// Seleção dos elementos do perfil
const profileName = document.querySelector(".profile__name");
const profileRole = document.querySelector(".profile__role");

const nameInput = document.querySelector('.pop-up__input[name="name"]');
const roleInput = document.querySelector('.pop-up__input[name="role"]');

// Seleção dos elementos do pop-up de imagem
const imagePopup = document.querySelector("#image-pop-up");
const imagePopupImage = imagePopup.querySelector(".img__pop-up");
const imagePopupCaption = imagePopup.querySelector(".img__pop-up__caption");
const imagePopupCloseButton = imagePopup.querySelector(".pop-up__close");

// Funções para abrir e fechar o pop-up
function openPopup() {
  nameInput.value = profileName.textContent;
  roleInput.value = profileRole.textContent;

  popup.style.display = "flex";
}

function closePopup() {
  popup.style.display = "none";
}

// Função para atualizar o perfil ao enviar o formulário
function handleProfileFormSubmit(evt) {
  evt.preventDefault();

  let nameValue = nameInput.value;
  let roleValue = roleInput.value;

  profileName.textContent = nameValue;
  profileRole.textContent = roleValue;

  closePopup();
}

editButton.addEventListener("click", openPopup);
closeButton.addEventListener("click", closePopup);
formElement.addEventListener("submit", handleProfileFormSubmit);

// Array inicial de cards
const initialCards = [
  {
    name: "Vale de Yosemite",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_yosemite.jpg",
  },
  {
    name: "Lago Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_lake-louise.jpg",
  },
  {
    name: "Montanhas Carecas",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_latemar.jpg",
  },
  {
    name: "Parque Nacional da Vanoise ",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_vanoise.jpg",
  },
  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_lago.jpg",
  },
];
// Seleção dos elementos do pop-up de adicionar card
initialCards.forEach((element) => {
  const cardElement = createCard(element);
  const elementsSection = document.querySelector(".elements");

  const likeButton = cardElement.querySelector(".elements__like");
  likeButton.addEventListener("click", () => {
    likeButton.classList.toggle("elements__like_active");
  });

  elementsSection.appendChild(cardElement);
});

function openAddPopup() {
  placeInput.value = "";
  linkInput.value = "";
  addPopup.style.display = "flex";
}
function closeAddPopup() {
  addPopup.style.display = "none";
}

function handleAddFormSubmit(evt) {
  evt.preventDefault();

  const placeValue = placeInput.value;
  const linkValue = linkInput.value;

  const newCard = {
    name: placeValue,
    link: linkValue,
  };

  initialCards.push(newCard);
  const newCardElement = createCard(newCard);
  const elementsSection = document.querySelector(".elements");
  elementsSection.prepend(newCardElement);
  closeAddPopup();
}
addButton.addEventListener("click", openAddPopup);
addCloseButton.addEventListener("click", closeAddPopup);
addFormElement.addEventListener("submit", handleAddFormSubmit);

function createCard(cardData) {
  const cardTemplate = document.querySelector("#card-template");
  const cardElement = cardTemplate.content.cloneNode(true);

  const imageElement = cardElement.querySelector(".elements__image");
  imageElement.src = cardData.link;
  imageElement.alt = `Imagem de ${cardData.name}`;
  imageElement.addEventListener("click", () => {
    openImagePopup(cardData.link, cardData.name);
  });

  const placeElement = cardElement.querySelector(".elements__place");
  placeElement.textContent = cardData.name;

  const deleteButton = cardElement.querySelector(".elements__delete-button");
  deleteButton.addEventListener("click", () => {
    deleteButton.closest(".elements__card").remove();
  });
  return cardElement;
}

// Função para abrir o pop-up de imagem
function openImagePopup(imageSrc, imageAlt) {
  imagePopupImage.src = imageSrc;
  imagePopupImage.alt = imageAlt;
  imagePopupCaption.textContent = imageAlt;
  imagePopup.style.display = "flex";
}

// Função para fechar o pop-up de imagem
function closeImagePopup() {
  imagePopup.style.display = "none";
}
imagePopupCloseButton.addEventListener("click", closeImagePopup);
