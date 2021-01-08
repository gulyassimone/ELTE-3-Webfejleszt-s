const canvas = document.querySelector('canvas');
const context = canvas.getContext('2d');

let x = 0;
let xVelocity = 0;

let y = 0;
let yVelocity = 0;

const player = {
    width: 32,
    height: 32,
    velocityX: 0,
    velocityY: 0
};
let playerX = canvas.width / 2 - player.width / 2  ;
let playerY = canvas.height / 2 - player.height / 2 ;

function render() {
    requestAnimationFrame(render);

    context.clearRect(0, 0, canvas.width, canvas.height);

    // render player
    context.fillRect(playerX, playerY, player.width, player.height);

    // move player
    const newPlayerX = playerX + player.velocityX;
    const newPlayerY = playerY + player.velocityY;

    if (newPlayerX + player.width <= canvas.width && newPlayerX >= 0) {
        playerX = newPlayerX;
    }
    if (newPlayerY + player.height <= canvas.height && newPlayerY >= 0) {
        playerY = newPlayerY;
    }
}

render();

window.addEventListener('keydown', function (event) {
    if (player.velocityX === 0) {
        if (event.key === 'ArrowRight') {
            player.velocityX = 3;
        }
        else if (event.key === 'ArrowLeft') {
            player.velocityX = -3;
        }
    }
    if (player.velocityY === 0) {
        if (event.key === 'ArrowUp') {
            player.velocityY = -3;
        }
        else if (event.key === 'ArrowDown') {
            player.velocityY = 3;
        }
    }
});

window.addEventListener('keyup', function (event) {
    if (event.key === 'ArrowRight' && player.velocityX > 0 || event.key === 'ArrowLeft' && player.velocityX < 0) {
        player.velocityX = 0;
    }
    else if (event.key === 'ArrowUp' && player.velocityY  < 0 || event.key === 'ArrowDown' && player.velocityY > 0) {
        player.velocityY = 0;
    }
});
