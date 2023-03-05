import { initialCards, formValidationConfig } from "./config.js";
import FormValidator from "./FormValidator.js";
import Card from "./Card.js";

// #Constants
// Popups
const popupEdit = document.querySelector('.popup_edit');
const popupAdd = document.querySelector('.popup_add');
const popupPreview = document.querySelector('.popup_preview');
// Edit form for user profile (username & userjob)
const formEditProfile = document.querySelector('.popup__form_type_profile-edit');
// Consts for profile edit
const nameInput = document.querySelector('.popup__input_field_name');
const jobInput = document.querySelector('.popup__input_field_job');
const userNameText = document.querySelector('.head-profile__username');
const userJobText = document.querySelector('.head-profile__job');
// Consts for adding and creating card
const formAddCard = document.querySelector('.popup__form_type_card-add');
const cardsContainer = document.querySelector('.photo-feed');
const popupPreviewImage = popupPreview.querySelector('.popup__image-preview');
const popupPreviewTitle = popupPreview.querySelector('.popup__title-preview');
const cardTitleInput = document.querySelector('.popup__input_field_placename');
const cardImageInput = document.querySelector('.popup__input_field_placeurl');
// Buttons
const buttonOpenEditForm = document.querySelector('.head-profile__edit-button');
const buttonAdd = document.querySelector('.head-profile__add-button');
const closeButtons = document.querySelectorAll('.popup__close-button');

// #Functions
// This function will open the popups by add popup_opened class
function openPopup(popup) {
  popup.classList.add('popup_opened');
  popup.addEventListener('mousedown', closeByOverlay);
  document.addEventListener('keydown', closeByEscBtn);
};

function openPopupPreview(name, link) {
  popupPreviewImage.src = link;
  popupPreviewImage.alt = name;
  popupPreviewTitle.textContent = name;
  openPopup(popupPreview);
}

function closePopup(popup) {
  popup.classList.remove('popup_opened');
  popup.removeEventListener('mousedown', closeByOverlay);
  document.removeEventListener('keydown', closeByEscBtn);
};

const closeByOverlay = (evt) => {
  if (evt.target.classList.contains('popup_opened')) {
    closePopup(evt.target);
  };
};

const closeByEscBtn = (evt) => {
  if (evt.key === 'Escape') {
    const activePopup = document.querySelector('.popup_opened');
    closePopup(activePopup);
  };
};

function createCard(item) {
  const card = new Card(item.name, item.link, '#card-template', openPopupPreview);
  const cardElement = card.createCard();
  return cardElement;
}

function formEditProfileSubmitHandler(evt) {
  evt.preventDefault();
  userNameText.textContent = nameInput.value;
  userJobText.textContent = jobInput.value;
  closePopup(popupEdit);
};

function formAddCardHandler(evt) {
  evt.preventDefault();
  cardsContainer.prepend(createCard({ name: cardTitleInput.value, link: cardImageInput.value }));
  closePopup(popupAdd);
};


// OpenPop buttons listener
buttonOpenEditForm.addEventListener('click', () => {
  openPopup(popupEdit);
  nameInput.value = userNameText.textContent;
  jobInput.value = userJobText.textContent;
  formEditValidation.resetValidation(formEditProfile, formValidationConfig); // сброс валидации при сабмите или переоткрытии
});

// Add button listener
buttonAdd.addEventListener('click', () => {
  formAddCard.reset();
  formAddCardValidation.resetValidation(formAddCard, formValidationConfig); // сброс валидации при сабмите или переоткрытии
  openPopup(popupAdd);
});

// form events listeners
formEditProfile.addEventListener('submit', formEditProfileSubmitHandler);
formAddCard.addEventListener('submit', formAddCardHandler);

// Close buttons listeners
closeButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const activePopup = document.querySelector('.popup_opened')
    closePopup(activePopup);
  });
});

// FormValidator init
const formEditValidation = new FormValidator(formValidationConfig, formEditProfile);
formEditValidation.enableValidation();
const formAddCardValidation = new FormValidator(formValidationConfig, formAddCard);
formAddCardValidation.enableValidation();

// RenderCards
function renderCards(items) {
  items.forEach(item => {
    cardsContainer.append(createCard({name: item.name, link: item.link}));
  });
};

renderCards(initialCards);