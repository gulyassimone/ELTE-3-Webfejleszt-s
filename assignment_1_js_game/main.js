
const nyitolap = document.querySelector("#nyitolap");
const jatek = document.querySelector("#jatek");
const jatekosokSzama = document.querySelector("#jatekosok_szama");
const jatekMod = document.querySelector("#jatek_mod");
const egyebBeallitas = document.querySelector("#egyeb");
const jatekszabalyok = document.querySelector("#jatekszabalyok");
const mutatJatekszabaly = document.querySelector("#mutat_jatekszabaly");
const vanESetCheckbox = document.querySelector("#van_e_set");
const setMutatasCheckbox = document.querySelector("#set_mutatas");
const plusz3LapCheckbox = document.querySelector("#plusz_3_lap");
const inditasGomb = document.querySelector("#inditas");

class jatekos {
    constructor(name, pont, statusz) {
        this.name = name;
        this.pont = pont;
        this.statusz = statusz;
    }
    pontCsokkentes(){
        this.pont = pont - 1;
    }
    pontNoveles(){
        this.pont = pont + 1;
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

mutatJatekszabaly.addEventListener("click", function(event){
    jatekszabalyok.style.display = "block";
});
window.addEventListener("click",function(event) {
    if (event.target == jatekszabalyok) {
        jatekszabalyok.style.display = "none";
    }
});
jatekszabalyok.addEventListener("click",function(event) {
    jatekszabalyok.style.display = "none";
});
document.addEventListener("click", function(event){
    if(event.target.matches(".close")){
        event.target.closest(".modal").style.display = "none";
    }
});

jatekosokSzama.addEventListener("keypress", function (event){
     event.preventDefault();
});

jatekMod.addEventListener("change", function (event) {
    if(event.target.value == "verseny"){
        egyebBeallitas.classList.add("hide");
        vanESetCheckbox.checked = false;
        setMutatasCheckbox.checked = false;
        plusz3LapCheckbox.checked = true;
    }
    if(event.target.value == "gyakorlo"){
        egyebBeallitas.classList.remove("hide");
    }
});

inditasGomb.addEventListener("click", function (event){
    jatek.style.display = "block";
    let ujJatek = new jatek(27);
})

function start() {
    this.deck = Deck.reset()
    this.deal()
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
