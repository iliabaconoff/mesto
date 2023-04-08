import Popup from './Popup'

class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector)
    this._popupImg = this._popup.querySelector('.popup__image-fullsize')
    this._popupTitle = this._popup.querySelector('.popup__image-title')
  }

  open(name, link) {
    this._popupTitle.textContent = name
    this._popupImg.alt = name
    this._popupImg.src = link
    super.open()
  }
}

export default PopupWithImage
