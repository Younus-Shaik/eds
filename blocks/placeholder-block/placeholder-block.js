import { fetchPlaceholders, getMetadata } from '../../scripts/aem.js'; 

export default async function decorate(block) { 
    const placeholders = await fetchPlaceholders(''); 
    console.log(placeholders);
    const table = document.createElement('table');
    const tbody = document.createElement('tbody');
    Object.entries(placeholders).forEach(([key, value]) => {
        // creating table of key and values
        const tr = document.createElement('tr');
        const th = document.createElement('th');
        th.textContent = key;
        const td = document.createElement('td');
        td.textContent = value;
        tr.append(th, td);
        tbody.append(tr);
    });
    table.append(tbody);
    block.textContent = '';
    block.append(table);
}