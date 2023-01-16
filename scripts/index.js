// Edit Profile Popup
const popups = document.querySelectorAll('.popup')
const openEditPop = document.querySelector(".profile__button-edit");
const closeButtons = document.querySelectorAll(".popup__close");
const editPopUp = document.querySelector(".popup_edit");
const submitPop = document.querySelector(".popup__save");
const popEditForm = document.querySelector(".popup__form-edit");
const nameInput = popEditForm.querySelector(".popup__input_type_name");
const jobInput = popEditForm.querySelector(".popup__input_type_bio");
const profileName = document.querySelector(".profile__name");
const profileBio = document.querySelector(".profile__bio");

// Add Cards Popup
const openAddPop = document.querySelector('.profile__button-add');
const addPopUp = document.querySelector(".popup_add");
const popAddForm = document.querySelector(".popup__form-add");

const cardTemplate = document.querySelector('#card__template').content; 
const popImageForm = document.querySelector('.popup_image');
const imageFullsize = popImageForm.querySelector('.popup__image-fullsize');
const titleFullsize = popImageForm.querySelector('.popup__image-title');
const titleInput = popAddForm.querySelector(".popup__input_type_title");
const linkInput = popAddForm.querySelector(".popup__input_type_link");

//openClose popup function
function openClose (popEl) {
  popEl.classList.toggle('popup_opened')
}

//opening Add Cards popup
openAddPop.addEventListener("click",() => {
  openClose(addPopUp);
})

// closing all popups
closeButtons.forEach((button) => button.addEventListener('click', () => openClose(button.closest('.popup'))))

//editing name and bio in profile
function editFormSubmitHandler(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileBio.textContent = jobInput.value;
  openClose(editPopUp);
}

//opening Edit Profile popup
openEditPop.addEventListener("click", () => {
  openClose(editPopUp);
  nameInput.value = profileName.textContent
  jobInput.value = profileBio.textContent
});

//finding parental object
const cardsRoot = document.querySelector('.cards');

//card template
// https://loremflickr.com/1024/720
function addCard(name, link) {
  const newCard = cardTemplate.querySelector('.card').cloneNode(true);
  const cardTitle = newCard.querySelector('.card__title');
  const cardImage = newCard.querySelector('.card__image');
  const cardLike = newCard.querySelector('.card__like');
  const cardDelete = newCard.querySelector('.card__delete');

  cardImage.src = link;
  cardTitle.textContent = name;
  cardImage.alt = name;

  cardLike.addEventListener('click', (evt) => { evt.target.classList.toggle('card__like_pressed');});
  cardDelete.addEventListener('click', () => { newCard.remove()});
  cardImage.addEventListener('click', () => { 
    openClose(popImageForm);

    imageFullsize.src = link; 
    titleFullsize.textContent = name;
    imageFullsize.alt = name;

  })
  return newCard;
}

// Get title and link for new cards
function addFormSubmitHandler (evt) {
  evt.preventDefault();
  cardsRoot.prepend(addCard(titleInput.value, linkInput.value));
  openClose(addPopUp);
  evt.target.reset()
}

//insert cards array into parental object
function renderCards() {
  const baseArray = initialCards.map(card => addCard(card.name, card.link));
  cardsRoot.prepend(...baseArray);
}


popEditForm.addEventListener("submit", editFormSubmitHandler);
popAddForm.addEventListener("submit", addFormSubmitHandler);
renderCards()