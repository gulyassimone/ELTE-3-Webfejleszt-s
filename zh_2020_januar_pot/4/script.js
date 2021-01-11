const number = document.querySelector("input");
const extend = document.querySelector("#extend");
const start = document.querySelector("#start");
const table =document.querySelector("table");



start.addEventListener("click", function(){
    extend.style.display = "block";
    console.log(number)
    const num = parseInt(number.value);
    generateTable(num+1);
})

console.log("dfs")
function generateTable(n){
    for(let i =0 ; i < n; ++i){
        const row = document.createElement('tr');
        for(let j =0 ; j < n; ++j){
            const td = document.createElement('td');
            if(i!=0 && j!=0){

                td.classList.add("border");
            }
            row.appendChild(td);
        }
        table.appendChild(row);
    }
}
delegate(table, "click", ".border", function (event){
    if(event.target.style.backgroundColor ==="black"){
        event.target.style.backgroundColor ="white"
    }else{
        event.target.style.backgroundColor ="black"
    }
})

function delegate(parent, type, selector, handler) {
    parent.addEventListener(type, function (event) {
        const targetElement = event.target.closest(selector);
        if (this.contains(targetElement)) {
            handler.call(targetElement, event);
        }
    })
}