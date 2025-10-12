import Card from "./Card.js";
import FormValidator from "./FormValidator.js";
import {
  openPopup,
  closePopup,
  closeByOverlay,
  closeByEscape,
  openImagePopup,
  closeImagePopup,
} from "./utils.js";

const validationConfig = {
  inputSelector: ".pop-upinput",
  submitButtonSelector: ".pop-upsubmit",
  inactiveButtonClass: "pop-upsubmit_inactive",
  inputErrorClass: "pop-upinput_type_error",
  errorClass: "pop-up__input-error_active",
};

const editFormValidator = new FormValidator(
  validationConfig,
  document.querySelector("#edit-pop-up .pop-up__form")
);
editFormValidator.enableValidation();

const addFormValidator = new FormValidator(
  validationConfig,
  document.querySelector("#add-pop-up .pop-up__form")
);
addFormValidator.enableValidation();

// Seleção dos elementos do pop-up de edição de perfil
const editButton = document.querySelector(".profile__edit ");
const closeButton = document.querySelector("#edit-pop-up .pop-up__close");
const formElement = document.querySelector("#edit-pop-up .pop-up__form");

function openAddPopup() {
  openPopup(addPopup);
  addFormValidator.resetValidation(); // Reseta a validação ao abrir o pop-up
}

function closeAddPopup() {
  closePopup(addPopup);
}

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

const editPopup = document.querySelector("#edit-pop-up");
const addCardPopup = document.querySelector("#add-pop-up");
const imgCardPopup = document.querySelector("#image-pop-up");

editPopup.addEventListener("click", closeByOverlay);
addCardPopup.addEventListener("click", closeByOverlay);
imgCardPopup.addEventListener("click", closeByOverlay);
document.addEventListener("keydown", closeByEscape);

// Função para atualizar o perfil ao enviar o formulário
function handleProfileFormSubmit(evt) {
  evt.preventDefault();

  let nameValue = nameInput.value;
  let roleValue = roleInput.value;

  profileName.textContent = nameValue;
  profileRole.textContent = roleValue;

  closePopup();
}
function openEditPopup() {
  nameInput.value = profileName.textContent;
  roleInput.value = profileRole.textContent;
  editFormValidator.resetValidation(); // Reseta a validação ao abrir o pop-up
  openPopup(editPopup);
}

editButton.addEventListener("click", openEditPopup);
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
function createCard(cardData) {
  console.log("Criando card:", cardData);
  const CardInstante = new Card(cardData, openImagePopup);
  const cardElement = CardInstante.generateCard();
  console.log("Card criado:", cardElement);
  return cardElement;
}
// Seleção dos elementos do pop-up de adicionar card
initialCards.forEach((element) => {
  const cardElement = createCard(element);
  const elementsSection = document.querySelector(".elements");

  elementsSection.appendChild(cardElement);
});

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

imagePopupCloseButton.addEventListener("click", closeImagePopup);

/*const addCardPopup = document.querySelector("#add-pop-up");
addCardPopup.addEventListener("click", function (evt) {
  if (evt.target === evt.currentTarget) {
    closeAddPopup();
  }
});

const imgCardPopup = document.querySelector("#image-pop-up");
imgCardPopup.addEventListener("click", function (evt) {
  if (evt.target === evt.currentTarget) {
    closeImagePopup();
  }
});
document.addEventListener("keydown", function (evt) {
  if (evt.key === "Escape") {
    closePopup();
    closeAddPopup();
    closeImagePopup();
  }
});*/
