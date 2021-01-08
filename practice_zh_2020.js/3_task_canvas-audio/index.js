const c = document.querySelector(".audio");
const changb = document.querySelector("#btn-change");
const starta = document.querySelector("#btn-animation");
const ctx = c.getContext("2d");


function random(a, b) {
    return Math.floor(Math.random() * (b - a + 1) + a);
}

console.log(random(-10,10))

let array = [];
for (let i = 0; i<20; ++i){
    array.push(random(-5,5));
}

console.log(array);
render();

changb.addEventListener("click", changeCanvas)

starta.addEventListener("click", function (event){
    let timeleft = 0;
    timer = setInterval(function () {
            changeCanvas();
            render();
        }
        , 10
    );
})

function render(){

    ctx.clearRect(0, 0, c.width, c.height);
    ctx.beginPath();
    ctx.fillStyle = 'rgb(155, 155, 155)';
    ctx.lineWidth = 3;

    ctx.moveTo(0,c.height/2);
    for(let i = 0; i<20; ++i){
        ctx.lineTo((i*10)+10,array[i]+c.height/2);
    }
    ctx.lineTo(c.width,c.height/2);
    ctx.stroke();
}

function changeCanvas (){
    for (let i =0; i<array.length; ++i){

        const changeN=random(-1,1);
        array[i] =array[i]+ changeN;
    }
    render();
}