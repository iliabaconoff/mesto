import { initialCards, formValidationConfig } from "./config.js";
import FormValidator from "./FormValidator.js";
import Card from "./Card.js";


// Edit Profile Popup
const popups = document.querySelectorAll(".popup");
const buttonOpenEditProfileForm = document.querySelector(
  ".profile__button-edit"
);
const closeButtons = document.querySelectorAll(".popup__close");
const popupEditProfile = document.querySelector(".popup_edit");
const submitPop = document.querySelector(".popup__save");
const formEditProfile = document.querySelector(".popup__form-edit");
const nameInput = formEditProfile.querySelector(".popup__input_type_name");
const jobInput = formEditProfile.querySelector(".popup__input_type_bio");
const profileName = document.querySelector(".profile__name");
const profileBio = document.querySelector(".profile__bio");

// Add Cards Popup
const buttonOpenAddCardForm = document.querySelector(".profile__button-add");
const popupAddCard = document.querySelector(".popup_add");
const formAddCard = document.querySelector(".popup__form-add");

const cardTemplate = document.querySelector("#card__template").content;
const popupImage = document.querySelector(".popup_image");
const imageFullsize = popupImage.querySelector(".popup__image-fullsize");
const titleFullsize = popupImage.querySelector(".popup__image-title");
const titleInput = formAddCard.querySelector(".popup__input_type_title");
const linkInput = formAddCard.querySelector(".popup__input_type_link");

//open popup func
function openPopup(popup) {
  popup.classList.add('popup_opened');

  popup.addEventListener('click', closeWithOverlay);
  document.addEventListener('keydown', closeWithEscapeButton);
};

//close popup func
function closePopup (popup) {
  popup.classList.remove('popup_opened');
  popup.removeEventListener('click', closeWithOverlay);
  document.removeEventListener('keydown', closeWithEscapeButton);
};

//opening Add Cards popup
buttonOpenAddCardForm.addEventListener("click", () => {
  openPopup(popupAddCard);
  resetValidation(formAddCard, formValidationConfig);
});

// closing all popups
closeButtons.forEach((button) =>
  button.addEventListener("click", () => closePopup(button.closest(".popup")))
);

//editing name and bio in profile
function submitEditProfileForm(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileBio.textContent = jobInput.value;
  closePopup(popupEditProfile);
}

//opening Edit Profile popup
buttonOpenEditProfileForm.addEventListener("click", () => {
  openPopup(popupEditProfile);
  resetValidation(formEditProfile, formValidationConfig);
  nameInput.value = profileName.textContent;
  jobInput.value = profileBio.textContent;
});

//finding parental object
const cardsRoot = document.querySelector(".cards");

//card template
// https://loremflickr.com/1024/720
function addCard(name, link) {
  const newCard = cardTemplate.querySelector(".card").cloneNode(true);
  const cardTitle = newCard.querySelector(".card__title");
  const cardImage = newCard.querySelector(".card__image");
  const cardLike = newCard.querySelector(".card__like");
  const cardDelete = newCard.querySelector(".card__delete");

  cardImage.src = link;
  cardTitle.textContent = name;
  cardImage.alt = name;

  cardLike.addEventListener("click", (evt) => {
    evt.target.classList.toggle("card__like_pressed");
  });
  cardDelete.addEventListener("click", () => {
    newCard.remove();
  });
  cardImage.addEventListener("click", () => {
    openPopup(popupImage);

    imageFullsize.src = link;
    titleFullsize.textContent = name;
    imageFullsize.alt = name;
  });
  return newCard;
}

// Get title and link for new cards
function submitAddCardForm(evt) {
  evt.preventDefault();
  cardsRoot.prepend(addCard(titleInput.value, linkInput.value));
  closePopup(popupAddCard);
  evt.target.reset();
}

//insert cards array into parental object
function renderCards() {
  const baseArray = initialCards.map((card) => addCard(card.name, card.link));
  cardsRoot.prepend(...baseArray);
}

// closing popups with overlay click
const closeWithOverlay = (evt) => {
  if (evt.target.classList.contains('popup_opened')) {
    closePopup(evt.target);
  };
};

//closing popups with Escape button
const closeWithEscapeButton = (evt) => {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_opened')
    closePopup(openedPopup);
  };
};

//code from practice works #4-5
formEditProfile.addEventListener("submit", submitEditProfileForm);
formAddCard.addEventListener("submit", submitAddCardForm);
renderCards();
