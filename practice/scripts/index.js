const mainButton = document.querySelector('.main__button');
const popupAdd = document.querySelector('.popup_type_add');
const radioButton = document.querySelector('.popup__radio-button');
const radioItemsList = document.querySelector('.popup__radio-items-list');
const radioItemsLabelList = Array.from(
    radioItemsList.querySelectorAll('label')
);


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

function setLabelEventListeners() {
    radioItemsLabelList.map(label => {
        label.addEventListener('click', (e) => {
            radioButton.textContent = e.target.textContent;
            handleDirectionMenu();
        })
    });
    
}

setLabelEventListeners(); 

/*--------вызов навешивания валидации-----------*/
enableValidation(selectors);
