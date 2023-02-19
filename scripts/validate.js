const formValidationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save',
  inactiveButtonClass: 'popup__save_inactive',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_active'
};

//check input validity function
function checkInputValidity(formElement, inputElement, validationConfig) {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, validationConfig);
  } else {
    hideInputError(formElement, inputElement, validationConfig);
  }
};

//check inputs for validity
function hasInvalidInput(inputList) {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};

//show error fucntion
function showInputError(formElement, inputElement, errorMessage, validationConfig) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);

  inputElement.classList.add(validationConfig.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(validationConfig.errorClass);
};

//hide errors function
function hideInputError(formElement, inputElement, validationConfig) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);

  errorElement.textContent = "";
  errorElement.classList.remove(validationConfig.errorClass);
  inputElement.classList.remove(validationConfig.inputErrorClass);
};

//enable validation function
function enableValidation(validationConfig) {
  const formList = Array.from(document.querySelectorAll(validationConfig.formSelector)); //finding all of forms
  formList.forEach((formElement) => {
    setEventListeners(formElement, validationConfig);
  });
};

//reset validation function
function resetValidation(formElement, validationConfig) {
  const inputList = Array.from(formElement.querySelectorAll(validationConfig.inputSelector)); //finding all of form inputs
  const submitButtonElement = formElement.querySelector(validationConfig.submitButtonSelector);

  inputList.forEach(inputElement => hideInputError(formElement, inputElement, validationConfig));
  setButtonElementState(inputList, submitButtonElement, validationConfig);
};

//Set Event Listener function
function setEventListeners(formElement, validationConfig) {
  const inputList = Array.from(formElement.querySelectorAll(validationConfig.inputSelector)); //finding all of form inputs
  const buttonElement = formElement.querySelector(validationConfig.submitButtonSelector); //finding form submit button

  setButtonElementState(inputList, buttonElement, validationConfig);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", () => {
      checkInputValidity(formElement, inputElement, validationConfig);
      setButtonElementState(inputList, buttonElement, validationConfig);
    });
  });
  setButtonElementState(inputList, buttonElement, validationConfig);
};

//function button state control
function setButtonElementState(inputList, buttonElement, validationConfig) {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(validationConfig.inactiveButtonClass);
    buttonElement.disabled = true;
  } else {
    buttonElement.classList.remove(validationConfig.inactiveButtonClass);
    buttonElement.disabled = false;
  }
};


enableValidation(formValidationConfig);