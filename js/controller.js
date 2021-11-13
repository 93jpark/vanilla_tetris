'use strict';
console.log('controller is connected');

document.addEventListener('keydown', logKey);
window.addEventListener('keydown', disableScroll);
document.addEventListener('keydown', detectKeyStroke);
//document.querySelector('#res_status').innerHTML = `${CANVAS.offsetWidth} * ${CANVAS.offsetHeight}`;

let temp_count = 0; // will be removed later


function disableScroll(e) {
    switch(e.code) {
        case "ArrowUp": case "ArrowDown": 
        case "ArrowLeft": case "ArrowRight" : case "Space": 
        e.preventDefault(); // prevent scoll viewpoint of browser.
        break;

        default: break; // pass other keys
    }
}

function detectKeyStroke(e) {
    // up 38, left 37, right 39, down 40
    switch(e.keyCode) {
        case 37: // left
            moveBlock(-1, 0);
            console.log("left"); break;
        case 38: // up
            //moveBlock(0, -1);
            console.log("up"); break;
       case 39: // right
            moveBlock(1, 0);
            console.log("right"); break;
        case 40: // down
            moveBlock(0, 1);
            tm.score += 1;
        default:
            //console.log('invalid key input');
        
    }
}

// create new block
function createNewBlock() {
    console.log('\t createNewBlock()');
    if(tm.isActive) {
        console.log("active");
        // apply playing block to status array
        //tm.status[tm.block.y_pos][tm.block.x_pos] = 0;        
    } else {
        console.log("not active");
        tm.isActive = true;
    }
    // new block creation position is (0,5)
    tm.block.x_pos = 5;
    tm.block.y_pos = 0;

    tm.block.type = Math.floor(Math.random() * 5);
    fillBricksToBlock(tm.block.type);
}

function fillBricksToBlock(type) {
    let x = tm.block.x_pos;
    let y = tm.block.y_pos;
    
    switch(type) {
        case 0: // ㅁ
            // (0,0) (1,0) (1,-1) (0,-1)
            tm.block.bricks[0] = [x,y];
            tm.block.bricks[1] = [x+1,y];
            tm.block.bricks[2] = [x+1,y-1];
            tm.block.bricks[3] = [x,y-1];
            break;
        case 1: // L
            // (0,0) (0,-1) (0,-2) (1,0)
            tm.block.bricks[0] = [x,y]
            tm.block.bricks[1] = [x,y-1]
            tm.block.bricks[2] = [x,y-2]
            tm.block.bricks[3] = [x+1,y]
            break;
        case 2: // Z
            //  (0,0) (-1,-1) (0,-1) (1,0)
            tm.block.bricks[0] = [x,y]
            tm.block.bricks[1] = [x-1,y-1]
            tm.block.bricks[2] = [x,y-1]
            tm.block.bricks[3] = [x+1,y]
            break;
        case 3: // ㅡ
            // (0,0) (0,-1) (0,-2) (0,-3)
            tm.block.bricks[0] = [x,y]
            tm.block.bricks[1] = [x,y-1]
            tm.block.bricks[2] = [x,y-2]
            tm.block.bricks[3] = [x,y-3]
            break;
        case 4: // ㅗ
            // (0,0) (1,0) (-1,0) (0,-1)
            tm.block.bricks[0] = [x,y]
            tm.block.bricks[1] = [x+1,y]
            tm.block.bricks[2] = [x-1,y]
            tm.block.bricks[3] = [x,y-1]
            break;

    }
}

function getBricksOfBlock(type, new_x, new_y) {
    let x = new_x;
    let y = new_y;
    
    let newBricks = Array(4);

    switch(type) {
        case 0: // ㅁ
            // (0,0) (1,0) (1,-1) (0,-1)
            newBricks[0] = [x,y];
            newBricks[1] = [x+1,y];
            newBricks[2] = [x+1,y-1];
            newBricks[3] = [x,y-1];
            break;
        case 1: // L
            // (0,0) (0,-1) (0,-2) (1,0)
            newBricks[0] = [x,y]
            newBricks[1] = [x,y-1]
            newBricks[2] = [x,y-2]
            newBricks[3] = [x+1,y]
            break;
        case 2: // Z
            //  (0,0) (-1,-1) (0,-1) (1,0)
            newBricks[0] = [x,y]
            newBricks[1] = [x-1,y-1]
            newBricks[2] = [x,y-1]
            newBricks[3] = [x+1,y]
            break;
        case 3: // ㅡ
            // (0,0) (0,-1) (0,-2) (0,-3)
            newBricks[0] = [x,y]
            newBricks[1] = [x,y-1]
            newBricks[2] = [x,y-2]
            newBricks[3] = [x,y-3]
            break;
        case 4: // ㅗ
            // (0,0) (1,0) (-1,0) (0,-1)
            newBricks[0] = [x,y]
            newBricks[1] = [x+1,y]
            newBricks[2] = [x-1,y]
            newBricks[3] = [x,y-1]
            break;
    }
    return newBricks;
}


