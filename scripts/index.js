let formElement = document.querySelector(".pop-up__form");
let editButton = document.querySelector(".profile__edit");
let closeButton = document.querySelector(".pop-up__close");
let popup = document.querySelector("#edit-pop-up");

let profileName = document.querySelector(".profile__name");
let profileRole = document.querySelector(".profile__role");

let nameInput = document.querySelector('.pop-up__input[name="name"]');
let roleInput = document.querySelector('.pop-up__input[name="role"]');

function openPopup() {
  nameInput.value = profileName.textContent;
  roleInput.value = profileRole.textContent;

  popup.style.display = "flex";
}

function closePopup() {
  popup.style.display = "none";
}

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
