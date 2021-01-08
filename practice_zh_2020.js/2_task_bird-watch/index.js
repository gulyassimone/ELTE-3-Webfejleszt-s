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


  let bool = true;
  let result=null;
  for (let i = 0; i<matrix.length && bool; ++i){
    if(matrix[i].find(element => element === 0)!=null){
      bool=false;
      result=matrix[i].indexOf(0)+1;
    }
    console.log(result);
  }
  
  task3.innerHTML=result!=null?result:-1;

})

function generateMatrix(n, m) {
  const matrix = []
  for(let i = 0; i<n; i++) {
    const row = []
    for(let j = 0; j<m; j++) {
      row.push(0)
    }
    matrix.push(row)
  }
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