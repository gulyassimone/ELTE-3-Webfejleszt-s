
const canvas  = document.querySelector("canvas")
const ctx     = canvas.getContext("2d")
const plus  = document.querySelector("#plus")
const minus  = document.querySelector("#minus")
const next  = document.querySelector("#next")
const simulate  = document.querySelector("#sim")

function draw(){


    // TODO
    function random(a, b) {
        return Math.floor(Math.random() * (b - a + 1) + a);
    }
    const array=[];

    for(let i = 0; i<7; ++i){
        const number = random(50,350);
        array.push(number);
    }

    console.log("as")

    let today = array[6];
    render();
    function render(){
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(bg, 0, 0)
        ctx.beginPath();
        ctx.lineWidth = 3;

        ctx.fillStyle = 'blue';
        ctx.moveTo(100,canvas.height-[array[0]]);
        for(let i = 0; i<array.length; ++i){
            ctx.lineTo((i*100)+100,canvas.height-array[i]);
        }

        ctx.fillStyle = 'red';
        ctx.lineTo(canvas.width,canvas.height-today);
        ctx.stroke();
    }

    plus.addEventListener("click", function(event){
        today+=10;
        render();
    })
    minus.addEventListener("click", function(event){
        today-=10;
        render();
    })


    next.addEventListener("click", shift);
    function shift(){
        array.shift();
        array.push(array[6]/2);
        render();
    }
    simulate.addEventListener("click",function(){
        let timeleft = 0;
        timer = setInterval(function () {
                shift();
            }
            , 1000
        );
    })

}

let bg        = new Image()
bg.src        = "bg.png"
bg.onload     = draw


console.log("ldf")


