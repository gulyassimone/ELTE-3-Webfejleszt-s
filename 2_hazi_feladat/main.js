function getRandomInteger(min, max) {
	return Math.floor(Math.random() * (max - min + 1) + min);
}


const redSquare = document.querySelector('.red-square');
redSquare.addEventListener("mouseenter", function( event ) {  

	const maxX = window.innerWidth - 100;
	const maxY = window.innerHeight - 100; 
	
   redSquare.style.position = "absolute";
   redSquare.style.left = getRandomInteger(0,maxX) + "px";
   redSquare.style.top = getRandomInteger(0,maxY) + "px";
});