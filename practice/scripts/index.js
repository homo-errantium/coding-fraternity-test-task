const addForm = document.getElementById('popupAddForm');
const mainButton = document.querySelector('.main__button');
const resetButton = document.querySelector('.popup__cancel-button');
const saveButton= document.querySelector('.popup__save-button')
const popupAdd = document.querySelector('.popup_type_add');
const popupInfo = document.querySelector('.popup_type_info');
const radioButton = document.querySelector('.popup__radio-button');
const radioItemsList = document.querySelector('.popup__radio-items-list');
const radioButtonsList = Array.from(
    radioItemsList.querySelectorAll('button')
);

const postsGetButton = document.getElementById('postsGetButton');

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

/*--------установка слушателя на радио-кнопку------*/
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

saveButton.addEventListener('click', () => {
    disableSubmitButton();
    closePopup(popupAdd);
    
    setTimeout(function () {
        popupInfo.classList.add('popup_opened');
    },1000)
    setTimeout(function () {
        const popupInfo = document.querySelector('.popup_type_info');
        popupInfo.classList.remove('popup_opened');
    },3000)
});

function disableSubmitButton() {
    saveButton.classList.add('popup__save-button_inactive');
    // buttonElement.setAttribute('disabled', 'disabled');
    saveButton.setAttribute('disabled', 'disabled');
}

/*навешивание слушателей на радио-кнопки*/
function setLabelEventListeners() {    
    radioButtonsList.map(button => {
        button.addEventListener('click', (e) => {
            radioButton.value = e.target.textContent;
            handleDirectionMenu();
        })
    });
}

setLabelEventListeners(); 

/*сброс значений*/
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
    disableSubmitButton();
}

/*--------вызов навешивания валидации-----------*/
enableValidation(selectors);


/*--------Api-----------*/

postsGetButton.addEventListener('click', () => {
const json = getPosts();
const data = JSON.parse(json);
const table = document.createElement('table');

// Заполнение таблицы данными
data.forEach((item) => {
    const row = table.insertRow();
    Object.values(item).forEach((text) => {
        const cell = row.insertCell();
        cell.textContent = text;
    });
});

document.body.appendChild(table);
} );
