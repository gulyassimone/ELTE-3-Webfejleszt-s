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
const playersInput = document.querySelector("#players_input");
const timerOutput = document.querySelector("#timer");

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

    select() {
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
}

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

    get fill() {
        return this._fill;
    }

    get selected() {
        return this._selected;
    }

    select() {
        this._selected = 1;
    }

    back() {
        this._selected = 0;
    }

    get id() {
        return this._id;
    }

    writeToConsole() {
        console.log(`id = ${this._id} number = ${this._number} form = ${this._shape} color = ${this._color} fill = ${this._fill} selected = ${this._selected}`);
    }
}

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
        const table = document.createElement('table');
        console.log(this.cardsOnTable);
        const tdNumber = this.cardsOnTable.length / 3;
        console.log(tdNumber);
        let sum = 1;
        let row = document.createElement('tr');
        this.cardsOnTable.forEach(function (cardOnTable) {
            const cell = document.createElement('td');
            cell.innerHTML = `<img class="card" src=./icons/${cardOnTable.id}.svg alt=${cardOnTable.id}>`;
            row.appendChild(cell);
            cell.firstChild.addEventListener("click", selectCardHandle);
            if (sum % tdNumber === 0) {
                table.appendChild(row);
                row = document.createElement('tr');
            }
            sum++;
        });
        tableContainer.appendChild(table);
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
        card.select();
    },
    /**
     *
     * @param card
     */
    removeSelectedCards: function (card) {
        this.selectedCards.cards = arrayRemove(this.selectedCards.cards, card);
        this.selectedCards.number -= 1;
        card.back();
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
    addCardsToTable: function () {
        if (this.remainingCards.length !== 0) {
            const actualTable = document.querySelectorAll('#table-container td');
            let newTd = true;
            for (let i = 0; i < actualTable.length; ++i) {
                if (actualTable[i].innerHTML === "" && deck.remainingCards.length > 0) {
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
            if (this.remainingCards.length === 0) {
                deckContainer.classList.add("hide");
            }
        }
    },
    /**
     * Drop cards from table
     * @param cards
     */
    dropCardsFromTable: function (cards) {
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

        const existSet = (this.existSetOnTable() === []);
        if ((this.cardsOnTable.length < 12 || existSet) && this.remainingCards.length > 0 && gameMode.value === "competitive") {
            setTimeout(function () {
                deck.addCardsToTable();
            }, 2000);
        }
        if (existSet && this.remainingCards.length === 0) {
            result.innerHTML = "A játék befejeződött!";
        }
    },

    existSetOnTable: function () {
        console.log(this.cardsOnTable);
        for (let i = 0; i < this.cardsOnTable.length; i++) {
            console.log("cardOnTable1");
            console.log(this.cardsOnTable[i]);
            for (let j = 0; j < this.cardsOnTable.length; j++) {
                for (let k = 0; k < this.cardsOnTable.length; k++) {
                    if (this.cardsOnTable[i].id !== this.cardsOnTable[j].id && this.cardsOnTable[j].id !== this.cardsOnTable[k].id && this.cardsOnTable[i].id !== this.cardsOnTable[k].id) {
                        const temp = [this.cardsOnTable[i], this.cardsOnTable[j], this.cardsOnTable[k]];
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
        this.existSelected.player.select();
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
        const playersFromPage = document.querySelectorAll("#players_input input");
        for (let i = 0; i < playersFromPage.length; ++i) {
            this.players.push(new Player(playersFromPage[i].value));
        }
    },

    writePlayers: function () {
        const table = document.createElement('table');
        const playerColumnNameHead = document.createElement('th');
        const playerColumnPointHead = document.createElement('th');
        const playerHeadRow = document.createElement('tr');

        playerColumnNameHead.innerHTML = 'Név';
        playerColumnPointHead.innerHTML = 'Pont';

        playerHeadRow.appendChild(playerColumnNameHead);
        playerHeadRow.appendChild(playerColumnPointHead);

        table.appendChild(playerHeadRow);

        for (let i = 0; i < parseInt(playersNumber.value); ++i) {
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

        if (parseInt(playersNumber.value) === 1) {
            document.querySelector("#players td:nth-child(1) button").classList.add("selectPlayer");
            this.setExistSelect(this.players[0]);
        }
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
                isSet[j] += cards[i].codeNumb[j];
                if (i === 2 && isSet[j] % 3 !== 0) {
                    return false;
                }
            }
        }
        return true;
    }
};

showRules.addEventListener("click", function () {
    rules.style.display = "block";
});

window.addEventListener("click", function (event) {
    if (event.target === rules) {
        rules.style.display = "none";
    }
});

rules.addEventListener("click", function () {
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

playersNumber.addEventListener("input", function (event) {
    playersInput.innerHTML = "";
    for (let i = 1; i <= parseInt(event.target.value); ++i) {
        playersInput.innerHTML += `<label for="players_input_${i}">${i}. játékos: </label><input id="players_input_${i}" type="text" max="50" min="1" value="Játékos${i}" order_number = ${i}><br>`;
    }
});

delegate(playersInput, "focusout", "input", function (event) {
    if (event.target.value === "") {
        event.target.value = `Játékos${event.target.getAttribute("order_number")}`
    }
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

play.addEventListener("click", function () {
    gameDiv.style.display = "block";
    game.init();
});

addCardsButton.addEventListener('click', deck.addCardsToTable.bind(deck));
existSetButton.addEventListener("click", function () {
    const exist = deck.existSetOnTable();
    result.innerHTML = (exist.length !== 0) ? "Van benne SET" : "Nincs benne SET";
    console.log(exist);
});

delegate(playersContainer, "click", 'tr td:nth-child(1) button', function (event) {
    if (parseInt(playersNumber.value) > 1) {
        const activePlayer = event.target;
        let player = game.players.find(element => element.name === activePlayer.innerText);

        if (!game.existSelected.number) {
            game.setExistSelect(player);
            activePlayer.classList.add("selectPlayer");
        }

        let timeleft = 10;
        const timer = setInterval(function () {
            if (timeleft <= 0) {
                clearInterval(timer);
            }
            timerOutput.value = 10 - timeleft;
            timeleft -= 1;
        }, 1000);
        if(timeleft = 0) {
            game.unselectPlayer();
            deck.resetSelectedCards();
        }

    }
});

function arrayRemove(array, value) {
    return array.filter(function (elem) {
        return elem !== value;
    });
}

function selectCardHandle(event) {
    if (deck.selectedCards.number < 3 && game.existSelected.number) {

        let card = deck.cardsOnTable.find(element => element.id === event.target.alt);
        if (!card.selected) {
            event.target.classList.add("selectCard");
            deck.addSelectedCards(card);
        } else {
            event.target.classList.remove("selectCard");
            deck.removeSelectedCards(card);
        }
    }
    if (deck.selectedCards.number === 3) {
        const isSet = game.isSet(deck.selectedCards.cards);
        if (isSet) {
            game.existSelected.player.pointIncreasing();
            deck.dropCardsFromTable(deck.selectedCards.cards);
            deck.resetSelectedCards();
            if (parseInt(playersNumber.value) > 1) {
                game.unselectPlayer();
            }
            game.writePlayers();
        } else {
            game.existSelected.player.pointDecreasing();
            deck.selectedCards.cards.forEach(elem => elem.back());
            deck.resetSelectedCards();
            if (parseInt(playersNumber.value) > 1) {
                game.unselectPlayer();
            }
            game.writePlayers();
        }
        result.innerHTML = isSet ? "Set" : "Nem Set";
        setTimeout(function () {
            result.innerHTML = "";
        }, 5000);
    }
}

function delegate(parent, type, selector, handler) {
    parent.addEventListener(type, function (event) {
        const targetElement = event.target.closest(selector);
        if (this.contains(targetElement)) {
            handler.call(targetElement, event);
        }
    })
}