// set current block's bricks position to status array
function setCurrentBlock(curr) {
    let bricks = tm.block.bricks;
    for(let i=0; i<bricks.length; i++) {
        let x = tm.block.bricks[i][0] // x
        let y = tm.block.bricks[i][1] // y
        tm.status[y][x] = 1;
    }
}


function detectCollision1(next) {
    let bricks = getBricksOfBlock(tm.block.type, next.x, next.y);
    for(let i = 0; i < bricks.length; i++) {
        let x = bricks[i][0];
        let y = bricks[i][1];
        console.log("pos 0")
        if(y>=0 && x>=0) {
            console.log("pos 1")
            if(tm.status[y][x] >= 1) {
                console.log("pos 2")
                return true
            }
        }
        
    }
    console.log("pos 3")
    return false;
}


function moveBlock(x_change, y_change) {
    console.log("DELIVER CHANGE")
    if(!tm.isActive) {
        console.log("to move, map is not active");
        createNewBlock();
    } else {
        console.log("to move, map is active");
        let prev = { x: tm.block.x_pos, y: tm.block.y_pos };
        let next = { x: tm.block.x_pos + x_change, y: tm.block.y_pos + y_change };
        
        
        // TEST CODE GOES HERE
        if(detectCollision1(next)) {
            // collision occurred, save current block position
            console.log("if");
            setCurrentBlock(prev);
            createNewBlock();

        } else {
            // make block move
            console.log("else");
            console.log("\t\tblcok is moved");
            console.log(`\t\tprev: ${tm.block.x_pos}, ${tm.block.y_pos}, next: ${next.x}, ${next.y}`);
            tm.block.x_pos = next.x;
            tm.block.y_pos = next.y;
            fillBricksToBlock(tm.block.type);
        }
    
/*
        // prevent move out of playground
        if( prev.x+x_change >= 0 && prev.x+x_change <= tm.mapSize.width-1 ) {
            console.log("x increased")
            next.x = tm.block.x_pos + x_change;
        } 
        if( prev.y+y_change >= 0 && prev.y+y_change <= tm.mapSize.height ) {
            console.log("y increased")
            next.y = tm.block.y_pos + y_change;
        }
    
        // detect collision 
        // if collision, save block pos and create new block
        // if not, move block
        if(detectCollision(next)) {
            console.log("COLLISION")
            createNewBlock();
        } else {
            console.log('NOT COLLISION')
            tm.block.x_pos = next.x;
            tm.block.y_pos = next.y;
            fillBricksToBlock(tm.block.type);
        }
    */
    }

    // re-render playground
    initializeDisplay();
    updateMap();
    detectClear();   

}


// detect collision against existing blocks or bottom, and return true/false
function detectCollision(next) {
    console.log('\t detectCollision()');


    // collision against bottom line
    if(next.y == 16) {
        return true;
    }

    // collision against existing block
    if (tm.status[next.y][next.x]>0) {
        return true;
    } else {
        return false;
    }
}

function applyClear(clearedList) {
    console.log('\t applyClear()');

    let getScore = 0;
    if(clearedList.length > 2) {
        getScore = clearedList.length * 200;
    } else {
        getScore = clearedList.length * 100;
    }
    tm.score += getScore;
    
    // drop down all lines above the cleared line
    for(let i=0; i<clearedList.length; i++) {
        let clearedLine = clearedList[i];
        tm.status[clearedLine].fill(0);
        for (let r = clearedLine; r > 0; r--) {
            tm.status[r] = tm.status[r-1];
        }   
    }
}

let autoDrop = setInterval(()=>moveBlock(0, 1), 100);


// detect line claer
function detectClear() {
    //console.log('\t detectClear()');
    let row = tm.mapSize.height;
    let col = tm.mapSize.width;
    let clearedList = [];

    for(let r = 0; r < row; r++) { // ~16
        let sum = 0; 
        for(let c = 0; c < col; c++) { // ~10
            sum += tm.status[r][c];
        }
        if(sum >= 10) {
            clearedList.push(r);
        }
    }

    if(clearedList.length > 0) {
        applyClear(clearedList);
    }

}

function gameOver() {
    alert('game over');
}


function logKey(e) {
    //console.log(`${e.code} is pressed`);
    //console.log(`${e.keyCode} is pressed`);
    document.querySelector('#keydown_status').innerHTML = `${e.code}`;

    temp_count++;
    if(temp_count > 10) {
        temp_count = 0;
        console.clear();
    }
}


// // monitor whether focus status
// if (CANVAS.hasFocus) {
//     document.querySelector('#focus_status').innerHTML = `out`;
// } else {
//     document.querySelector('#focus_status').innerHTML = `in`;
// }

