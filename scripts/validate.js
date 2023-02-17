const formValidationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save',
  inactiveButtonClass: 'popup__save_inactive',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_active'
};

//check input validity function
function checkInputValidity(formElement, inputElement, obj) {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, obj);
  } else {
    hideInputError(formElement, inputElement, obj);
  }
};

//check inputs for validity
function hasInvalidInput(inputList) {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};

//show error fucntion
function showInputError(formElement, inputElement, errorMessage, obj) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);

  inputElement.classList.add(obj.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(obj.errorClass);
};

//hide errors function
function hideInputError(formElement, inputElement, obj) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);

  errorElement.textContent = "";
  errorElement.classList.remove(obj.errorClass);
  inputElement.classList.remove(obj.inputErrorClass);
};

//enable validation function
function enableValidation(obj) {
  const formList = Array.from(document.querySelectorAll(obj.formSelector)); //finding all of forms
  formList.forEach((formElement) => {
    setEventListeners(formElement, obj);
  });
};

//reset validation function
function resetValidation(formElement, obj) {
  const submitButtonElement = formElement.querySelector(obj.submitButtonElement);
  inputList.forEach(inputElement => hideInputError(formElement, inputElement, obj));
  setButtonElementState(inputList, submitButtonElement, obj);
};

//Set Event Listener function
function setEventListeners(formElement, obj) {
  const inputList = Array.from(formElement.querySelectorAll(obj.inputSelector)); //finding all of form inputs
  const buttonElement = formElement.querySelector(obj.submitButtonSelector); //finding form submit button

  setButtonElementState(inputList, buttonElement, obj);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", () => {
      checkInputValidity(formElement, inputElement, obj);
      setButtonElementState(inputList, buttonElement, obj);
    });
  });
  setButtonElementState(inputList, buttonElement, obj);
};

//function button state control
function setButtonElementState(inputList, buttonElement, obj) {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(obj.inactiveButtonClass);
    buttonElement.disabled = true;
  } else {
    buttonElement.classList.remove(obj.inactiveButtonClass);
    buttonElement.disabled = false;
  }
};


enableValidation(formValidationConfig);