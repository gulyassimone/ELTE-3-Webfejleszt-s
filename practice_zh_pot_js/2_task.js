const button = document.querySelector("button");
const hidden = document.querySelectorAll("[data-hidden]");
const table = document.querySelector("table");
const name = document.querySelector("#name");
const id = document.querySelector("#symbol");
const number = document.querySelector("#number");

let lastElem = null;
let lastcolor = null;

console.log(hidden)
button.addEventListener("click", function () {

    hidden.forEach(function (elem) {
        if (elem.dataset.hidden === "true") {
            elem.dataset.hidden = "false"
        } else {
            elem.dataset.hidden = "true"
        }
    })

})

delegate(table, "click", "td", function (event) {

    const target = event.target;
    if (lastElem != null) {
        lastElem.style.backgroundColor = lastcolor;
    }
    lastElem = target;
    lastcolor = target.style.backgroundColor;

    target.style.backgroundColor = 'red';

    name.innerHTML = target.dataset.name;
    id.innerHTML = target.getAttribute(["id"]);

    const before = target.parentNode.rowIndex + 1;
    let szum = 0;

    for (let i = 1; i < before; i++) {
        szum += document.querySelectorAll(`table tbody tr:nth-of-type(${i}) [data-name]`).length;
    }
    const cellIndex= target.cellIndex+1;
    szum += cellIndex;

    for(let i =1; i<cellIndex; ++i){
        const valami = document.querySelector(`table tbody tr:nth-of-type(${before}) td:nth-of-type(${i})`);
        if(valami.dataset.name==null){
            --szum;
        }
    }

    number.innerHTML = szum;
})

function delegate(parent, type, selector, handler) {
    parent.addEventListener(type, function (event) {
        const targetElement = event.target.closest(selector);
        if (this.contains(targetElement)) {
            handler.call(targetElement, event);
        }
    })
}