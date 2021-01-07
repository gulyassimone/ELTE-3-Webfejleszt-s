const adatok = document.querySelector("#adatok");

delegate(adatok, "click", ".szallitmany li", function(event){
    event.target.classList.toggle("termek");
})

delegate(adatok, "click", ".szallitmany div:first-child", function(event){
    event.target.parentElement.classList.toggle("erkezes");
})

delegate(adatok, "click", ".szallitmany div:last-child", function(event){
    event.target.parentElement.classList.toggle("polc");
})

function delegate(parent, type, selector, handler) {
    parent.addEventListener(type, function (event) {
        const targetElement = event.target.closest(selector);
        if (this.contains(targetElement)) {
            handler.call(targetElement, event);
        }
    })
}