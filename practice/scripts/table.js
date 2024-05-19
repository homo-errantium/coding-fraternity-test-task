// -------------создание заголовков таблицы---------------
const createTableHead = (data, table) => {
    const thead = document.createElement('thead');
    const headerTr = document.createElement('tr');
  if (data) {

    Object.keys(data[0]).forEach((key, columnNo) => {
      const th = document.createElement('th');
      th.textContent = key;
      th.setAttribute('id', `${key}`)
      th.classList.add('table__header');

      // создание картинки для заголовка колонки
      const arrowImage = createImage();
      th.appendChild(arrowImage);

      // навешивание слушателей на заголовки колонок 
      th.addEventListener('click', () => {
        th.classList.toggle('table__header_up');
        let dirUp = th.classList.contains('table__header_up');
        sortTable(table, columnNo, dirUp);
        resetSortTable(table, th.id);
      });

        headerTr.appendChild(th);
        thead.appendChild(headerTr);
        table.appendChild(thead);
    })} 
    else {throw new Error('no data')}
    
};

// -------------сброс заголовков таблицы---------------
const resetSortTable = (table, thId) => {
  const thArr = table.querySelectorAll('th');
  thArr.forEach(item => { if (item.id !== thId && item.classList.contains('table__header_up'))
      item.classList.remove('table__header_up');} );
};

// -------------создание изображения стрелки для заголовков таблицы---------------
const createImage = () => {
  const image = document.createElement('div');
    image.setAttribute('alt', 'стрелка заголовка колонки')
    image.classList.add('table__image');
    return image;
};

// -------------создание тела таблицы---------------
const createTableBody = (data, table) => {
  const tbody = document.createElement('tbody')
  if (data) {
      data.forEach((item) => {
          const tr = table.insertRow();
          Object.values(item).forEach((text) => {
              const td = tr.insertCell();
              td.textContent = text;
          });
        tbody.appendChild(tr);
      });
    table.appendChild(tbody);
  } else {
      throw new Error('no data');
  }
};

// -------------создание таблицы (заголовки + тело)---------------
const createTable = (data) => {
  const table = document.createElement('table');
  table.setAttribute('id', 'table');

  createTableHead(data, table);
  createTableBody(data, table);
  return table;
};

// -------------создание поисковой строки---------------
const createInputSearch = () => {
  const inputSearch = document.createElement('input');
  inputSearch.setAttribute('type', 'search');
  inputSearch.setAttribute('id', 'input-search');
  inputSearch.classList.add('main__input');
  const label = document.createElement('label')
  label.setAttribute('for', 'input-search');
  label.appendChild(inputSearch)
  return label;
}

// -------------сортировка по колонкам---------------=
function sortTable(table, sortColumn, dirUp) {
  const tableBody = table.querySelector('tbody');
  const tableData = table2data(tableBody);
  if (sortColumn == 1 || sortColumn == 0) {
      if (dirUp) {
          tableData.sort((a, b) => {
              if (+a[sortColumn] > +b[sortColumn]) {
                  return 1;
              }
              return -1;
          });
      } else {
          tableData.sort((a, b) => {
              if (+a[sortColumn] < +b[sortColumn]) {
                  return 1;
              }
              return -1;
          });
      }
  } else {
      if (dirUp) {
          tableData.sort((a, b) => {
              if (a[sortColumn] > b[sortColumn]) {
                  return 1;
              }
              return -1;
          });
      } else {
          tableData.sort((a, b) => {
              if (a[sortColumn] < b[sortColumn]) {
                  return 1;
              }
              return -1;
          });
      }
  }
    data2table(tableBody, tableData);
}

// -------------конвертация  данных из таблицы в массивы ---------------
function table2data(tableBody) {
    const tableData = []; 
    tableBody.querySelectorAll('tr').forEach((row) => {
        const rowData = [];
        row.querySelectorAll('td')
            .forEach((cell) => {
                rowData.push(cell.innerText); 
            });
        tableData.push(rowData);
    });
    return tableData;
}

// -------------конвертация  данных из массива в таблицу ---------------
function data2table(tableBody, tableData) {
    tableBody.querySelectorAll('tr')
        .forEach((row, i) => {
            const rowData = tableData[i];
            row.querySelectorAll('td') 
                .forEach((cell, j) => {
                    cell.innerText = rowData[j]; 
                });
        });
}
