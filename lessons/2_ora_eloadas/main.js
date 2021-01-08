const books = [
    { title: 'Anna Karenina', year:1877 },
    { title: 'Harry Potter és a bölcsek köve', year:1997 },
];

function getBooksOf1800(books) {
    const result = [];
    for(const book of books) {
        if(book.year>= 1800 && book.year<1900){
            result.push(book);
        }
    }
    return result;
}

const booksOf1800 = getBooksOf1800(books);
const booksOf1900 = books.filter(book => book.year >= 1900 && book.year<2000);

const input = document.querySelector("#name");
const output = document.querySelector("#output");

const button = document.querySelector('button');
button.addEventListener('click', handleButtonClick);

function handleButtonClick() {
    const name = input.value;
    output.innerHTML = `Hello ${name}`;
}

//------------------------------------------3. óra ---------------------------------------------------------
const linkList = document.querySelector("#linklist");
function handleLinkClick(event){
    if(event.shiftKey){ 
    event.preventDefault();
    const href = event.target.href;
    console.log(href);
    }
}

delegate(linkList, 'click', 'li a', handleLinkClick)

function delegate(parent, type, selector, handler){
    parent.addEventListener(type, function(event){
        
        const targetElement= event.target.closest(selector);

        if(this.contains(targetElement)){
            handler.call(targetElement, event)
        }
    })
}

document.addEventListener("click", onDocumentClick);
function onDocumentClick(e){

    const x = e.clientX;
    const y = e.clientY;

    const star = `<li class="star" style="top:${y}px; left:${x}px;">*</li>`;
    //document.querySelector("#star").innerHTML +=star;
}

document.addEventListener("click", onTogglerClick);
function onTogglerClick(e) {
    const id = e.target.dataset.toggleId;
    if(!id) return;
    console.log(id);
    const elem = document.getElementById(id);

    elem.hidden = !elem.hidden;
}

elem1=document.querySelector("#id");

const event = new MouseEvent('click', {
    bubbles: true,
    clientX: 10,
    clientY: 10
})
elem1.dispatchEvent(new Event('change', {bubbles: true}))

//------------------------------------------4. óra ---------------------------------------------------------
let kitalalandoSzam = veletlenEgesz(1,100);
let vege = false;
const tippek = [];


const tippInput = document.querySelector("#tipp");
const gomb = document.querySelector("#tippGomb");
const tippLista = document.querySelector("#tippek");

gomb.addEventListener("click", tippeles);

function tippeles(e){
    const tippeltSzam = parseInt(tippInput.value);
    tipp(tippeltSzam);
    tippLista.innerHTML = tippek.map(szam=> `<li>${szam} (${hasonlit(szam,kitalalandoSzam)})</li>`).join("");
}
function hasonlit(szam, kitalalandoSzam){
    if(szam < kitalalandoSzam) return "nagyobb";
    if(szam >kitalalandoSzam) return "kisebb";
    return "egyenlő"
}

function tipp(tippeltSzam){
    tippek.push(tippeltSzam);
    vege=(tippeltSzam === kitalalandoSzam);
}

function veletlenEgesz(min,max){
    const veletlen = Math.random();
    const tartomany = max - min +1;
    return Math.trunc(veletlen * tartomany) + min;
}
//------------------------------------------6. óra ---------------------------------------------------------
// 2D rajzolói környezet
const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
ctx.fillRect(5, 5, 20, 100)
ctx.strokeRect(30, 5, 20, 100)

ctx.beginPath()
ctx.rect(110, 5, 20, 100)
ctx.moveTo(130, 5)
ctx.lineTo(160, 35)
ctx.lineTo(130, 65)
ctx.stroke()

ctx.beginPath()
ctx.arc(200, 50, 30, 0, 2 * Math.PI)
ctx.fill()

ctx.beginPath()
ctx.moveTo(5, 200)
ctx.quadraticCurveTo(55, 100, 105, 200)
ctx.closePath()
ctx.stroke()

ctx.beginPath()
ctx.moveTo(105, 200)
ctx.bezierCurveTo(105, 130, 200, 150, 200, 90)
ctx.lineTo(190, 90)
ctx.lineTo(200, 80)
ctx.lineTo(210, 90)
ctx.lineTo(200, 90)
ctx.stroke()


const canvas2 = document.querySelector('#canvas2')
const ctx2 = canvas2.getContext('2d')

const random = (a, b) => Math.floor(Math.random() * (b - a + 1)) + a

const box = {
  x: 50,
  y: 50,
  vx: random(50, 200),
  vy: random(50, 200),
  width: 30,
  height: 30,
}

let lastTime = performance.now()
function mainloop(now = performance.now()) {
  window.requestAnimationFrame(mainloop)
  const dt = (now - lastTime) / 1000
  lastTime = now

  update(dt)
  draw(dt)
}
function update(dt) {
  box.x += box.vx * dt
  box.y += box.vy * dt
  if (box.x + box.width > canvas2.width) {
    box.x = 2 * (canvas2.width - box.width) - box.x
    box.vx *= -1
  }
  if (box.x < 0) {
    box.x *= -1
    box.vx *= -1
  }
  if (box.y + box.height > canvas2.height) {
    box.y = 2 * (canvas2.height - box.height) - box.y
    box.vy *= -1
  }
  if (box.y < 0) {
    box.y *= -1
    box.vy *= -1
  }
}
function draw() {
  // clear
  ctx.clearRect(0, 0, canvas2.width, canvas2.height)

  // draw box
  ctx.fillRect(box.x, box.y, box.width, box.height)
}
mainloop()