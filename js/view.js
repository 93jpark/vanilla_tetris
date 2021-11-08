'use strict';
console.log('view is connected');

/* GLOBAL CONST for canvas */
const CANVAS = document.querySelector('#playground');
const BRICK_SIZE = 50;

let ctx = CANVAS.getContext('2d');
ctx.stroke();
ctx.lineWidth = 0.1;

initializeDisplay();
fillCoordinatePoint(9,15);


function initializeDisplay() {
    ctx = CANVAS.getContext('2d');
    // set up canvas outline
    ctx.stroke();
    ctx.lineWidth = 0.1;
    drawMapOutline();    
}

function drawMapOutline() {
    let row = CANVAS.height / BRICK_SIZE;
    let col = CANVAS.width / BRICK_SIZE;
    console.log(`Tetris playground size: ${col} x ${row}`)

    for(let r = 0; r <= row; r++) {
        for(let c = 0; c <= col; c++) {
            ctx.strokeRect(c*BRICK_SIZE, r*BRICK_SIZE, BRICK_SIZE, BRICK_SIZE);
        }
    }
}

function fillCoordinatePoint(x_pos, y_pos){
    ctx.fillStyle = "#FF0000";
    ctx.fillRect(x_pos*BRICK_SIZE, y_pos*BRICK_SIZE, BRICK_SIZE, BRICK_SIZE);
}

function updateMap() {

}