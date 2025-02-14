// Variables
let totalRecords;
let recordsPerPage = 20;
let currentPage = 1;

// Main function
export default async function decorate(block) {
    // createInputFieldAndButton(block);
    loadTableContent(block);
}

// Event Listeners
function listenEvents(block) {
    block.querySelector('.submit-button')?.addEventListener('click', () => {
        loadTableData(block);
    });

    block.querySelector('.next-button').addEventListener('click', () => {
        currentPage += 1;
        loadTableContent(block);
    });

    block.querySelector('.previous-button').addEventListener('click', () => {
        currentPage -= 1;
        loadTableContent(block);
    });

    block.querySelectorAll('.pages-div')?.forEach((page) => {
        page?.addEventListener('click', (e)=>{
            currentPage = parseInt(e.target.innerText);
            loadTableContent(block);
        })
    })
}

// Loaders
async function loadTableContent(block) {
    await loadTableData(block);
    loadPagination(block);
    listenEvents(block);
}



async function loadTableData(block) {
    const url = block?.querySelector('.simple-data a') || block?.querySelector('.simple-data table').getAttribute('data-url');
    let offset = block.querySelector('.offset-input')?.value || (currentPage - 1) * recordsPerPage;
    let limit = block.querySelector('.limit-input')?.value || recordsPerPage;
    const response = await fetch(url + `?limit=${limit}&offset=${offset}`);
    const data = await response.json();
    totalRecords = data.total;
    loadTableSummary(block, data)
    let table = document.createElement('table');
    table.setAttribute("data-url", url);
    let tbody = document.createElement('tbody');
    
    createTableRow(tbody, {'Country': 'Country', 'Segment': 'Segment', 'Profit': 'Profit'}, 'th');
    data.data.forEach(element => {
        createTableRow(tbody, element, 'td');
    });
    table.append(tbody);
    block.querySelector('.simple-data .button-container').textContent = '';
    block.querySelector('.simple-data .button-container').append(table);
}

function loadTableSummary(block, data) {
    let container = block.querySelector('.simple-data .button-container').parentElement;
    removeExistingClass(container, 'table-summary');
    let div = createDiv('table-summary');
    div.innerHTML = `<p>Total: ${data.offset + 1}-${data.offset + data.limit} of ${totalRecords}`
    container.append(div);
}


async function loadPagination(block) {
    let container = block.closest('.simple-data');
    removeExistingClass(container, 'pagination')
    let pagination = createDiv('pagination');
    let previous = createButton('previous');
    if (currentPage == 1) {
        previous.setAttribute('disabled', 'true');
    }
    let pages = createDiv('pages');
    let pagesHtml = '';
    for (let i = 1; i <= Math.ceil(totalRecords / recordsPerPage); i++) {
        pagesHtml += `<span class="pages-div ${i == currentPage ? 'active' : ''}">${i}</span>`;
    }
    pages.innerHTML = pagesHtml;
    
    let next = createButton('next');
    if (currentPage == Math.ceil(totalRecords / recordsPerPage)) {
        next.setAttribute('disabled', 'true');
    }
    
    pagination.append(previous, pages, next);
    container.append(pagination);
}

// Element Creators
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
    td2.textContent = element.Profit == 'Profit'? element.Profit : Math.round(element.Profit);
    let td3 = document.createElement(row);
    td3.textContent = element.Segment;
    tr.append(td1, td2, td3);
    tbody.append(tr);
}

export function createInputField(text) {
    if (text.split(" ").length > 1) {
        return;
    }
    let input = document.createElement('input');
    input.type = 'text';
    input.placeholder = text.charAt(0).toUpperCase() + text.slice(1);
    input.classList.add(`${text}-input`);
    input.setAttribute('required', 'true');
    return input;
}

export function createButton(text) {
    let button = document.createElement('button');
    button.textContent = text;
    button.classList.add(`${text}-button`);
    return button;
}

function createDiv(text) {
    let div = document.createElement('div');
    div.classList.add(`${text}`);
    return div;
}

// utility functions
function removeExistingClass(container, className) {

        let element = container?.querySelector('.'+className); // Find the pagination inside
        if (element) {
            element.remove(); // Remove only the pagination div
        }
}