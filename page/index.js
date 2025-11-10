import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import {
  openPopup,
  closePopup,
  closeByOverlay,
  closeByEscape,
  openImagePopup,
  closeImagePopup,
  openAddPopup,
  closeAddPopup,
} from "../components/utils.js";
import Popup from "../components/Popup.js";
import PopupWithImage from "../components/PopupWithImage.js";
import Section from "../components/Section.js";
import UserInfo from "../components/UserInfo.js";
import Api from "../components/Api.js";

const api = new Api({
  baseUrl: "https://around-api.pt-br.tripleten-services.com/v1",
  headers: {
    authorization: "312a1cc2-b167-4125-82ae-d85df359252d",
    "Content-Type": "application/json",
  },
});

const userInfo = new UserInfo({
  nameSelector: ".profile__name",
  jobSelector: ".profile__role",
});

const popup = new Popup("#edit-pop-up");
popup.setEventListeners();

const imagePopup = new PopupWithImage("#image-pop-up");
imagePopup.setEventListeners();

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

// Seleção dos elementos do pop-up de adicionar card
const addButton = document.querySelector(".profile__add");
const addCloseButton = document.querySelector("#add-pop-up .pop-up__close");
const addFormElement = document.querySelector("#add-pop-up .pop-up__form");

const placeInput = document.querySelector('.pop-up__input[name="place"]');
const linkInput = document.querySelector('.pop-up__input[name="link"]');

const nameInput = document.querySelector('.pop-up__input[name="name"]');
const roleInput = document.querySelector('.pop-up__input[name="role"]');

// Seleção dos elementos do pop-up de imagem

const addPopup = new Popup("#add-pop-up");
addPopup.setEventListeners();

// Função para atualizar o perfil ao enviar o formulário
function handleProfileFormSubmit(evt) {
  evt.preventDefault();

  userInfo.setUserInfo({
    name: nameInput.value,
    job: roleInput.value,
  });

  popup.close();
}
function openEditPopup() {
  const userData = userInfo.getUserInfo();
  nameInput.value = userData.name;
  roleInput.value = userData.job;
  editFormValidator.resetValidation(); // Reseta a validação ao abrir o pop-up
  popup.open();
}

editButton.addEventListener("click", openEditPopup);
closeButton.addEventListener("click", () => popup.close());
formElement.addEventListener("submit", handleProfileFormSubmit);

api
  .initialData()
  .then(([userData, cardsData]) => {
    userInfo.setUserInfo({
      name: userData.name,
      job: userData.about,
    });
    userInfo.setUserAvatar(userData.avatar);
    SectionInstance.renderItems(cardsData);
  })
  .catch((err) => {
    console.log(`Erro ao buscar dados iniciais: ${err}`);
  });

/*Array inicial de cards
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
];*/

const SectionInstance = new Section(
  {
    items: api.initialData,
    renderer: (cardData) => {
      return createCard(cardData);
    },
  },
  ".elements"
);

SectionInstance.renderItems();

function createCard(cardData) {
  const CardInstante = new Card(cardData, (data) => imagePopup.open(data));
  const cardElement = CardInstante.generateCard();
  return cardElement;
}
// Seleção dos elementos do pop-up de adicionar card

function handleAddFormSubmit(evt) {
  evt.preventDefault();

  const newCard = {
    name: placeInput.value,
    link: linkInput.value,
  };

  const newCardElement = createCard(newCard);
  SectionInstance.addItem(newCardElement);

  addPopup.close();
}
addButton.addEventListener("click", openAddPopup);

addCloseButton.addEventListener("click", closeAddPopup);

addFormElement.addEventListener("submit", handleAddFormSubmit);
