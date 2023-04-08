class Card {
  constructor(cardData, currentUserId, cardTemplate, handlers) {
    this._cardData = cardData
    this._name = this._cardData.name
    this._link = this._cardData.link
    this._cardTemplate = cardTemplate
    this._currentUserId = currentUserId
    this._authorId = cardData.owner._id
    this._cardId = cardData._id
    this._handleCardClick = handlers.handleCardClick
    this._handleCardLike = handlers.handleCardLike
    this._handleCardDislike = handlers.handleCardDislike
    this._handleCardDelete = handlers.handleCardDelete
  }

  _setEventListeners() {
    //like
    this._cardLikeButton.addEventListener('click', () => this._setLikeButtonState(),)
    //delete
    if (this._currentUserId === this._authorId) {
      this._deleteCardButton.addEventListener('click', () =>
        this._handleCardDelete(this._cardId, this),
      )
    } else { this._deleteCardButton.remove() }
    //preview open
    this._cardImage.addEventListener('click', () => this._handleCardClick(this._name, this._link),)}

  //check liked or not
  _isCardLiked() { return this.likesArray.find((user) => this._currentUserId === user._id)}

  renderCardLikes(data) {
    this.likesArray = data.likes
    this.likeCount = this.likesArray.length
    this._likesCounter.textContent = this.likeCount
    this._isCardLiked()
      ? this._cardLikeButton.classList.add('card__like_pressed')
      : this._cardLikeButton.classList.remove('card__like_pressed')
  }

  _setLikeButtonState() {
    if (this._isCardLiked()) {
      this._handleCardDislike(this._cardId)
    } else {
      this._handleCardLike(this._cardId)
    }
  }

  deleteCard() {
    this._element.remove()
    this._element = null
  }

  _handlePopupPreview() { this._openPopupPreview(this._name, this._link)}

  _getCardTemplate() {
    return document
      .querySelector(this._cardTemplate)
      .content.querySelector('.card')
      .cloneNode(true)
  }

  createCard() {
    this._element = this._getCardTemplate()

    this._deleteCardButton = this._element.querySelector('.card__delete')
    this._cardImage = this._element.querySelector('.card__image')
    this._cardTitle = this._element.querySelector('.card__title')
    this._cardLikeButton = this._element.querySelector('.card__like')
    this._likesCounter = this._element.querySelector('.card__like-counter')

    this._cardImage.src = this._link
    this._cardImage.alt = this._name
    this._cardTitle.textContent = this._name

    this.renderCardLikes(this._cardData)
    this._setEventListeners()
    return this._element
  }
}

export default Card