const textarea = document.querySelector('#text-image-urls')
const button = document.querySelector('#button-to-select')
const select = document.querySelector('#select-image-urls')
const border = document.querySelector('#border')
const div = document.querySelector('#images')
const bigImage = document.querySelector('#big')

console.log(".qdsd")
select.setAttribute("multiple", "multiple")


button.addEventListener("click", function (event){
    const text = textarea.value.split("\n");
    text.forEach(function (elem){
        const option = document.createElement('option');
        option.text = elem;
        select.appendChild(option);
    })
})

delegate(select, "click", "option", function (event){
    const img = document.createElement('img');
    img.src=event.target.value;
    div.appendChild(img);
})


delegate(div, "mouseover", "img", function(event){
    bigImage.src = event.target.src;
})

function delegate(parent, type, selector, handler) {
    parent.addEventListener(type, function (event) {
        const targetElement = event.target.closest(selector);
        if (this.contains(targetElement)) {
            handler.call(targetElement, event);
        }
    })
}

border.addEventListener("change", function (event){
    console.log(border.value);
    bigImage.style.borderWidth=`${border.value}px`;
})