


const createTableHead = (data, table) => {
    const thead = document.createElement('thead');
    const headerTr = document.createElement('tr');
  if (data) {
    Object.keys(data[0]).forEach((key, columnNo) => {
      const th = document.createElement('th');
      th.textContent = key;
      th.addEventListener('click', () => {
        th.classList.toggle('up');
        let dirUp = th.classList.contains('up');
        sortTable(table, columnNo, dirUp );
    });
        headerTr.appendChild(th);
        thead.appendChild(headerTr);
        table.appendChild(thead);
    })} 
    else {throw new Error('no data')}
    
};

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

const createTable = (data) => {
  // const mainTable = document.getElementById('main-table')
  const inputSearch = document.createElement('input');
  inputSearch.setAttribute('type', 'search');
  inputSearch.setAttribute('id', 'inputSearch');
  document.body.appendChild(inputSearch);

  const table = document.createElement('table');
  table.setAttribute('id', 'table');

  createTableHead(data, table);
  createTableBody(data, table);

  return table;
};


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
