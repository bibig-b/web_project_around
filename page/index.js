import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import {
  openPopup,
  closePopup,
  closeByOverlay,
  closeByEscape,
  openImagePopup,
  closeImagePopup,
} from "../components/Utils.js";
import Popup from "../components/Popup.js";
import PopupWithImage from "../components/PopupWithImage.js";
import Section from "../components/Section.js";
import UserInfo from "../components/UserInfo.js";
import Api from "../components/Api.js";
import PopupWithConfirmation from "../components/PopupWithConfirmation.js";

import "./page/index.css";

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
  inputSelector: ".pop-up__input",
  submitButtonSelector: ".pop-up__submit",
  inactiveButtonClass: "pop-up__submit_disabled",
  inputErrorClass: "pop-up__input_type_error",
  errorClass: "pop-up__error_visible",
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
console.log("addButton:", addButton);
const addCloseButton = document.querySelector("#add-pop-up .pop-up__close");
const addFormElement = document.querySelector("#add-pop-up .pop-up__form");

const placeInput = document.querySelector('.pop-up__input[name="place"]');
const linkInput = document.querySelector('.pop-up__input[name="link"]');

const nameInput = document.querySelector('.pop-up__input[name="name"]');
const roleInput = document.querySelector('.pop-up__input[name="role"]');
const avatarInput = document.querySelector('.pop-up__input[name="avatar"]');
const avatarEditButton = document.querySelector(".profile__avatar-edit");

const confirmationPopup = new PopupWithConfirmation("#confirm-pop-up");
confirmationPopup.setEventListeners();

// Seleção dos elementos do pop-up de edição de avatar
const avatarPopup = new Popup("#avatar-pop-up");
avatarPopup.setEventListeners();

// Seleção dos elementos do pop-up de imagem

const addPopup = new Popup("#add-pop-up");
addPopup.setEventListeners();

const SectionInstance = new Section(
  {
    items: [],
    renderer: (cardData) => {
      return createCard(cardData);
    },
  },
  ".elements"
);

console.log(
  "Elemento .elements encontrado:",
  document.querySelector(".elements")
); // ← Adicione

// Função para atualizar o perfil ao enviar o formulário
function handleProfileFormSubmit(evt) {
  evt.preventDefault();

  api
    .editUserInfo(nameInput.value, roleInput.value)
    .then((userData) => {
      console.log("Dados do usuário atualizados:", userData);
      userInfo.setUserInfo({
        name: userData.name,
        job: userData.about,
      });
      popup.close();
    })
    .catch((err) => {
      console.log(`Erro ao atualizar informações do usuário: ${err}`);
    });
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

// Função para criar um novo card

function createCard(cardData) {
  const card = new Card(
    cardData,
    "#card-template",
    (data) => imagePopup.open(data),
    (cardId) => {
      return api.deleteCard(cardId);
    }
  );
  const cardElement = card.generateCard();
  return cardElement;
}

Promise.all([api.getUserInfo(), api.getInitialCards()])
  .then(([userData, initialCards]) => {
    console.log("Cards iniciais:", initialCards);
    console.log("Dados do usuário:", userData);

    userInfo.setUserInfo({
      name: userData.name,
      job: userData.about,
    });
    const avatarImage = document.querySelector(".content__avatar");
    avatarImage.src = userData.avatar;

    console.log("Chamando renderItems com", initialCards.length, "cards"); // ← Adicione
    SectionInstance.renderItems(initialCards);
    console.log("renderItems foi executado"); // ← Adicione
  })

  .catch((err) => {
    console.log(`Erro ao buscar dados iniciais: ${err}`);
  });

function openAddPopup() {
  placeInput.value = "";
  linkInput.value = "";
  addFormValidator.resetValidation(); // Reseta a validação ao abrir o pop-up
  addPopup.open();
}

// Seleção dos elementos do pop-up de adicionar card

function handleAddFormSubmit(evt) {
  evt.preventDefault();

  const submitButton = evt.target.querySelector(".pop-up__submit");
  function renderLoading(
    isLoading,
    button,
    originalText = "Criar",
    loadingText = "Salvando..."
  ) {
    if (isLoading) {
      button.textContent = loadingText;
    } else {
      button.textContent = originalText;
    }
  }
  renderLoading(true, submitButton);

  const newCard = {
    name: placeInput.value,
    link: linkInput.value,
  };
  console.log("Dados que serão enviados:", newCard);

  api

    .addNewCard(newCard.name, newCard.link)
    .then((cardData) => {
      console.log("Resposta do servidor:", cardData);
      const cardElement = createCard(cardData);
      SectionInstance.addItem(cardElement);
      renderLoading(false, submitButton);
      addPopup.close();
    })
    .catch((err) => {
      console.log(`Erro ao adicionar novo card: ${err}`);
      renderLoading(false, submitButton);
    });
}

addButton.addEventListener("click", openAddPopup);

addCloseButton.addEventListener("click", () => addPopup.close());

addFormElement.addEventListener("submit", handleAddFormSubmit);
