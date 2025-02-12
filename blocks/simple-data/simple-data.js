export default async function decorate(block) {
    createInputFieldAndButton(block);
    loadTableData(block);
    listenEvents(block);
}

async function loadTableData(block) {
    const url = block.querySelector('.simple-data a') || block.querySelector('.simple-data table').getAttribute('data-url');
    let offset = block.querySelector('.offset-input').value || 0;
    let limit = block.querySelector('.limit-input').value || 10;
    console.log(offset, limit, url);
    const response = await fetch(url+`?limit=${limit}&offset=${offset}`);
    const data = await response.json();
    let table = document.createElement('table');
    table.setAttribute("data-url", url);
    let tbody = document.createElement('tbody');
    createTableRow(tbody, {'Country':'Country','Segment':'Segment','Profit':'Profit'}, 'th');
    data.data.forEach(element => {
       createTableRow(tbody, element, 'td');
    });
    table.append(tbody);
    block.querySelector('.simple-data .button-container').textContent = '';
    block.querySelector('.simple-data .button-container').append(table);
}

function createInputFieldAndButton(block) {
    let inputField = block.querySelector('.simple-data div');
    inputField.classList.add('offset-container');
    let offsetInput = createInputField('offset');
    inputField.firstElementChild.append(offsetInput);
    let limitInput = createInputField('limit');
    inputField.firstElementChild.append(limitInput);
    let button = createButton('submit');
    inputField.firstElementChild.append(button);
}

function createTableRow(tbody, element, row) {
    let tr = document.createElement('tr');
    let td1 = document.createElement(row);
    td1.textContent = element.Country;
    let td2 = document.createElement(row);
    td2.textContent = element.Profit;
    let td3 = document.createElement(row);
    td3.textContent = element.Segment;
    tr.append(td1, td2, td3);
    tbody.append(tr);
}

function createInputField(text) {
    let input = document.createElement('input');
    input.type = 'text';
    input.placeholder = text.charAt(0).toUpperCase() + text.slice(1);
    input.classList.add(`${text}-input`);
    return input;
}

function createButton(text) {
    let button = document.createElement('button');
    button.textContent = text;
    button.classList.add(`${text}-button`);
    return button;
}

function listenEvents(block) {
    block.querySelector('.submit-button').addEventListener('click',() => {
        loadTableData(block);
        console.log(block)
    } );
}