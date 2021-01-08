const input = document.querySelector("input");

input.addEventListener("keydown", function (event){
    if(event.keyCode === 8){
        event.preventDefault();
    }
});

input.addEventListener("keypress", function (event){
    if(!(event.key.match("[0-9]|\\."))){
        event.preventDefault();
    }
});

input.addEventListener("change", function (event){
    if(!(event.target.value.match("[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}"))){
        event.target.classList.add("helytelen");
    } else {
        event.target.classList.add("helyes");
    }
});