const menuDiv = document.querySelector("#menu");
const gameDiv = document.querySelector("#game");
const playersNumber = document.querySelector("#players_number");
const gameMode = document.querySelector("#game_mod");
const specialOptions = document.querySelector("#special_options");
const rules = document.querySelector("#rules");
const showRules = document.querySelector("#show_rules");
const existSetCheckbox = document.querySelector("#exist_set_checkbox");
const findSetCheckbox = document.querySelector("#find_set_checkbox");
const addCardsCheckbox = document.querySelector("#add_cards_checkbox");
const play = document.querySelector("#play");
const tableContainer = document.querySelector('#table-container')

const shapes = {
        DIAMOND: {magyar:"rombusz" ,english:"diamond" ,code:'D' },
        OVAL: {magyar:"ovális" ,english:"oval" ,code:'P' },
        SQUIGGLE: {magyar:"hullámos" ,english:"squiggle" ,code:'S' }
    };

const colors ={
    GREEN: {magyar:"zöld" ,english:"green" ,code:'g' },
    PURPLE: {magyar:"lila" ,english:"purple" ,code:'p' },
    RED: {magyar:"piros" ,english:"red" ,code:'r' }
}
const fills ={
    SOLID: {magyar:"teli" ,english:"solid" ,code:"S", },
    STRIPPED: {magyar:"csíkos" ,english:"stripped" ,code:"H" },
    OPEN: {magyar:"üres" ,english:"open" ,code:"O" }
}

class players {
    constructor(name, point, status) {
        this._name = name;
        this._point = point;
        this._status = status;
    }

    get name() {
        return this._name;
    }

    get point() {
        return this._point;
    }

    get status() {
        return this._status;
    }

    pointIncreasing() {
        this._point = point - 1;
    }

    pointDecreasing() {
        this._point = point + 1;
    }
}

class Card {
    constructor(shape, color, number, fill, id) {
        this._selected = 0;
        this._shape = shape;
        this._color = color;
        this._number = number;
        this._fill = fill;
        this._id = id;
    }
    get shape() {
        return this._shape;
    }

    get color() {
        return this._color;
    }

    get number() {
        return this._number;
    }

    get fill() {
        return this._fill;
    }

    get id() {
        return this._id;
    }

    get selected() {
        return this._selected;
    }
    writeToConsole() {
        console.log(`id = ${this._id} number = ${this._number} form = ${this._shape} color = ${this._color} fill = ${this._fill} selected = ${this._selected}`);
    }

    select() {
        this._selected = 1;
    }

    back() {
        this._selected = 0;
    }

    drop() {
        this._selected = -1;
    }
}

const deck = {
    deck: [],


    init: function () {
        const n = 3;
        const m = 4;

        this.generateDeck();

        this.createTable();
    },
    createTable: function () {
        this.deck.forEach(element => element.writeToConsole());
        let table = document.createElement('table');
        for(let i=0; i<4; i++){
            const row = document.createElement('tr');
            for(let j=0; j<3; j++){
                const cell = document.createElement('td');
                console.log("deck" + this.deck[i+j])
                cell.innerHTML = '<div class="deck"><img src=./icons/1HgD.svg alt="some file"/></div>';
                row.appendChild(cell);
            }
            table.appendChild(row);
        }
    },

    generateDeck: function () {
        let deck

        for(let i=1; i<5; ++i){
            console.log();
            for(const shape in shapes){
                for(const color in colors){
                    for(const fill in fills){
                        const card = new Card(shape,color,i,fill,`${i}${fills[fill].code}${colors[color].code}${shapes[shape].code}`);
                        this.deck.push(card);
                    }
                }
            }
        }
    },

//    deal() {
//    }
    shuffle: function () {
        for (let i = this.deck.length - 1; i > 0; i--) {
            let j = Math.floor(Math.random() * i);
            let temp = this.deck[i];
            this.deck[i] = this.deck[j];
            this.deck[j] = temp;
        }
    }
    //   drop() {
    //   }
}

const game = {

    init: function () {
        deck.init();
    },
}

showRules.addEventListener("click", function (event) {
    rules.style.display = "block";
});
window.addEventListener("click", function (event) {
    if (event.target == rules) {
        rules.style.display = "none";
    }
});
rules.addEventListener("click", function (event) {
    rules.style.display = "none";
});
document.addEventListener("click", function (event) {
    if (event.target.matches(".close")) {
        event.target.closest(".modal").style.display = "none";
    }
});

playersNumber.addEventListener("keypress", function (event) {
    event.preventDefault();
});

gameMode.addEventListener("change", function (event) {
    if (event.target.value == "competitive") {
        specialOptions.classList.add("hide");
        existSetCheckbox.checked = false;
        findSetCheckbox.checked = false;
        addCardsCheckbox.checked = true;
    }
    if (event.target.value == "practice") {
        specialOptions.classList.remove("hide");
    }
});

play.addEventListener("click", function (event) {
    gameDiv.style.display = "block";
    game.init();
})


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
