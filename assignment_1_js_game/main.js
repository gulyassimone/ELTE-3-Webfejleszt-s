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
const tableContainer = document.querySelector('#table-container');
const playersContainer = document.querySelector('#players');


const shapes = {
    DIAMOND: {magyar: "rombusz", english: "diamond", code: 'D'},
    OVAL: {magyar: "ovális", english: "oval", code: 'P'},
    SQUIGGLE: {magyar: "hullámos", english: "squiggle", code: 'S'}
};

const colors = {
    GREEN: {magyar: "zöld", english: "green", code: 'g'},
    PURPLE: {magyar: "lila", english: "purple", code: 'p'},
    RED: {magyar: "piros", english: "red", code: 'r'}
}
const fills = {
    SOLID: {magyar: "teli", english: "solid", code: "S",},
    STRIPPED: {magyar: "csíkos", english: "stripped", code: "H"},
    OPEN: {magyar: "üres", english: "open", code: "O"}
}

class Player {
    constructor(name) {
        this._name = name;
        this._point = 0;
        this._status = 0;
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
    selectPlayers(){
        this._status = 1;
    }
    unSelectPlayers(){
        this._status = 0;
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
        this.shuffle();
        this.createTable();
    },
    createTable: function () {
        let sum = 0;
        this.deck.forEach(element => element.writeToConsole());
        let table = document.createElement('table');
        for (let i = 0; i < 3; i++) {
            const row = document.createElement('tr');
            for (let j = 0; j < 4; j++) {
                const cell = document.createElement('td');
                cell.innerHTML = `<div class="card"><img src=./icons/${this.deck[sum].id}.svg alt="some file"/></div>`;
                row.appendChild(cell);
                ++sum;
            }
            table.appendChild(row);
        }
        tableContainer.appendChild(table);
    },

    generateDeck: function () {

        for (let i = 1; i < 4; ++i) {
            for (const shape in shapes) {
                for (const color in colors) {
                    for (const fill in fills) {
                        const card = new Card(shape, color, i, fill, `${i}${fills[fill].code}${colors[color].code}${shapes[shape].code}`);
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
    },
    reset:function() {
        this.deck = [];
        tableContainer.innerHTML = "";
    }
    //   drop() {
    //   }
}

const game = {
    players: [],
    init: function () {
        deck.init();
        this.createPlayers();
        this.writePlayers();
    },
    createPlayers:function(){
        for(let i=1; i<= playersNumber.value; ++i){
            this.players.push(new Player(`Player${i}`));
            console.log(`Player${i}`);
        }
    },
    writePlayers:function(){
        const table =  document.createElement('table');
        const playerColumnNameHead = document.createElement('th');
        const playerColumnPointHead =  document.createElement('th');
        const playerHeadRow = document.createElement('tr');

        playerColumnNameHead.innerHTML = 'Név';
        playerColumnPointHead.innerHTML = 'Pont'

        playerHeadRow.appendChild(playerColumnNameHead)
        playerHeadRow.appendChild(playerColumnPointHead);

        table.appendChild(playerHeadRow);

        for(let i=0; i< playersNumber.value; ++i){
            if(this.players[i].status == 0) {
                console.log(i);
                const playerLine = document.createElement('tr');
                const playerColumnName = document.createElement('td');
                const playerColumnPoint = document.createElement('td');

                playerColumnName.innerHTML = this.players[i].name;
                playerColumnPoint.innerHTML = this.players[i].point;

                playerLine.appendChild(playerColumnName);
                playerLine.appendChild(playerColumnPoint);
                table.appendChild(playerLine)
            }
        }
        playersContainer.appendChild(table);
    },
    reset: function(){
        this.players = [];
        deck.reset();
        playersContainer.innerHTML = "";
    }
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
        game.reset();
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
