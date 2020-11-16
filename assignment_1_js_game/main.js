
const menu = document.querySelector("#menu");
const game = document.querySelector("#game");
const playersNumber = document.querySelector("#players_number");
const gameMode = document.querySelector("#game_mod");
const specialOptions = document.querySelector("#special_options");
const rules = document.querySelector("#rules");
const showRules = document.querySelector("#show_rules");
const existSetCheckbox = document.querySelector("#exist_set_checkbox");
const findSetCheckbox = document.querySelector("#find_set_checkbox");
const addCardsCheckbox = document.querySelector("#add_cards_checkbox");
const play = document.querySelector("#play");

class players {
    constructor(name, point, status) {
        this.name = name;
        this.point = point;
        this.status = status;
    }
    pontCsokkentes(){
        this.point = point - 1;
    }
    pontNoveles(){
        this.point = point + 1;
    }
}

class kartya {
    constructor(forma, szin, szam, tartalom, id, hely) {
        this.forma = forma;
        this.szin = szin;
        this.szam = szam;
        this.tartalom = tartalom;
        this.id = id;
        this.hely = hely;
        this.kivalasztas = 0;
    }
    kartyaKivalasztas(){
        this.kivalasztas = 1;
    }
    kartyaVisszatetel(){
        this.kivalasztas = 0;
    }
    kartyaEldobas(){
        this.kivalasztas = -1;
    }
}
class kartyaPakli {
    constructor(number) {
        this.pakli = pakli;
    }
    keveres(){

    }
    kartyaEldobas(){

    }
}

showRules.addEventListener("click", function(event){
    rules.style.display = "block";
});
window.addEventListener("click",function(event) {
    if (event.target == rules) {
        rules.style.display = "none";
    }
});
rules.addEventListener("click",function(event) {
    rules.style.display = "none";
});
document.addEventListener("click", function(event){
    if(event.target.matches(".close")){
        event.target.closest(".modal").style.display = "none";
    }
});

playersNumber.addEventListener("keypress", function (event){
     event.preventDefault();
});

gameMode.addEventListener("change", function (event) {
    if(event.target.value == "verseny"){
        specialOptions.classList.add("hide");
        existSetCheckbox.checked = false;
        findSetCheckbox.checked = false;
        addCardsCheckbox.checked = true;
    }
    if(event.target.value == "gyakorlo"){
        specialOptions.classList.remove("hide");
    }
});

play.addEventListener("click", function (event){
    game.style.display = "block";
    let ujJatek = new game(27);
})

function start() {
    this.deck = Deck.reset()
    this.deal()
}

const table = document.querySelector('table')
table.addEventListener('click', onClick)
function onClick(e) {
    const card = e.target.closest('.card')
    if (this.contains(card)) {
        card.classList.toggle('flipped')
    }
}
/*
function delegate(parent, type, selector, handler){
    parent.addEventListener(type, function(event){
        const targetElement = event.target.closest(selector);
        if(this.contains(targetElement)){
            handler.call(targetElement, event);
        }
    })
}
*/
