import './index.css'
import FormValidator from '../components/FormValidator.js'
import { formValidationConfig } from '../utils/config.js'
import Card from '../components/Card.js'
import Section from '../components/Section.js'
import PopupWithImage from '../components/PopupWithImage.js'
import PopupWithForm from '../components/PopupWithForm.js'
import PopupWithConfirmation from '../components/PopupWithConfirmation.js'
import UserInfo from '../components/UserInfo.js'
import Api from '../components/Api.js'
import { apiConfig } from '../utils/apiConfig.js'
import { buttonOpenAddForm, buttonOpenEditForm, formEdit, formAdd, formAvatar, buttonOpenAvatarForm } from '../utils/constants.js'

const api = new Api(apiConfig);
const imageFullsize = new PopupWithImage('.popup_image');
let currentUserId;

//create new card func
function createCard(cardData) {
  const card = new Card(cardData, currentUserId, '#card__template', {
    handleCardClick: (name, link) => imageFullsize.open(name, link),
    handleCardDelete: (cardId, cardElement) => popupWithConfirmation.open(cardId, cardElement),
    handleCardLike: (cardId) => {
      api.putCardLike(cardId)
        .then((res) => card.renderCardLikes(res))
        .catch((err) => console.log('Ошибка лайка: ', err))
    },
    handleCardDislike: (cardId) => {
      api
        .deleteCardLike(cardId)
        .then((res) => card.renderCardLikes(res))
        .catch((err) => console.log('Ошибка удаления лайка: ', err))
    },
  })
  return card.createCard()
};

Promise.all([api.getUserInfo(), api.getInitialCards()])
  .then(([userData, cardList]) => {
    currentUserId = userData._id;
    console.log(currentUserId)
    userProfile.setUserInfo({
      username: userData.name,
      userjob: userData.about,
    })
    userProfile.setUserAvatar(userData.avatar)
    cardSection.renderItems(cardList)
  })
  .catch((err) => {
    console.log('Ошибонька какая-то с отрисовонькой: ', err)
    userProfile.setUserInfo({
      username: 'Жак-Ив Кусто',
      userjob: 'Исследователь океанов',
    })
    document.querySelector(
      '.cards',
    ).innerHTML = `<p style='text-align: center'>У-у-пс... Ошибонька</p>`
  });

// Render created cards with Section class
const cardSection = new Section(
  {
    renderer: (item) => {
      cardSection.addItem(createCard(item))
    },
  },
  '.cards',
);

const popupWithConfirmation = new PopupWithConfirmation('.popup_delete', {
  cardDelete: (cardId, cardElement) => {
    popupWithConfirmation.proccessActionButtonText('Удаляем...');
    api.deleteCard(cardId)
      .then (() => {
        cardElement._deleteCard();
        popupWithConfirmation.close();
      })
      .catch(err => console.log('Ошибонька при удалении: ', err))
      .finally(() => popupWithConfirmation.finalActionButtonText('Да'))
  },
});

const userProfile = new UserInfo({
  username: '.profile__name',
  userjob: '.profile__bio',
  avatar: '.profile__image',
});

const popupWithEditForm = new PopupWithForm('.popup_edit', {
  submitForm: (values) => {
    userProfile.setUserInfo(values)
    popupWithEditForm.proccessActionButtonText('Сохранение')
    api.setUserInfo({
      name: values.username,
      about: values.userjob
    })
    .catch(err => console.log('Ошибонька с редактированием профиля: ', err))
    .finally(() => popupWithEditForm.finalActionButtonText('Сохранить'))
  }
});

const popupWithAddForm = new PopupWithForm('.popup_add', {
  submitForm: (values) => {
    popupWithAddForm.proccessActionButtonText('Создаем');
    api.createCard({name: values.cardname, link: values.cardurl})
      .then((cardData) => {
        cardSection.addItem(createCard(cardData));
        popupWithAddForm.close();
      })
      .catch(err => console.log('Ошибонька при добавлении места: ', err))
      .finally(() => popupWithAddForm.finalActionButtonText('Создать'))
  }
});

const popupEditAvatar = new PopupWithForm('.popup_avatar', {
  submitForm: (value) => {
    popupEditAvatar.proccessActionButtonText('Сохраняем');
    api.setUserAvatar({
      avatar: value.avatarurl
    })
      .then((res) => {
        userProfile.setUserAvatar(res.avatar)
        popupEditAvatar.close();
      })
      .catch()
      .finally(() => popupEditAvatar.finalActionButtonText('Сохранить'))
  }
});

const formEditValidation = new FormValidator(formValidationConfig, formEdit);
const formAddCardValidation = new FormValidator(formValidationConfig, formAdd);
const formEditAvatarValidation = new FormValidator(formValidationConfig, formAvatar);

// enable validation
formEditValidation.enableValidation();
formAddCardValidation.enableValidation();
formEditAvatarValidation.enableValidation();

// Listeners
buttonOpenEditForm.addEventListener('click', () => {
  popupWithEditForm.open()
  popupWithEditForm.setInputValues(userProfile.getUserInfo())
  formEditValidation.resetValidation()
})

buttonOpenAddForm.addEventListener('click', () => {
  formAddCardValidation.resetValidation() // validation reset
  popupWithAddForm.open()
})

buttonOpenAvatarForm.addEventListener('click', () => {
  formEditAvatarValidation.resetValidation();
  popupEditAvatar.open();
});

// popup listeners
popupWithEditForm.setEventListeners();
popupWithAddForm.setEventListeners();
imageFullsize.setEventListeners();
popupEditAvatar.setEventListeners();
popupWithConfirmation.setEventListeners();