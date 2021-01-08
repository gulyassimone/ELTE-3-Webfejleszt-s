const taskInput = document.querySelector('#task-input');
const tasks = document.querySelector("#tasks");
const removeAllButton = document.querySelector("#remove-all-button");
const tasksArray = [];

taskInput.parentElement.addEventListener('submit', function(event) {
    event.preventDefault();

    const task = taskInput.value;
    if(taskInput.value && !tasksArray.includes(task)) {
        tasksArray.push(task);
        tasks.innerHTML += `<li data-index="${ tasksArray.length - 1 }"> ${ task } <button type = "button">x</button></li>`;
        taskInput.value = '';        
    }  
})

removeAllButton.addEventListener('click', function(event){
    tasks.innerHTML = '';

})

tasks.addEventListener('click', function(event){
   if(event.target.tagName === 'LI'){
        event.target.classList.toggle('done');
   }
   else if(event.target.matches('button')){
       tasksArray.splice(+event.target.parentElement.dataset.index, 1);
       tasks.removeChild(event.target.parentElement);
   }
})