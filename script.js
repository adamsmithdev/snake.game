// canvas
const blockSize = 25;
const rows = 20;
const columns = 20;
let canvas;
let context;

// snake
let snakeX = blockSize * 5;
let snakeY = blockSize * 5;
let snakeParts = [];

// velocity
let velocityX = 0;
let velocityY = 0;

// food
let foodX;
let foodY;

let score = 0;
let speed = 10;

window.onload = () => {
    startGame();
    document.addEventListener('keydown', changeDirection);
    setInterval(drawGame, 1000 / speed);
};

const startGame = () => {
    canvas = document.getElementById('canvas');
    canvas.height = rows * blockSize;
    canvas.width = columns * blockSize;
    context = canvas.getContext('2d');

    placeFood();
};

const drawGame = () => {
    if (gameOver()) {
        document.getElementById('restart').hidden = false;
        return;
    }

    // draw canvas
    context.fillStyle = '#121212';
    context.fillRect(0, 0, canvas.width, canvas.height);

    // draw food
    context.fillStyle = '#d03e16';
    context.fillRect(foodX, foodY, blockSize, blockSize);

    // if the snake and food are in the same location, eat the food
    if (snakeX === foodX && snakeY === foodY) {
        snakeParts.push([foodX, foodY]);
        placeFood();
        score++;
    }

    // push the snake parts along with the snake
    for (let i = snakeParts.length - 1; i > 0; i--) {
        snakeParts[i] = snakeParts[i - 1];
    }

    if (snakeParts.length) {
        snakeParts[0] = [snakeX, snakeY];
    }

    // draw snake
    context.fillStyle = '#1685d0';
    snakeX += velocityX * blockSize;
    snakeY += velocityY * blockSize;
    context.fillRect(snakeX, snakeY, blockSize, blockSize);

    // draw snake parts
    for (const bodyPart of snakeParts) {
        context.fillRect(bodyPart[0], bodyPart[1], blockSize, blockSize);
    }

    drawScore();
};

const changeDirection = (e) => {
    if (e.code == 'ArrowUp' && velocityY != 1) {
        velocityX = 0;
        velocityY = -1;
    } else if (e.code === 'ArrowDown' && velocityY != -1) {
        velocityX = 0;
        velocityY = 1;
    } else if (e.code === 'ArrowLeft' && velocityX != 1) {
        velocityX = -1;
        velocityY = 0;
    } else if (e.code === 'ArrowRight' && velocityX != -1) {
        velocityX = 1;
        velocityY = 0;
    }
};

const placeFood = () => {
    foodX = Math.floor(Math.random() * columns) * blockSize;
    foodY = Math.floor(Math.random() * rows) * blockSize;
};

const drawScore = () => {
    context.fillStyle = '#fff';
    context.font = '14px verdena';
    context.fillText(`Score: ${score}`, canvas.width - 55, 20);
};

const gameOver = () => {
    let gameOver = false;

    // if the snake hits a wall, game over
    if (
        snakeX < 0 ||
        snakeX === columns * blockSize ||
        snakeY < 0 ||
        snakeY === rows * blockSize
    ) {
        gameOver = true;
    }

    // if the snake hits itself, game over
    for (const bodyPart of snakeParts) {
        if (snakeX === bodyPart[0] && snakeY === bodyPart[1]) {
            gameOver = true;
        }
    }

    if (gameOver) {
        context.fillStyle = '#fff';
        context.font = '50px verdana';
        context.fillText('Game Over', canvas.width / 5, canvas.height / 2);
    }

    return gameOver;
};
