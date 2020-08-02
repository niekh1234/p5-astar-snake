let snake = [];
let xVel = 0;
let yVel = 0;
let foodX;
let foodY;
const gridSize = 20;

function setup(){
    createCanvas(800,800);
    background(0,0,0);

    foodX = getRandomCoord();
    foodY = getRandomCoord();

    start();
}

function draw(){
    frameRate(8);
    background(0);

    // displaying the food
    fill(255, 0, 0);
    rect(foodX, foodY, width / gridSize, height / gridSize);

    // updating snake heads position. (Only when controlling manually)
    snake[0][0]+=xVel;
    snake[0][1]+=yVel;

    // checking if the snake is out of bounds.
    if(snake[0][0] < 0 || snake[0][0] >= width || snake[0][1] < 0 || snake[0][1] >= height){
        // background(255,0,0);
        start();
    }

    // checking if the snake ate food.
    if(snake[0][0] == foodX && snake[0][1] == foodY){
        snake.push([snake[0][0], snake[0][1]]);

        foodX = getRandomCoord();
        foodY = getRandomCoord();

        // make sure the food is not in the snake.
        while(isInSnake([foodX, foodY])){
            foodX = getRandomCoord();
            foodY = getRandomCoord();           
        }
    }

    const nextSquare = genPath().pop();

    snake[0][0] = nextSquare[0];
    snake[0][1] = nextSquare[1];

    // displaying the snake
    for(let i = snake.length - 1; i >= 0; i--){
        fill(0,255,0);
        rect(snake[i][0], snake[i][1], width / gridSize, height / gridSize);

        if(i == 0){
            continue;
        }
        // moving a body part one step closer to the head
        snake[i][0] = snake[i-1][0];
        snake[i][1] = snake[i-1][1];
    }
}

// get a random coord on the grid.
function getRandomCoord(){
    return Math.floor(Math.random() * gridSize) * 40;
}

// function to check if the snake is not going in itself by checking if there are duplicates in the array.
function checkDuplicate(s){
    let seen = [];
    let duplicate = false;

    s.forEach((bodyPart)=>{
        if(seen[bodyPart]){
            duplicate = true;
        } else {
            seen[bodyPart] = true;
        }
    })

    return duplicate;
}

// function to determine if a coord is in the snake.
function isInSnake(food){
    let foodInSnake = false;

    snake.forEach((bodyPart)=>{
        if(bodyPart[0] == food[0] && bodyPart[1] == food[1]){
            foodInSnake = true;
        }
    })

    return foodInSnake;
}

// function for resetting board, and variables.
function start(){
    snake = [];

    const startX = 400;
    const startY = 400;
    
    xVel = 0;
    yVel = 0;

    snake.push([startX, startY]);
    snake.push([startX, startY]);
}