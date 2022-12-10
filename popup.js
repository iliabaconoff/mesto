const openPop = document.querySelector(".button_edit");
const closePop = document.querySelector(".button_close");
let popForm = document.querySelector(".popup__form");
let popUp = document.querySelector(".popup");
const submitPop = document.querySelector(".button_form");
let nameInput = popForm.querySelector(".popup__input-name");
let jobInput = popForm.querySelector(".popup__input-bio");
let profileName = document.querySelector(".profile__name");
let profileBio = document.querySelector(".profile__bio");

openPop.addEventListener("click", () => {
  popUp.classList.add("opened");
  nameInput.value = profileName.textContent
  jobInput.value = profileBio.textContent
});

closePop.addEventListener("click", () => {
  popUp.classList.remove("opened");
});

function formSubmitHandler(evt) {
  evt.preventDefault();

  profileName.textContent = nameInput.value;
  profileBio.textContent = jobInput.value;
  popUp.classList.remove('opened')
}

popForm.addEventListener("submit", formSubmitHandler);
