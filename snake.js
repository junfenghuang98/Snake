window.onload=function() {
	canvas=document.getElementById("snake");
	board=canvas.getContext("2d");
	document.addEventListener("keydown", keyPress);
	setInterval(game, 1000/15);
}


//Initialize variables
//Game board of 25x25
gameSize = 25;
tileCount = 25;
//Character coordinates
coordX = 0;
coordY = 0;
//Character velocities
xVelocity = 0;
yVelocity = 0;
//Object to be eaten by snake's initial coordinates
objCoordX = 10;
objCoordY = 15;
//Snake tail and trail
tail = 10;
trail = [];

function game() {
	//If you go off the map, wraps the snake around
	if (coordX > tileCount - 1){
		coordX = 0;
	}
	if (coordX < 0){
		coordX = tileCount - 1;
	}
	if (coordY > tileCount - 1){
		coordY = 0;
	}
	if (coordY < 0){
		coordY = tileCount - 1;
	}


	//Black board, orange snake
	board.fillStyle="black";
	board.fillRect(0, 0, canvas.width, canvas.height);
	board.fillStyle="orange";

	coordX += xVelocity;
	coordY += yVelocity;

	//Snake growth 
	for(let i = 0; i < trail.length; ++i){
		board.fillRect(trail[i].x * gameSize, trail[i].y * gameSize, gameSize - 2, gameSize - 2);
		//Collision of tail and snake resets game
		if (trail[i].y == coordY && trail[i].x == coordX){
			tail = 1;
		}
	}

	trail.push({x:coordX, y:coordY});
	while (tail < trail.length) {
		trail.shift();
	}

	if(coordX == objCoordX && coordY == objCoordY){
		++tail;
		objCoordX = Math.floor(Math.random() * tileCount);
		objCoordY = Math.floor(Math.random() * tileCount);
	}

	board.fillStyle = "purple";
	board.fillRect(objCoordX * gameSize, objCoordY * gameSize, gameSize - 2, gameSize - 2);
}

function keyPress (arrowKey){
	switch(arrowKey.keyCode){
		case 37:
			xVelocity = -1;
			yVelocity = 0;
			break;
		case 38:
			xVelocity = 0;
			yVelocity = -1;
			break;
		case 39:
			xVelocity = 1;
			yVelocity = 0;
			break;
		case 40:
			xVelocity = 0;
			yVelocity = 1;
			break;
	}
}