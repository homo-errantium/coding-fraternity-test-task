const addForm = document.getElementById('popupAddForm');
const mainButton = document.querySelector('.main__button');
const resetButton = document.querySelector('.popup__cancel-button');
const saveButton= document.querySelector('.popup__save-button')
const popupAdd = document.querySelector('.popup_type_add');
const radioButton = document.querySelector('.popup__radio-button');
const radioItemsList = document.querySelector('.popup__radio-items-list');
const radioItemsLabelList = Array.from(
    radioItemsList.querySelectorAll('label')
);

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


radioButton.addEventListener('click', () => {
    handleDirectionMenu();
});

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

closePopupOverlay();

mainButton.addEventListener('click', () => {
    openPopup(popupAdd);
});

/*--------ф-я закрытия по клавише------*/
function handleEscapeButton(event) {
  if (event.key === "Escape") {
    const currentPopupItem = document.querySelector(".popup_opened");
    closePopup(currentPopupItem);
  }
}

/*--------добавление новых данных-----------*/
function handleFormSubmitAdd(evt) {
    evt.preventDefault();
    addCard({ name: nameInputAdd.value, link: linkInputAdd.value });
    closePopup(popupAdd);
    evt.target.reset();
    const buttonAdd = evt.submitter;
    disableSubmitButton(buttonAdd, selectors);
}


function disableSubmitButton() {
    saveButton.classList.add('popup__save-button_inactive');
    // buttonElement.setAttribute('disabled', 'disabled');
    saveButton.setAttribute('disabled', 'disabled');
    console.log(saveButton);
}


function setLabelEventListeners() {
    radioItemsLabelList.map(label => {
        label.addEventListener('click', (e) => {
            radioButton.textContent = e.target.textContent;
            handleDirectionMenu();
        })
    });
    
    
}

setLabelEventListeners(); 

function resetAllValue() {
    evt.preventDefault();
    const inputList = Array.from(
        addForm.querySelectorAll('.popup__input')
    ); //массив инпутов одной формы
     inputList.forEach((inputElement) => {
         inputElement.value = ''
     });
    radioButton.textContent = '';
}

// saveButton.addEventListener('click', () => {
//     disableSubmitButton();
// })

resetButton.addEventListener('click', () => {
    resetAllValue();
});

/*--------навешивание валидации на формы-----------*/
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
}

/*--------вызов навешивания валидации-----------*/
enableValidation(selectors);
