const initialCards = [
    {
      name: 'Рабочее место',
      link: './images/card1.jpg'
    },
    {
      name: 'Рефакторинг',
      link: './images/card2.jpg'
    },
    {
      name: 'Праздник к нам приходит',
      link: './images/card3.jpg'
    },
    {
      name: 'Прокрастинация',
      link: './images/card4.jpg'
    },
    {
      name: 'Ночной дожор',
      link: './images/card5.jpg'
    },
    {
      name: 'Вечерняя прогулка',
      link: './images/card6.jpg'
    }
  ];
  
  const formValidationConfig = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__submit-button',
    inactiveButtonClass: 'popup__submit-button_inactive',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__input-error_active'
  };
  
  export {formValidationConfig, initialCards};
  