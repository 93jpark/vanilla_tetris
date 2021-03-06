'use strict';
console.log('view is connected');


// draw canvas, score board, and grid map
function initializeDisplay() {
    // monitor score board
    document.querySelector('#score_board').innerHTML = tm.score;

    ctx = CANVAS.getContext('2d');
    // set up canvas outline
    ctx.stroke();
    ctx.lineWidth = 0.3;
    ctx.clearRect(0,0,CANVAS.width, CANVAS.height);
    ctx.beginPath();
    drawMapOutline();
}

// draw empty map grid outline 
function drawMapOutline() {
    let row = CANVAS.height / BRICK_SIZE;
    let col = CANVAS.width / BRICK_SIZE;

    for(let r = 0; r <= row; r++) {
        for(let c = 0; c <= col; c++) {
            ctx.strokeRect(c*BRICK_SIZE, r*BRICK_SIZE, BRICK_SIZE, BRICK_SIZE);
        }
    }
}

// fill out a point on map
function fillCoordinatePoint(x_pos, y_pos){
    ctx.fillStyle = "#F5AC4E";
    ctx.fillRect(x_pos*BRICK_SIZE, y_pos*BRICK_SIZE, BRICK_SIZE, BRICK_SIZE);
    ctx.strokeRect(x_pos*BRICK_SIZE, y_pos*BRICK_SIZE, BRICK_SIZE, BRICK_SIZE);
}

// render block shape on map
function renderBlock() {
    for(let i = 0; i < 4; i++) {
        fillCoordinatePoint(tm.block.bricks[i][0], tm.block.bricks[i][1]);
    }
}


// update map with map status
function updateMap() {
    //fillCoordinatePoint(tm.block.x_pos, tm.block.y_pos);
    renderBlock();

    // fill map based on map status
    for(let r = 0; r < tm.mapSize.height; r++) {
        for(let c = 0; c < tm.mapSize.width; c++) {
            if(tm.status[r][c] > 0) {
                ctx.fillStyle = "#C62B27"; // dropped block's color
                ctx.fillRect(c*BRICK_SIZE, r*BRICK_SIZE, BRICK_SIZE, BRICK_SIZE);
                ctx.strokeRect(c*BRICK_SIZE, r*BRICK_SIZE, BRICK_SIZE, BRICK_SIZE);
            }            
        }
    }

}