const openPop = document.querySelector(".profile__button-edit");
const closePop = document.querySelector(".popup__close");
let popForm = document.querySelector(".popup__form");
let popUp = document.querySelector(".popup");
const submitPop = document.querySelector(".popup__save");
let nameInput = popForm.querySelector(".popup__input_type_name");
let jobInput = popForm.querySelector(".popup__input_type_bio");
let profileName = document.querySelector(".profile__name");
let profileBio = document.querySelector(".profile__bio");

function openClose () {
  popUp.classList.toggle('popup_opened');
}

function formSubmitHandler(evt) {
  evt.preventDefault();
  
  profileName.textContent = nameInput.value;
  profileBio.textContent = jobInput.value;
  openClose();
}

openPop.addEventListener("click", () => {
  openClose();
  nameInput.value = profileName.textContent
  jobInput.value = profileBio.textContent
});

closePop.addEventListener("click", () => {
  openClose();
});

popForm.addEventListener("submit", formSubmitHandler);