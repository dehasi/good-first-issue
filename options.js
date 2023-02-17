import Storage from './storage.js';

// TODO: Synchronise labels with Chrome storage
// TODO: Align table columns
// TODO: Add input label validation

const storage = new Storage();
const labelsSet = storage.labels() ;// new Set(['good first issue', 'bug']);

function handleRemoveButtonClick(event) {
  const label = event.target.attributes['button-label'].value;
  const r = document.querySelector(`[row-label='${label}']`);

  r.parentNode.removeChild(r);

  labelsSet.delete(label);
}

function createRemoveButton(label) {
  const button = document.createElement('button');
  button.textContent = 'remove';
  button.addEventListener('click', handleRemoveButtonClick);
  button.setAttribute('button-label', label);
  return button;
}

function createRow(label) {
  const table_row = document.createElement('tr');

  table_row.setAttribute('row-label', label);

  const label_cell = document.createElement('td');
  label_cell.appendChild(document.createTextNode(label));
  table_row.appendChild(label_cell);

  const button_cell = document.createElement('td');
  button_cell.appendChild(createRemoveButton(label));
  table_row.appendChild(button_cell);

  return table_row;
}

function createTable(labels) {
  const result_table = document.createElement('table');
  result_table.setAttribute('border', '2');
  result_table.setAttribute('id', 'table-label');

  for (const label of Array.from(labels).sort()) {
    const r = result_table.insertRow(-1);

    r.appendChild(createRow(label));
  }
  return result_table;
}

function drawTable() {
  const page = document.getElementById('labels');
  page.appendChild(createTable(labelsSet));
}

function refreshTable() {
  const tbl = document.getElementById('table-label');
  tbl.parentNode.removeChild(tbl);
  drawTable();
}

function handleAddButtonClick(event) {
  const text_input = document.getElementById('new-label');
  const label = document.getElementById('new-label').value;
  labelsSet.add(label);
  refreshTable();
  text_input.value = ''
}

function drawAddButton() {
  const add_btn = document.getElementById('add-button');
  add_btn.addEventListener('click', handleAddButtonClick);
}

drawTable();
drawAddButton();
