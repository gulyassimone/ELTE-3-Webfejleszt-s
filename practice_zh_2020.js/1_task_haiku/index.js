const texteditor = document.querySelector("#haiku-editor");
const numberOfCharacter = document.querySelector("#number-of-characters");
const numberOfRows = document.querySelector("#number-of-rows");
const vowelsPerRow = document.querySelector("#vowels-per-row");
const button = document.querySelector("#btn-copy-haiku");
const haikus = document.querySelector("#haikus");

let row = [];
const maganhangzok = "aáeéiíoóöőuúüű";

texteditor.addEventListener("keyup", function (event) {
    console.log(texteditor.value);
    numberOfCharacter.innerHTML = texteditor.value.length + 1;
    row = texteditor.value.split("\n");
    numberOfRows.innerHTML = row.length;
    const rowSumVovels = vovelsCounter(row);
    console.log(rowSumVovels[0]);
    vovelsPrR(rowSumVovels);


    if(check(rowSumVovels, row.length)){
        texteditor.closest("P").classList.add("haiku");

    }else{
        texteditor.closest("P").classList.remove("haiku");
    }
})
button.addEventListener("click", function (){
    const pre = document.createElement('pre');
    pre.innerHTML = texteditor.value;
    haikus.appendChild(pre);
})

function vovelsCounter(row) {

    let rowSumVovels = [0];

    for (let i = 0; i < row.length; i++) {
        let szum = 0;
        for (let j = 0; j < row[i].length; ++j) {
            console.log(row[i].substr(j, 1));
            if (row[i].substr(j, 1).match("a|á|e|é|i|í|o|ó|ö|ő|u|ú|ü|ű")) {
                ++szum;
            }
        }
        rowSumVovels[i] = szum;
    }
    return rowSumVovels;
}

function vovelsPrR(rowSumVovels){
    vowelsPerRow.innerHTML = "";
    rowSumVovels.forEach(function (element) {
        const list = document.createElement('li');
        list.innerHTML = element;
        vowelsPerRow.appendChild(list);
    })
}

function check(rowSumVovels, numberOfRows){
    if(numberOfRows === 3 && rowSumVovels[0] === 5 && rowSumVovels[1] === 7 && rowSumVovels[2] === 5){
        return true;
    }
    return false;
}