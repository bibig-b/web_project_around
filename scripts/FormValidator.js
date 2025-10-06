// Função para mostrar mensagem de erros
function showInputError(formElement, inputElement, errorMessage) {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.add("pop-up__input_type_error");
  errorElement.textContent = errorMessage;
  errorElement.classList.add("pop-up__error_visible");
}

// Função para esconder mensagens de erros
function hideInputError(formElement, inputElement) {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.remove("pop-up__input_type_error");
  errorElement.classList.remove("pop-up__error_visible");
  errorElement.textContent = "";
}

// Função para verificar a validade do input
function isValid(formElement, inputElement) {
  if (!inputElement.validity.valid) {
    //campo inválido - mostrar o erro
    showInputError(formElement, inputElement, inputElement.validationMessage);
  } else {
    //campo válido - esconder o erro
    hideInputError(formElement, inputElement);
  }
}

// Função para verificar se há algum input inválido
function hasInvalidInput(inputList) {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
}

// Função para ativar ou desativar o botão de envio
function toggleButtonState(inputList, buttonElement) {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add("pop-up__submit_disabled");
    buttonElement.disabled = true;
  } else {
    buttonElement.classList.remove("pop-up__submit_disabled");
    buttonElement.disabled = false;
  }
}

// Função para adicionar os event listeners aos inputs do formulário
function setEventListeners(formElement) {
  const inputList = Array.from(formElement.querySelectorAll(".pop-up__input"));
  const buttonElement = formElement.querySelector(".pop-up__submit");

  toggleButtonState(inputList, buttonElement);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", function () {
      isValid(formElement, inputElement);
      toggleButtonState(inputList, buttonElement);
    });
  });
}

// Função para habilitar a validação
function enableValidation() {
  const formList = Array.from(document.querySelectorAll(".pop-up__form"));
  formList.forEach((formElement) => {
    formElement.addEventListener("submit", function (evt) {
      evt.preventDefault();
    });
    setEventListeners(formElement);
  });
}

enableValidation({
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__submit",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
});
