class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
    this.closeButton = this._popup.querySelector('.popup__close');
    this._submitButton = this._popup.querySelector('.popup__save');
  }

  open() {
    this._popup.classList.add('popup_opened');
    document.addEventListener('keydown', this._handleEscClose);
  }

  close() {
    this._popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', this._handleEscClose);
  }

  setEventListeners() {
    this._popup.addEventListener('mousedown', (evt) => {
      if (evt.target.classList.contains('popup_opened') || (evt.target.classList.contains('popup__close'))) {
        this.close();
      }
    });
  }

  proccessActionButtonText(text) {  
    this._submitButton.innerHTML = `${text}<span>...</span>`;
  }
  
  finalActionButtonText(text) {
    this._submitButton.innerHTML = text;
  }

  _handleEscClose = (evt) => {
    if (evt.key === 'Escape') {
      this.close();
    };
  }
}

export default Popup;