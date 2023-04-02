import { initialCards, formValidationConfig } from "../utils/config.js";
import FormValidator from "../components/FormValidator.js";
import Card from "../components/Card.js";
import "./index.css";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import { buttonOpenAddForm, buttonOpenEditForm, formEdit, formAdd } from "../utils/constants.js";

const imageFullsize = new PopupWithImage(".popup_image");

// fullsize card opener
function handleCardClick(name, link) {
  imageFullsize.open(name, link);
}

//create new card func
function createCard(item) {
  const card = new Card(
    item.name,
    item.link,
    "#card__template",
    handleCardClick
  );
  return card.createCard();
}

// Render created cards with Section class
const cardSection = new Section(
  {
    renderer: (item) => {
      cardSection.addItem(createCard({ name: item.name, link: item.link }));
    },
  },
  ".cards"
);
cardSection.renderItems(initialCards);

const userProfile = new UserInfo({
  username: ".profile__name",
  userjob: ".profile__bio",
});

const popupWithEditForm = new PopupWithForm(".popup_edit", {
  submitForm: (values) => {
    userProfile.setUserInfo(values);
    popupWithEditForm.close();
  },
});

const popupWithAddForm = new PopupWithForm(".popup_add", {
  submitForm: (values) => {
    cardSection.addItem(
      createCard({ name: values.cardname, link: values.cardurl })
    );
    popupWithAddForm.close();
  },
});

const formEditValidation = new FormValidator(formValidationConfig, formEdit);

const formAddCardValidation = new FormValidator(formValidationConfig, formAdd);

// enable validation
formEditValidation.enableValidation();
formAddCardValidation.enableValidation();

// Listeners
buttonOpenEditForm.addEventListener("click", () => {
  popupWithEditForm.open();
  popupWithEditForm.setInputValues(userProfile.getUserInfo());
  formEditValidation.resetValidation();
});

buttonOpenAddForm.addEventListener("click", () => {
  formAddCardValidation.resetValidation(); // validation reset
  popupWithAddForm.open();
});

// popup listeners
popupWithEditForm.setEventListeners();
popupWithAddForm.setEventListeners();
imageFullsize.setEventListeners();