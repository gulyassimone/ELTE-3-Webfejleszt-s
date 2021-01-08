const bigMacPlusButton = document.querySelector("#bigMacPlus");
const spotifyPlusButton = document.querySelector("#spotifyPlus");
const bigMacMinusButton = document.querySelector("#bigMacMinus");
const spotifyMinusButton = document.querySelector("#spotifyMinus");
const baseBM = 250;
const baseS = 300;

const c = document.getElementById("myCanvas");
const ctx = c.getContext("2d");


let bigMac = {
    x: 0,
    y: baseBM,
    m: 0
};

let spotify = {
    x: 0,
    y: baseS,
    m: 0
};



bigMacPlusButton.addEventListener("click", function (event){
    ctx.beginPath();
    ctx.strokeStyle = '#f00';
    ctx.moveTo(bigMac.x,bigMac.y);
    if(bigMac.m===-1){
        ctx.fillText(c.height - bigMac.y,bigMac.x,bigMac.y);
    }
    bigMac.x+=10;
    bigMac.y-=10;
    ctx.lineTo(bigMac.x,bigMac.y);
    ctx.stroke();
    bigMac.m=1;

})

bigMacMinusButton.addEventListener("click", function (event){
    ctx.beginPath();
    ctx.strokeStyle = '#f00';
    ctx.moveTo(bigMac.x,bigMac.y);
    if(bigMac.m===1){
        ctx.fillText(c.height - bigMac.y,bigMac.x,bigMac.y);
    }
    bigMac.x+=10;
    bigMac.y+=10;
    ctx.lineTo(bigMac.x,bigMac.y);
    ctx.stroke();
    bigMac.m=-1;
})

spotifyPlusButton.addEventListener("click", function (event){
    ctx.beginPath();
    ctx.strokeStyle = '#0f0';
    ctx.moveTo(spotify.x,spotify.y);
    if(spotify.m===-1){
        ctx.fillText(c.height - spotify.y,spotify.x,spotify.y);
    }
    spotify.x+=10;
    spotify.y-=10;
    ctx.lineTo(spotify.x,spotify.y);
    ctx.stroke();
    spotify.m=1;
})

spotifyMinusButton.addEventListener("click", function (event){

    ctx.beginPath();
    ctx.strokeStyle = '#0f0';
    ctx.moveTo(spotify.x,spotify.y);
    if(spotify.m===1){
        ctx.fillText(c.height - spotify.y,spotify.x,spotify.y);
    }
    spotify.x+=10;
    spotify.y+=10;
    ctx.lineTo(spotify.x,spotify.y);
    ctx.stroke();
    spotify.m=-1;
})