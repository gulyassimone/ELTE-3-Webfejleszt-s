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

class players {
    constructor(name, point, status) {
        this.name = name;
        this.point = point;
        this.status = status;
    }

    pointIncreasing() {
        this.point = point - 1;
    }

    pointDecreasing() {
        this.point = point + 1;
    }
}

class Card {
    constructor(form, color, number, fill, id, index) {
        this.form = form;
        this.color = color;
        this.number = number;
        this.fill = fill;
        this.id = id;
        this.index = index;
        this.selected = 0;
    }

    select() {
        this.selected = 1;
    }

    back() {
        this.selected = 0;
    }

    drop() {
        this.selected = -1;
    }
}

class Deck {
    constructor(number) {
        this.pack = pack;
    }

    deal() {

    }

    suffle() {

    }

    drop() {

    }
}

const game = {
    matrix: [],
    table: 0,

    init: function () {
        const n = 3;
        const m = 4;

        this.matrix = this.generateMatrix(n, m);
        console.log(this.matrix);

        this.createTable(this.matrix);
    },
    createTable: function (data) {
        let table = document.createElement('table');
        data.forEach(function (rows) {
            const row = document.createElement('tr');
            rows.forEach(function (cells) {
                const cell = document.createElement('td');
                cell.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" /></svg>';
                row.appendChild(cell);
            });
            table.appendChild(row);
        });
        tableContainer.appendChild(table);
    },

    generateMatrix: function (n, m) {
        const matrix = []
        for (let i = 0; i < n; i++) {
            const row = []
            for (let j = 0; j < m; j++) {
                row.push(0)
            }
            matrix.push(row)
        }
        return matrix
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
