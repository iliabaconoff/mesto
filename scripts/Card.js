class Card {
    constructor(name, link, cardTemplate, openPopupPreview) {
      this._name = name;
      this._link = link;
      this._cardTemplate = cardTemplate;
      this._openPopupPreview = openPopupPreview;
    }
  
    _setEventListeners() {
      this._element.querySelector('.card__like').addEventListener('click', this._setLikeButtonState);
      this._element.querySelector('.card__delete').addEventListener('click', () => {
        this._deleteCard();
      });
      this._cardImage.addEventListener('click', () => {
        this._handlePopupPreview();
      });
    }
  
    _setLikeButtonState(evt) {
      evt.target.classList.toggle('card__like_pressed');
    }
  
    _deleteCard() {
      this._element.remove();
      this._element = null;
    }
  
    _handlePopupPreview() {
      this._openPopupPreview(this._name, this._link);
    }
  
    _getCardTemplate() {
      return document
        .querySelector(this._cardTemplate)
        .content
        .querySelector('.card')
        .cloneNode(true);
    }
  
    createCard() {
      this._element = this._getCardTemplate();
  
      this._cardImage = this._element.querySelector('.card__image');
      this._cardTitle = this._element.querySelector('.card__title');
  
      this._cardImage.src = this._link;
      this._cardImage.alt = this._name;
      this._cardTitle.textContent = this._name;
  
      this._setEventListeners();
      return this._element;
    }
  }
  
  export default Card;
  