const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

// Edit Profile Popup
const popup = document.querySelectorAll('.popup')
const openEditPop = document.querySelector(".profile__button-edit");
const closePop = document.querySelectorAll(".popup__close");
const editPopUp = document.querySelector(".popup__edit");
const submitPop = document.querySelector(".popup__save");
const popEditForm = document.querySelector(".popup__form-edit");
const nameInput = popEditForm.querySelector(".popup__input_type_name");
const jobInput = popEditForm.querySelector(".popup__input_type_bio");
const profileName = document.querySelector(".profile__name");
const profileBio = document.querySelector(".profile__bio");
// Add Cards Popup
const openAddPop = document.querySelector('.profile__button-add');
const addPopUp = document.querySelector(".popup__add");
const popAddForm = document.querySelector(".popup__form-add");
//openClose popup function
function openClose (popEl) {
  popEl.classList.toggle('popup_opened')
}

//editing name and bio in profile
function editFormSubmitHandler(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileBio.textContent = jobInput.value;
  openClose(editPopUp);
}

// Get title and link for new cards
function addFormSubmitHandler (evt) {
  evt.preventDefault();
  const titleInput = popAddForm.querySelector(".popup__input_type_title");
  const linkInput = popAddForm.querySelector(".popup__input_type_link");
  cardsRoot.prepend(addCard(titleInput.value, linkInput.value));
  openClose(addPopUp);
  evt.target.reset()
}

//opening Edit Profile popup
openEditPop.addEventListener("click", () => {
  openClose(editPopUp);
  nameInput.value = profileName.textContent
  jobInput.value = profileBio.textContent
});

//opening Add Cards popup
openAddPop.addEventListener("click",() => {
  openClose(addPopUp);
})

//closing all popups
closePop.forEach(cp => cp.addEventListener("click", () => {
  popup.forEach(popEl => popEl.classList.contains('popup_opened') && openClose(popEl))
}));

popEditForm.addEventListener("submit", editFormSubmitHandler);
popAddForm.addEventListener("submit", addFormSubmitHandler);

//finding parental object
const cardsRoot = document.querySelector('.cards');

//card template
// https://loremflickr.com/1024/720
function addCard(name, link) {
  const cardTemplate = document.querySelector('#card__template').content; 
  const newCard = cardTemplate.querySelector('.card').cloneNode(true);
  const cardTitle = newCard.querySelector('.card__title');
  const cardImage = newCard.querySelector('.card__image');
  const cardLike = newCard.querySelector('.card__like');
  const cardDelete = newCard.querySelector('.card__delete');

  cardImage.src = link;
  cardTitle.textContent = name;
  cardImage.alt = name;

  cardLike.addEventListener('click', (evt) => { evt.target.classList.toggle('.card__like_pressed');});
  cardDelete.addEventListener('click', () => { newCard.remove()});
  cardImage.addEventListener('click', () => { 
    const popImageForm = document.querySelector('.popup__image');
    openClose(popImageForm);

    const imageFullsize = popImageForm.querySelector('.popup__image-fullsize');
    const titleFullsize = popImageForm.querySelector('.popup__image-title');
    imageFullsize.src = link; 
    titleFullsize.textContent = name;
    imageFullsize.alt = name;

  })
  return newCard;
}

//insert cards array into parental object
function renderCards() {
  const baseArray = initialCards.map(card => addCard(card.name, card.link));
  cardsRoot.prepend(...baseArray);
}

renderCards()