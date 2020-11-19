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
const existSetButton = document.querySelector("#exist_set_button");
const findSetButton = document.querySelector("#find_set_button");
const addCardsButton = document.querySelector("#add_cards_button");
const result = document.querySelector("#result");
const deckContainer = document.querySelector("#deck");

const shapes = {
    DIAMOND: {codeNumb: 1, english: "diamond", code: 'D'},
    OVAL: {codeNumb: 2, english: "oval", code: 'P'},
    SQUIGGLE: {codeNumb: 3, english: "squiggle", code: 'S'}
};

const colors = {
    GREEN: {codeNumb: 1, english: "green", code: 'g'},
    PURPLE: {codeNumb: 2, english: "purple", code: 'p'},
    RED: {codeNumb: 3, english: "red", code: 'r'}
};

const fills = {
    SOLID: {codeNumb: 1, english: "solid", code: "S",},
    STRIPPED: {codeNumb: 2, english: "stripped", code: "H"},
    OPEN: {codeNumb: 3, english: "open", code: "O"}
};

class Player {
    constructor(name) {
        this._name = name;
        this._point = 0;
        this._selected = 0;
    }

    get name() {
        return this._name;
    }

    get point() {
        return this._point;
    }

    get selected() {
        return this._selected;
    }

    setSelected() {
        this._selected = 1;
    }

    unselect() {
        this._selected = 0;
    }

    pointIncreasing() {
        this._point += 1;
    }

    pointDecreasing() {
        this._point -= 1;
    }

    reset() {
        this._point = 0;
        this._selected = 0;
    }
};


class Card {
    constructor(shape, color, number, fill, id, codeNumb) {
        this._selected = 0;
        this._shape = shape;
        this._color = color;
        this._number = number;
        this._fill = fill;
        this._id = id;
        this._codeNumb = codeNumb;
    }

