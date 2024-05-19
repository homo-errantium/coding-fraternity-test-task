const selectors = {
    containerSelector: '.popup__container',
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__save-button',
    inactiveButtonClass: 'popup__save-button_inactive',
    inputErrorClass: 'popup__input_type_error',
    errorTextClass: 'popup__input-error-text',
    fieldSelector: '.popup__set',
    popupCloseClass: '.popup__close',
};

/*--------ф-я открытия/закрытия меню выбора направления------*/
function handleDirectionMenu() {
    radioItemsList.classList.toggle('popup__radio-items-list_opened');

}

/*--------ф-я открытия/закрытия попап-а------*/
function closePopup(popup) {
    document.removeEventListener("keydown", handleEscapeButton);
    popup.classList.remove("popup_opened");
}

function openPopup(popup) {
  document.addEventListener('keydown', handleEscapeButton);
  popup.classList.add('popup_opened');
}


/*--------ф-я закрытия при клике на оверлей------*/
function closePopupOverlay() {
    const popupList = Array.from(document.querySelectorAll(".popup"));
    popupList.forEach((popupElement) => {
        popupElement.addEventListener("mousedown", (evt) => {
            if (evt.target.classList.contains("popup_opened")) {
                closePopup(popupElement);
            }
            if (evt.target.classList.contains("popup__close")) {
                closePopup(popupElement);
            }
        });
    });
}


/*ф-я отключения кнопки*/
function disableSubmitButton() {
    saveButton.classList.add('popup__save-button_inactive');
    saveButton.setAttribute('disabled', 'disabled');
}

/*ф-я навешивания слушателей на радио-кнопки*/
function setLabelEventListeners() {
    radioButtonsList.map((button) => {
        button.addEventListener('click', (e) => {
            radioButton.value = e.target.textContent;
            handleDirectionMenu();
        });
    });
}


/*--------ф-я сброса полей-----------*/
function resetAllValue() {
    // evt.preventDefault();
    const inputList = Array.from(
        addForm.querySelectorAll('.popup__input')
    ); //массив инпутов одной формы
     inputList.forEach((inputElement) => {
         inputElement.value = ''
     });
    radioButton.textContent = '';
}


/*--------ф-я валидации на формы-----------*/
function enableValidation(selectors) {
    const formList = Array.from(
        document.querySelectorAll(selectors.formSelector)
    ); //массив форм
    formList.forEach((formElement) => {
        formElement.addEventListener("submit", function (evt) {
            evt.preventDefault();
        });
        const fieldsetList = Array.from(
            formElement.querySelectorAll(selectors.fieldSelector)
        );
        fieldsetList.forEach((fieldSet) => {
            setEventListeners(fieldSet, selectors);
        });
    });
    disableSubmitButton();
}

/*--------ф-я закрытия по клавише------*/
function handleEscapeButton(event) {
  if (event.key === "Escape") {
    const currentPopupItem = document.querySelector(".popup_opened");
    closePopup(currentPopupItem);
  }
}
