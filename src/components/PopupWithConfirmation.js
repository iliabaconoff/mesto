import Popup from "./Popup.js";

class PopupWithConfirmation extends Popup {
  constructor(popupSelector, { cardDelete }) {
    super(popupSelector);
    this._deleteCard = cardDelete;
  }

  open(cardId, cardElement) {
    this._cardId = cardId;
    this._cardElement = cardElement;
    super.open();
  }

  setEventListeners() {
    super.setEventListeners();
    this._submitButton.addEventListener('click', () => this._deleteCard(this._cardId, this._cardElement))
  }
}

export default PopupWithConfirmation;