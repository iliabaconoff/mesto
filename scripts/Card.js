class Card {
    constructor(link, name, cardTemplate, openPopPrev) {
        this._name = name;
        this._link = link;
        this._cardTemplate = cardTemplate;
        this._openPopPrev = openPopPrev;
    }

    _getCardTemplate() {
        return document
            .querySelector(this._cardTemplate)
            .content
            .querySelector('.card')
            .cloneNode(true)
    }

    _setEventListeners() {
        this._element.querySelector('.card__like').addEventListener('click', this._setLikeButtonState);
        this._element.querySelector('.card__delete').addEventListener('click', () => {
            this._cardDelete();
        })
        this._cardImage.addEventListener('click', () => {
            this._handlePopupPrev();
        })
    }

    _setLikeButtonState(evt) {
        evt.target.classList.toggle('card__like-pressed');
      }

    _cardDelete() {
        this._element.remove();
        this._element = null;
    }

    _handlePopupPrev() {
        this._openPopPrev(this._link, this._name);
    }

    createCard() {
        this._element = this._getCardTemplate();
        this._cardImage = this._element.querySelector('.card__image');
        this._cardName = this._element.querySelector('.card__title');

        this._cardImage.src = this._link;
        this._cardImage.alt = this._name;
        this._cardName.textContent = this._name;
    }
}

export default Card;