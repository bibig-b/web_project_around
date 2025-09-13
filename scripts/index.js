// Seleção dos elementos do pop-up
let formElement = document.querySelector(".pop-up__form");
let editButton = document.querySelector(".profile__edit");
let closeButton = document.querySelector(".pop-up__close");
let popup = document.querySelector("#edit-pop-up");

// Seleção dos elementos do perfil
let profileName = document.querySelector(".profile__name");
let profileRole = document.querySelector(".profile__role");

let nameInput = document.querySelector('.pop-up__input[name="name"]');
let roleInput = document.querySelector('.pop-up__input[name="role"]');

let addButton = document.querySelector("#add-pop-up");
let addCloseButton = document.querySelector(".pop-up__close");
let addPopup = document.querySelector("#profile__add");

// Seleção dos elementos do formulário de adição de card
let placeInput = document.querySelector('.pop-up__input[name="place"]');
let linkInput = document.querySelector('.pop-up__input[name="link"]');
let addFormElement = document.querySelector("#add-form");

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

// Criação dos cards
initialCards.forEach((element) => {
  const cardTemplate = document.querySelector("#card-template");
  const cardElement = cardTemplate.content.cloneNode(true);

  const imageElement = cardElement.querySelector(".elements__image");
  imageElement.src = element.link;
  imageElement.alt = `Image de ${element.name}`;

  const placeElement = cardElement.querySelector(".elements__place");
  placeElement.textContent = element.name;

  const likeButton = cardElement.querySelector(".elements__like");

  likeButton.addEventListener("click", () => {
    likeButton.classList.toggle("elements__like_active");
  });

  const elementsSection = document.querySelector(".elements");
  elementsSection.appendChild(cardElement);
});

document.addEventListener("click", (event) => {
  if (event.target.classList.contains("elements__delete-button")) {
    const cardToDelete = event.target.closest(".elements__card");
    cardToDelete.remove();
  }
});
