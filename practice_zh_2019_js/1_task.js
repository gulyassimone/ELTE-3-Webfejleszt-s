const downloadSpeedInput = document.querySelector("#downloadSpeedInput");
const downloadSpeedButton = document.querySelector("#downloadSpeedButton");
const table = document.querySelectorAll(" table  tr ");



downloadSpeedButton.addEventListener("click", function (event) {

    for(let i =1; i<table.length; ++i){
        const changableElem= table[i].cells.item(2);
        const totalSize = (table[i].cells.item(1).innerText).split("NKB");
        const currentPercent= (table[i].cells.item(2).innerText).split("%");
        const currentDownloadedPercent = (parseInt(totalSize[0]) * parseInt(currentPercent[0])/100  + parseInt(downloadSpeedInput.value) )/ parseInt(totalSize[0])

        if(currentDownloadedPercent>1){
            changableElem.innerHTML = "100%"
        }else{
            changableElem.innerHTML = currentDownloadedPercent*100 + "%";
        }

        console.log(table[i].cells.item(0).innerText + ": " + table[i].cells.item(1).innerText + " " + table[i].cells.item(2).innerText);

    }
})