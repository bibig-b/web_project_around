// Funções para abrir e fechar popups
function openPopup(popup) {
  popup.classList.add("pop-up__opened");
  document.addEventListener("keydown", closeByEscape);
}

function closePopup() {
  const openPopup = document.querySelector(".pop-up__opened");
  if (openPopup) {
    openPopup.classList.remove("pop-up__opened");
    document.removeEventListener("keydown", closeByEscape);
  }
}

function closeByEscape(evt) {
  if (evt.key === "Escape") {
    closePopup();
  }
}

// Função específica para abrir popup de imagem
function openImagePopup(imageSrc, imageAlt) {
  const imagePopup = document.getElementById("image-pop-up");
  const popupImage = imagePopup.querySelector(".img__pop-up");
  const popupCaption = imagePopup.querySelector(".img__pop-up__caption");

  // Define a imagem e o texto
  popupImage.src = imageSrc;
  popupImage.alt = imageAlt;
  popupCaption.textContent = imageAlt;

  // Abre o popup
  openPopup(imagePopup);
}

function closeImagePopup() {
  closePopup();
}
function closeByOverlay(evt) {
  if (evt.target.classList.contains("pop-up")) {
    closePopup();
  }
}

export {
  openPopup,
  closePopup,
  closeByEscape,
  openImagePopup,
  closeImagePopup,
  closeByOverlay,
};
