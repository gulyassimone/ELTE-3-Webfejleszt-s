const placesInput = document.querySelector('#places')
const speciesInput = document.querySelector('#species')
const button = document.querySelector('#btn-generate')
const tableContainer = document.querySelector('#table-container')
const task1 = document.querySelector('#task-1')
const task2 = document.querySelector('#task-2')
const task3 = document.querySelector('#task-3')
const task4 = document.querySelector('#task-4')
const task5 = document.querySelector('#task-5')

let matrix = []

button.addEventListener('click', onGenerate)
function onGenerate(e) {
  const n = placesInput.valueAsNumber
  const m = speciesInput.valueAsNumber

  matrix = generateMatrix(n, m)

  const table = document.createElement('table');
  for(let i =0 ; i < n; ++i){
    const row = document.createElement('tr');
    for(let j =0 ; j < m; ++j){
      const td = document.createElement('td');
      td.innerHTML = matrix[n-1][m-1];
      row.appendChild(td);
    }
    table.appendChild(row);
  }
  tableContainer.appendChild(table);

  console.log(matrix);
}

delegate(tableContainer, "click", "td", function (event){
  const rowIndex = event.target.parentNode.rowIndex;
  const cellIndex = event.target.cellIndex;
  console.log(rowIndex + " " + cellIndex);
  matrix[rowIndex][cellIndex] = parseInt(event.target.innerText);

  task1.innerHTML = (matrix[0].find(element => element>0) !=null)? "Yey" : "No";

  const count = matrix.filter(elem => elem.filter(element => element>10).length>0);
  task2.innerHTML = ( count!=null)? count.length : 0;


  const index = matrix.find(row => row.includes(0))?.indexOf(0);
  task3.innerHTML= index!=null ? index+1:"No";


})

function generateMatrix(n, m) {
  const matrix = []
  for(let i = 0; i<n; i++) {
    const row = []
    for(let j = 0; j<m; j++) {
      row.push(2)
    }
    matrix.push(row)
  }
  matrix[2][1] = 0;
  return matrix
}


function delegate(parent, type, selector, handler) {
  parent.addEventListener(type, function (event) {
    const targetElement = event.target.closest(selector);
    if (this.contains(targetElement)) {
      handler.call(targetElement, event);
    }
  })
}