// Função para mostrar mensagem de erros
class FormValidator {
  constructor(settings, formElement) {
    this._settings = settings;
    this._formElement = formElement;
  }
  #showInputError(inputElement, errorMessage) {
    const errorElement = this._formElement.querySelector(
      `#${inputElement.id}-error`
    );
    inputElement.classList.add("pop-up__input_type_error");
    errorElement.textContent = errorMessage;
    errorElement.classList.add("pop-up__error_visible");
  }

  #hideInputError(inputElement) {
    // Função para esconder mensagens de erros
    const errorElement = this._formElement.querySelector(
      `#${inputElement.id}-error`
    );
    inputElement.classList.remove("pop-up__input_type_error");
    errorElement.classList.remove("pop-up__error_visible");
    errorElement.textContent = "";
  }

  #isValid(inputElement) {
    // Função para verificar a validade do input
    if (!inputElement.validity.valid) {
      //campo inválido - mostrar o erro
      this.#showInputError(inputElement, inputElement.validationMessage);
    } else {
      //campo válido - esconder o erro
      this.#hideInputError(inputElement);
    }
  }

  #hasInvalidInput(inputList) {
    // Função para verificar se há algum input inválido
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  }

  #toggleButtonState(inputList, buttonElement) {
    // Função para ativar ou desativar o botão de envio
    if (this.#hasInvalidInput(inputList)) {
      buttonElement.classList.add("pop-up__submit_disabled");
      buttonElement.disabled = true;
    } else {
      buttonElement.classList.remove("pop-up__submit_disabled");
      buttonElement.disabled = false;
    }
  }

  #setEventListeners() {
    // Função para adicionar os event listeners aos inputs do formulário
    const inputList = Array.from(
      this._formElement.querySelectorAll(".pop-up__input")
    );
    const buttonElement = this._formElement.querySelector(".pop-up__submit");

    inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        this.#isValid(inputElement);
        this.#toggleButtonState(inputList, buttonElement);
      });
    });
  }
  resetValidation() {
    const inputList = Array.from(
      this._formElement.querySelectorAll(".pop-up__input")
    );
    const buttonElement = this._formElement.querySelector(".pop-up__submit");

    inputList.forEach((inputElement) => {
      this.#hideInputError(inputElement);
    });

    this.#toggleButtonState(inputList, buttonElement);
  }

  enableValidation() {
    this._formElement.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });
    this.#setEventListeners();
  }
}

export default FormValidator;
