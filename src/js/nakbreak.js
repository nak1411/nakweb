//GAME VARS
let canvas = document.getElementById('game');
let screenWidth = canvas.width;
let screenHeight = canvas.height;
let context = canvas.getContext('2d');
let lastTime = (new Date()).getTime();
let currentTime = 0;
let delta = 0;
let score = document.getElementById('score');
let points;
let running = false;

//BALL VARS
let ballSize = 10;
let ballX;
let ballY;
let ballSpeed = 4;
let dX;
let dY;
let toggle = false;

//PLAYER VARS
let playerWidth = 100;
let playerHeight = 10;
let px = screenWidth / 2;

//BRICK VARS
let brickOffX = 10;
let brickOffY = 10;
let brickWidth = 50;
let brickHeight = 20;
let brickRows = 5;
let brickCols = 7;
let brickPadding = 5;
let bricks = [];

const init = () => {
    if (running) {
        return;
    } else {
        running = true;
        ballX = 200;
        ballY = 200;
        px = screenWidth / 2
        dX = ballSpeed;
        dY = ballSpeed;
        points = 0;
        //CREATE BRICKS
        for (let y = 0; y < brickRows; y++) {
            for (let x = 0; x < brickCols; x++) {
                bricks.push({
                    x: (x * (brickWidth + brickPadding)) + brickOffX,
                    y: (y * (brickHeight + brickPadding)) + brickOffY,
                    cg: Math.random() * 256,
                    cr: Math.random() * 256,
                    cb: Math.random() * 256,
                    state: 1
                });
            }
        }
        run();
    }
}

const run = () => {
    if (running) {
        requestAnimationFrame(run);
        currentTime = (new Date()).getTime();
        delta = (currentTime - lastTime) / 1000;
        update();
        render();
        lastTime = currentTime;
    } else {
        window.location.reload();
    }
}

const render = () => {
    //CLEAR SCREEN
    context.fillStyle = '#000';
    context.fillRect(0, 0, screenWidth, screenHeight);
    //RENDER BRICKS
    bricks.forEach(b => {
        if (!b.state) return;
        context.fillStyle = `rgb(${b.cr}, ${b.cg}, ${b.cb})`;
        context.fillRect(b.x, b.y, brickWidth, brickHeight);
    });
    //RENDER BALL
    context.fillStyle = '#fff';
    context.beginPath();
    context.arc(ballX, ballY, ballSize, 0, Math.PI * 2);
    context.fill();
    //RENDER PLAYER
    context.fillStyle = '#098';
    context.fillRect(px - playerWidth / 2, screenHeight - playerHeight, playerWidth, playerHeight);
}

const update = () => {
    if (ballY + ballSize > screenHeight) {
        alert("YOU LOSE")
        running = false;
    }

    if (bricks.length <= 0) {
        alert("YOU WIN");
        running = false;
    }
    checkCollision();

    //CHANGE BALL DIRECTION 
    if ((ballY + ballSize > screenHeight - playerHeight)) {
        //LEFT HALF
        if ((ballX > px - (playerWidth / 2) && ballX < px) && dX > 0) {
            dX /= px * .01 * -1;
        }
        //RIGHT HALF 
        if ((ballX > px && ballX < px + (playerWidth / 2))) {
            dX /= px * .01;
        }
    }
    //UPDATE BALL POS
    if (toggle) {
        ballX += dX;
        ballY += dY;
    }
}

const checkCollision = () => {
    //CHECK PLAYER SIDE COLLISION
    if (px < 0 + playerWidth / 2) {
        px = 0 + playerWidth / 2;
    }
    if (px >= screenWidth - playerWidth / 2) {
        px = screenWidth - playerWidth / 2;
    }
    //CHECK BALL SIDE COLLISION 
    if ((ballX >= screenWidth - ballSize) || (ballX < ballSize)) {
        dX = -dX;
    }
    //CHECK BALL COLLISION WITH PADDLE/BOTTOM/TOP
    if (ballY <= 0 + ballSize) {
        dY = -dY;
    }

    if (ballY + ballSize > screenHeight - playerHeight) {
        if (ballX > px - (playerWidth / 2) && ballX < px + (playerWidth / 2)) {
            dX = ballSpeed;
            dY = -dY;
        }

    }
    //CHECK BALL BRICK COLLISION
    bricks.forEach(b => {
        if (!b.state) return;
        let inBricksColumn = ballX + ballSize > b.x && ballX - ballSize < b.x + brickWidth;
        let inBricksRow = ballY + ballSize > b.y && ballY - ballSize < b.y + brickHeight;

        if (inBricksColumn && inBricksRow) {
            dY = -dY;
            b.state = 0;
            bricks.splice(bricks.indexOf(b), 1);
            points++;
            score.innerHTML = `SCORE: ${points}`;
        }
    });
}

const getMousePos = (canvas, e) => {
    let rect = canvas.getBoundingClientRect();
    return {
        x: e.clientX - rect.left,
    };
}

window.addEventListener("mousemove", function (e) {
    let mousePos = getMousePos(canvas, e);
    px = mousePos.x;
}, false);

window.addEventListener("touchmove", function (e) {
    let touchPos = e.changedTouches[0];
    px = touchPos.clientX;
}, false);

window.addEventListener("touchmove", function (e) {
    let touchPos = e.changedTouches[0];
    px = touchPos.clientX;
}, false);

window.addEventListener("click", function (e) {
    if (!toggle) {
        toggle = true;
        dX = 0;
    }
}, false);

init();