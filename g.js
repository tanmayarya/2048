var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
var sizeInput = document.getElementById('size');
var changeSize = document.getElementById('change-size');
var scoreLabel = document.getElementById('score');
var score = 0;
var size = 4;
var width = canvas.width / size - 6;
var cells = [];
var fontSize;
var loss = false;
startGame();

changeSize.onclick = function () {
	if (sizeInput.value >= 2 && sizeInput.value <= 20) {
		size = sizeInput.value;
		width = canvas.width / size - 6;
		console.log(sizeInput.value);
		canvasClean();
		startGame();
	}
}


function Cell(row, coll) {
	this.value = 0;
	this.x = coll * width + 5 * (coll + 1);
	this.y = row * width + 5 * (row + 1);
}

function createCells() {
	var i, j;
	for(i = 0; i < size; i++) {
		cells[i] = [];
		for(j = 0; j < size; j++) {
			cells[i][j] = new Cell(i, j);
		}
	}
}

function drawCell(cell) {
	ctx.beginPath();
	ctx.rect(cell.x, cell.y, width, width);
	switch (cell.value){
		case 0 : ctx.fillStyle = '#D5D0CA'; break;
		case 2 : ctx.fillStyle = '#F4EEEE'; break;
		case 4 : ctx.fillStyle = '#F3E5D1'; break;
		case 8 : ctx.fillStyle = '#F4A34D'; break;
		case 16 : ctx.fillStyle = '#FF945F'; break;
		case 32 : ctx.fillStyle = '#FF5D3A'; break;
		case 64 : ctx.fillStyle = '#FF3E00'; break;
		case 128 : ctx.fillStyle = '#F7DC6F'; break;
		case 256 : ctx.fillStyle = '#FEDD57'; break;
		case 512 : ctx.fillStyle = '#FFD83B'; break;
		case 1024 : ctx.fillStyle = '#FFCD02'; break;
		case 2048 : ctx.fillStyle = '#E5B804'; break;
		case 4096 : ctx.fillStyle = '#ffbf00'; break;
		default : ctx.fillStyle = '#ff0080';
	}
	ctx.fill();
	if (cell.value) {
		fontSize = width/2;
		ctx.font = fontSize + 'px Arial';
		ctx.fillStyle = 'white';
		ctx.textAlign = 'center';
		ctx.fillText(cell.value, cell.x + width / 2, cell.y + width / 2 + width/7);
	}
}

function canvasClean() {
	ctx.clearRect(0, 0, 500, 500);
}

document.onkeydown = function (event) {
	if (!loss) {
		if (event.keyCode === 38 || event.keyCode === 87) {
			moveUp(); 
		} else if (event.keyCode === 39 || event.keyCode === 68) {
			moveRight();
		} else if (event.keyCode === 40 || event.keyCode === 83) {
			moveDown(); 
		} else if (event.keyCode === 37 || event.keyCode === 65) {
			moveLeft(); 
		}

	}
}

function startGame() {
	createCells();
	drawAllCells();
	pasteNewCell();
  // pasteNewCell();
}

function finishGame() {
	canvas.style.opacity = '0.5';
	loss = true;
}

function drawAllCells() {
	var i, j;
	for(i = 0; i < size; i++) {
		for(j = 0; j < size; j++) {
			drawCell(cells[i][j]);
		}
	}
}

function pasteNewCell() {
	var countFree = 0;
	var i, j;
	for(i = 0; i < size; i++) {
		for(j = 0; j < size; j++) {
			if(!cells[i][j].value) {
				countFree++;
			}
		}
	}
	if(!countFree) {
		finishGame();
		return;
	}
	while(true) {
		var row = Math.floor(Math.random() * size);
		var coll = Math.floor(Math.random() * size);
		if(!cells[row][coll].value) {
			cells[row][coll].value = 2 * Math.ceil(Math.random() * 2);
			drawAllCells();
			return;
		}
	}
}
function moveRight() {
	var i, j, col;
	var action=0;
	for(i = 0; i < size; i++) {
		var store = 0;
		var count = 0;

		for (j = size - 1; j >= 0; j--) {

			if (cells[i][j].value){

				if (store==0) {
					store=cells[i][j].value;
					col = j;
				} 
				else {
					if (store == cells[i][j].value) {
						cells[i][col].value = cells[i][j].value + cells[i][col].value;
						cells[i][j].value=0;
						store=0;
						action++;
					}
					else {
						store=cells[i][j].value;
						col = j;
					}
				}
				;
			}
		}

		for (j = size - 1; j >= 0; j--) {
			if (cells[i][j].value && count != 0){
				cells[i][j+count].value=cells[i][j].value;
				cells[i][j].value=0;
				action++;
			}
			else if (!cells[i][j].value) {
				count++;
			}
		}
	}
	if (action) {
		pasteNewCell();
	}

}

function moveLeft() {
	var i, j, col;
	var action=0;
	for(i = 0; i < size; i++) {
		var store = 0;
		var count = 0;

		for (j = 0; j <size; j++) {

			if (cells[i][j].value){

				if (store==0) {
					store=cells[i][j].value;
					col = j;
				} 
				else {
					if (store == cells[i][j].value) {
						cells[i][col].value = cells[i][j].value + cells[i][col].value;
						cells[i][j].value=0;
						store=0;
						action++;
					}
					else {
						store=cells[i][j].value;
						col = j;
					}
				}
				;
			}
		}

		for (j = 0; j <size; j++) {
			if (cells[i][j].value && count != 0){
				cells[i][j-count].value=cells[i][j].value;
				cells[i][j].value=0;
				action++;
			}
			else if (!cells[i][j].value) {
				count++;
			}
		}
	}
	if (action) {
		pasteNewCell();
	}

}

function moveUp() {
	var i, j, row;
	var action=0;
	for(j = 0; j < size; j++) {
		var store = 0;
		var count = 0;

		for (i = 0; i < size; i++) {

			if (cells[i][j].value){

				if (store==0) {
					store=cells[i][j].value;
					row = i;
				} 
				else {
					if (store == cells[i][j].value) {
						cells[row][j].value = cells[i][j].value + cells[row][j].value;
						cells[i][j].value=0;
						store=0;
						action++;
					}
					else {
						store=cells[i][j].value;
						row = i;
					}
				}
				;
			}
		}

		for (i = 0; i < size; i++) {
			if (cells[i][j].value && count != 0){
				cells[i-count][j].value=cells[i][j].value;
				cells[i][j].value=0;
				action++;
			}
			else if (!cells[i][j].value) {
				count++;
			}
		}
	}
	if (action) {
		pasteNewCell();
	}

}

function moveDown() {
	var i, j, row;
	var action=0;
	for(j = 0; j < size; j++) {
		var store = 0;
		var count = 0;

		for (i = size - 1; i >= 0; i--) {

			if (cells[i][j].value){

				if (store==0) {
					store=cells[i][j].value;
					row = i;
				} 
				else {
					if (store == cells[i][j].value) {
						cells[row][j].value = cells[i][j].value + cells[row][j].value;
						cells[i][j].value=0;
						store=0;
						action++;
					}
					else {
						store=cells[i][j].value;
						row = i;
					}
				}

			}
		}
		count = 0;
		for (i = size - 1; i >= 0; i--) {
			if (cells[i][j].value && count != 0){
				cells[i+count][j].value=cells[i][j].value;
				cells[i][j].value=0;
				action++;
			}
			else if (!cells[i][j].value) {
				count++;
			}
		}
	}
	if (action) {
		pasteNewCell();
	}

}
