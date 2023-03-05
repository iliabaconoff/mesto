class FormValidator {
  constructor(formElement, config) {
    this._formSelector = config.formSelector
    this._inputSelector = config.inputSelector
    this._submitButtonSelector = config.submitButtonSelector
    this._inactiveButtonClass = config.inactiveButtonClass
    this._inputErrorClass = config.inputErrorClass
    this._errorClass = config.errorClass
    this._inputList = Array.from(
      formElement.querySelectorAll(config.inputSelector),
    )
    this._buttonElement = formElement.querySelector(this._submitButtonSelector)
    this._formElement = formElement
  }

  _getErrorElement(inputElement) {
    return this._formElement.querySelector(`.${inputElement.name}-error`)
  }

  _showInputError(inputElement) {
    inputElement.classList.add(this._inputErrorClass)
    this._getErrorElement(inputElement).classList.add(this._errorClass)
    this._getErrorElement(inputElement).textContent =
      inputElement.validationMessage
  }

  _hideInputError(inputElement) {
    inputElement.classList.remove(this._inputErrorClass)
    this._getErrorElement(inputElement).classList.remove(this._errorClass)
    this._getErrorElement(inputElement).textContent = ''
  }

  _isValid(inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement)
    } else {
      this._hideInputError(inputElement)
    }
  }

  _hasInvalidInput() {
    return this._inputList.some((inputElement) => !inputElement.validity.valid)
  }

  _setEventListeners() {
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._isValid(inputElement)
        this._setButtonState()
      })
    })

    this._setButtonState()
  }

  _setButtonState() {
    if (this._hasInvalidInput()) {
      this._buttonElement.classList.add(this._inactiveButtonClass)
      this._buttonElement.disabled = true
    } else {
      this._buttonElement.classList.remove(this._inactiveButtonClass)
      this._buttonElement.disabled = false
    }
  }

  resetValidation() {
    this._inputList.forEach((inputElement) => {
      this._hideInputError(inputElement)
    })
    this._setButtonState()
  }

  enableValidation() {
    this._setEventListeners()
  }
}

export default FormValidator