    get codeNumb() {
        return this._codeNumb;
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
};
const deck = {
    remainingCards: [],
    cardsOnTable: [],
    selectedCards: {number: 0, cards: []},

    init: function () {
        this.generateDeck();
        /**
         * @todo delete comment
         */
        //this.remainingCards.forEach(element => element.writeToConsole());
        this.shuffle();
        for (let i = 0; i < 12; i++) {
            const temp = this.remainingCards.pop();
            this.cardsOnTable.push(temp);
        }
        this.createTable();
    },
    createTable: function () {
        tableContainer.innerHTML = "";
        let table = document.createElement('table');
        let sum = 1;
        let row = document.createElement('tr');
        this.cardsOnTable.forEach(function (cardOnTable) {
            const cell = document.createElement('td');
            cell.innerHTML = `<img class="card" src=./icons/${cardOnTable.id}.svg alt=${cardOnTable.id}>`;
            row.appendChild(cell);
            cell.firstChild.addEventListener("click", selectCardHandle)
            if (sum % 4 == 0) {
                table.appendChild(row);
                row = document.createElement('tr');
            }
            sum++;
        })
        for (let i = 0; i < 3; i++) {
            const row = document.createElement('tr');
            for (let j = 0; j < 4; j++) {

            }

        }
        tableContainer.appendChild(table);
        console.log(this.cardsOnTable);
    },
    generateDeck: function () {
        for (let i = 1; i < 4; ++i) {
            for (const shape in shapes) {
                for (const color in colors) {
                    for (const fill in fills) {
                        const card = new Card(shape, color, i, fill, `${i}${fills[fill].code}${colors[color].code}${shapes[shape].code}`, [i, fills[fill].codeNumb, colors[color].codeNumb, shapes[shape].codeNumb]);
                        this.remainingCards.push(card);
                    }
                }
            }
        }
    },
    shuffle: function () {
        for (let i = this.remainingCards.length - 1; i > 0; i--) {
            let j = Math.floor(Math.random() * i);
            let temp = this.remainingCards[i];
            this.remainingCards[i] = this.remainingCards[j];
            this.remainingCards[j] = temp;
        }
    },
    reset: function () {
        this.remainingCards = [];
        this.cardsOnTable = [];
        this.resetSelectedCards();
        tableContainer.innerHTML = "";
    },
    addSelectedCards: function (card) {
        this.selectedCards.cards.push(card);
        this.selectedCards.number += 1;
    },
    /**
     * @todo nem tudom miért, de működik, viszont szerintem javítani kell
     * @param card
     */
    removeSelectedCards: function (card) {
        const index = this.remainingCards.indexOf(card);
        if (index > -1) {
            this.selectedCards.cards.splice(index, 1);
        }
        this.selectedCards.cards.forEach(element => console.log(element + " "));
        this.selectedCards.number -= 1;
    },
    resetSelectedCards: function () {
        this.selectedCards.cards = [];
        this.selectedCards.number = 0;
        let temp = document.querySelectorAll(".card");
        temp.forEach(elem => elem.classList.remove("selectCard"));
    },
    /**
     * add 3 cards to table
     */
    addCardsToTable() {
        const actualTable = document.querySelectorAll('#table-container td');
        let newTd = true;
        for (let i = 0; i < actualTable.length; ++i) {
            if (actualTable[i].innerHTML == "" && deck.remainingCards.length > 0) {
                const temp = this.remainingCards.pop();
                this.cardsOnTable.push(temp);
                actualTable[i].innerHTML = `<img class="card" src=./icons/${temp.id}.svg alt=${temp.id}>`;
                actualTable[i].addEventListener("click", selectCardHandle);
                newTd = false;
            }
        }
        const rows = document.querySelectorAll('#table-container tr');
        if (newTd) {
            for (let i = 0; i < rows.length; i++) {
                const temp = this.remainingCards.pop();
                this.cardsOnTable.push(temp);
                const cell = document.createElement('td');
                cell.innerHTML = `<img class="card" src=./icons/${temp.id}.svg alt=${temp.id}>`;
                cell.firstChild.addEventListener("click", selectCardHandle);
                rows[i].appendChild(cell);
            }
        }
    },
    /**
     * Drop cards from table
     * @param cards
     */
    dropCardsFromTable: function (cards) {
        console.log(this)
        const actualTable = document.querySelectorAll('#table-container img');
        for (let k = 0; k < cards.length; ++k) {
            for (let i = 0; i < actualTable.length; ++i) {
                if (actualTable[i].alt === cards[k].id) {
                    actualTable[i].closest('td').innerHTML = "";
                }
            }
            this.cardsOnTable = arrayRemove(this.cardsOnTable, cards[k]);
        }
        this.createTable();

        if (this.cardsOnTable.length < 12 && this.remainingCards.length > 0 && gameMode.value === "practice") {
            setTimeout(function () {
                this.addCardsToTable();
            }, 2000);
        }
    },

    existSetOnTable: function () {
        console.log(this.cardsOnTable);
        for (let i = 0; i< this.cardsOnTable.length; i++) {
            console.log("cardOnTable1");
            console.log(this.cardsOnTable[i]);
            for (let j= 0; j< this.cardsOnTable.length; j++) {
                for (let k = 0; k< this.cardsOnTable.length; k++) {
                    if (this.cardsOnTable[i].id != this.cardsOnTable[j].id && this.cardsOnTable[j].id != this.cardsOnTable[k].id && this.cardsOnTable[i].id != this.cardsOnTable[k].id) {
                        const temp = [this.cardsOnTable[i], this.cardsOnTable[j], this.cardsOnTable[k]]
                        if (game.isSet(temp)) {
                            return temp;
                        }
                    }
                }
            }
        }
        return [];
    }
};

const game = {
    players: [],
    existSelected: {number: 0, player: null},

    setExistSelect: function (player) {
        this.existSelected.number = 1;
        this.existSelected.player = player;
    },
    notExistSelect: function () {
        this.existSelected.number = 0;
        this.existSelected.player = [];
    },
    init: function () {
        deck.init();
        this.createPlayers();
        this.writePlayers();
    },

    createPlayers: function () {
        for (let i = 1; i <= playersNumber.value; ++i) {
            this.players.push(new Player(`Player${i}`));
        }
    },
    writePlayers: function () {
        const table = document.createElement('table');
        const playerColumnNameHead = document.createElement('th');
        const playerColumnPointHead = document.createElement('th');
        const playerHeadRow = document.createElement('tr');

        playerColumnNameHead.innerHTML = 'Név';
        playerColumnPointHead.innerHTML = 'Pont'

        playerHeadRow.appendChild(playerColumnNameHead)
        playerHeadRow.appendChild(playerColumnPointHead);

        table.appendChild(playerHeadRow);

        for (let i = 0; i < playersNumber.value; ++i) {
            const playerLine = document.createElement('tr');
            const playerColumnName = document.createElement('td');
            const playerColumnPoint = document.createElement('td');

            playerColumnName.innerHTML = `<button type = button>${this.players[i].name}</button>`;
            playerColumnPoint.innerHTML = this.players[i].point;

            playerLine.appendChild(playerColumnName);
            playerLine.appendChild(playerColumnPoint);
            table.appendChild(playerLine)
        }
        playersContainer.innerHTML = "";
        playersContainer.appendChild(table);
    },
    /**
     * This function unselect the selected player.
     */
    unselectPlayer: function () {
        this.existSelected.player.unselect();
        game.notExistSelect();
        const activePlayer = document.querySelector(".selectPlayer");
        activePlayer.classList.remove("selectPlayer");
    },
    reset: function () {
        this.players = [];
        deck.reset();
        playersContainer.innerHTML = "";
        this.existSelected.number = 0;
        this.existSelected.player = null;
    },
    isSet: function (cards) {
        const isSet = [...cards[0].codeNumb];
        for (let j = 0; j < isSet.length; j++) {
            for (let i = 1; i < 3; i++) {
                const length = cards[i].codeNumb.length;
                isSet[j] += cards[i].codeNumb[j]
                if (i == 2 && isSet[j] % 3 != 0) {
                    return false;
                }
            }
        }
        return true;
    }
};

showRules.addEventListener("click", function (event) {
    rules.style.display = "block";
});
window.addEventListener("click", function (event) {
    if (event.target === rules) {
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
    if (event.target.value === "competitive") {
        specialOptions.classList.add("hide");
        existSetButton.classList.add("hide");
        findSetButton.classList.add("hide");
        addCardsButton.classList.add("hide");
        existSetCheckbox.checked = false;
        findSetCheckbox.checked = false;
        addCardsCheckbox.checked = true;
    }
    if (event.target.value === "practice") {
        specialOptions.classList.remove("hide");
        existSetButton.classList.remove("hide");
        findSetButton.classList.remove("hide");
        addCardsButton.classList.remove("hide");
    }
});

play.addEventListener("click", function (event) {
    gameDiv.style.display = "block";
    game.init();
});

addCardsButton.addEventListener('click', deck.addCardsToTable.bind(deck));
existSetButton.addEventListener("click", function (event) {
    const exist = deck.existSetOnTable();
    result.innerHTML = (exist != []) ? "Van benne SET" : "Nincs benne SET";
    console.log(exist);
})


delegate(playersContainer, "click", 'tr td:nth-child(1) button', function (event) {
    const activePlayer = event.target;
    let player = game.players.find(element => element.name === activePlayer.innerText);

    if (!game.existSelected.number) {
        player.setSelected();
        game.setExistSelect(player);
        activePlayer.classList.add("selectPlayer");
    } else if (player.selected && deck.selectedCards.number < 3) {
        game.unselectPlayer();
        deck.resetSelectedCards();
    }
});

function arrayRemove(arr, value) {
    return arr.filter(function (ele) {
        return ele != value;
    });
}

function selectCardHandle(event) {
    if (deck.selectedCards.number < 3 && game.existSelected.number) {

        let card = deck.cardsOnTable.find(element => element.id === event.target.alt);
        if (!card.selected) {
            event.target.classList.add("selectCard");
            deck.addSelectedCards(card);
            card.select();
        } else {
            event.target.classList.remove("selectCard");
            deck.removeSelectedCards(card);
            card.back();
        }
    }
    if (deck.selectedCards.number === 3) {
        const isSet = game.isSet(deck.selectedCards.cards);
        if (isSet) {
            game.existSelected.player.pointIncreasing();
            deck.dropCardsFromTable(deck.selectedCards.cards);
            deck.resetSelectedCards();
            game.unselectPlayer();
            game.writePlayers();
        } else {
            game.existSelected.player.pointDecreasing();
            deck.selectedCards.cards.forEach(elem => elem.back());
            deck.resetSelectedCards();
            game.unselectPlayer();
            game.writePlayers();
        }
        result.innerHTML = isSet ? "Set" : "Nem Set";
        setTimeout(function () {
            result.innerHTML = "";
        }, 5000);
    }
};

function delegate(parent, type, selector, handler) {
    parent.addEventListener(type, function (event) {
        const targetElement = event.target.closest(selector);
        if (this.contains(targetElement)) {
            handler.call(targetElement, event);
        }
    })
};


