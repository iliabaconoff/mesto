class Card {
  constructor(name, link, cardTemplate, openPopupPreview) {
    this._name = name;
    this._link = link;
    this._cardTemplate = cardTemplate;
    this._openPopupPreview = openPopupPreview;
  }

  _setEventListeners() {
    this.cardLikeButton.addEventListener("click", () => this._setLikeButtonState());
    this.deleteCardButton.addEventListener("click", () => this._deleteCard());
    this._cardImage.addEventListener("click", () => this._handlePopupPreview());
  }

  _setLikeButtonState() {
    if (this.cardLikeButton.classList.contains("card__like_pressed")) {
      this.cardLikeButton.classList.remove('card__like_pressed');
     } else {
      this.cardLikeButton.classList.add("card__like_pressed");
    };
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
      .content.querySelector(".card")
      .cloneNode(true);
  }

  createCard() {
    this._element = this._getCardTemplate();

    this.deleteCardButton = this._element.querySelector(".card__delete");
    this._cardImage = this._element.querySelector(".card__image");
    this._cardTitle = this._element.querySelector(".card__title");
    this.cardLikeButton = this._element.querySelector(".card__like");

    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;
    this._cardTitle.textContent = this._name;

    this._setEventListeners();
    return this._element;
  }
}

export default Card;
