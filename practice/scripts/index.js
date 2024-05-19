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


/* ============== Popup ============== */
/*--------установка слушателя на радио-кнопку------*/
radioButton.addEventListener('click', () => {
    handleDirectionMenu();
});

/*--------вызов ф-ии закрытие по оверлею------*/
closePopupOverlay();


/*--------вызов попапа по клику------*/
mainButton.addEventListener('click', () => {
    openPopup(popupAdd);
});


/*--------отправка формы------*/
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


setLabelEventListeners(); 

/*навешивание слушателей на кнопку сброса*/
resetButton.addEventListener('click', () => {
    cleanErrorInput(popupAdd);
    resetAllValue();
    closePopup(popupAdd);
});

/*--------вызов навешивания валидации-----------*/
enableValidation(selectors);


/* ============== Table ============== */
const setData = async () => {
    let data = await getPosts(baseUrl);

    const tableId = document.getElementById('table');
    const mainTable = document.getElementById('main-table');
    const inputSearchId = document.getElementById('input-search');


    if (!mainTable.contains(tableId) && !mainTable.contains(inputSearchId)) {
        const inputSearch = createInputSearch();
        mainTable.appendChild(inputSearch);

        const table = createTable(data);
        mainTable.appendChild(table);
    } else {

        mainTable.removeChild(inputSearchId);
        mainTable.removeChild(tableId);
        setData();
    }
};

/*навешивание слушателей на кнопку таблицы*/
postsGetButton.addEventListener('click', () => {
  setData();
});
