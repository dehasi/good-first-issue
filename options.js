// TODO: Synchronise labels with Chrome storage
// TODO: Align table columns
// TODO: Add input label validation

labelsSet = new Set(['good first issue', 'bug']);

function handleRemoveButtonClick(event) {
  label = event.target.attributes['button-label'].value;

  r = document.querySelector(`[row-label='${label}']`);
  r.parentNode.removeChild(r);

  labelsSet.delete(label);
}

function createRemoveButton(label) {
  let button = document.createElement('button');
  button.textContent = 'remove';
  button.addEventListener('click', handleRemoveButtonClick);
  button.setAttribute('button-label', label);
  return button;
}

function createRow(label) {
  table_row = document.createElement('tr');
  table_row.setAttribute('row-label', label);

  label_cell = document.createElement('td');
  label_cell.appendChild(document.createTextNode(label));
  table_row.appendChild(label_cell);

  button_cell = document.createElement('td');
  button_cell.appendChild(createRemoveButton(label));
  table_row.appendChild(button_cell);

  return table_row;
}

function createTable(labels) {
  var result_table = document.createElement('table');
  result_table.setAttribute('border', '2');
  result_table.setAttribute('id', 'table-label');

  for (let label of Array.from(labels).sort()) {
    r = result_table.insertRow(-1);
    r.appendChild(createRow(label));
  }
  return result_table;
}

function drawTable() {
  let page = document.getElementById('labels');
  page.appendChild(createTable(labelsSet));
}

function refreshTable() {
  let tbl = document.getElementById('table-label');
  tbl.parentNode.removeChild(tbl);
  drawTable();
}

function handleAddButtonClick(event) {
  let text_input = document.getElementById('new-label');
  let label = document.getElementById('new-label').value;
  labelsSet.add(label);
  refreshTable();
  text_input.value = ''
}

function drawAddButton() {
  let add_btn = document.getElementById('add-button');
  add_btn.addEventListener('click', handleAddButtonClick);
}

drawTable();
drawAddButton();
