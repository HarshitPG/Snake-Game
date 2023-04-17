const GameBody = document.querySelector(".gamebody");
const ScoreCount = document.querySelector(".score");
const HighScoreCount = document.querySelector(".highscore");
const Controls = document.querySelectorAll(".fa-solid");


let gamefinished=false;
let interval;
let snakeX = 10, snakeY = 13;
let snakebody = [];
let directionX=0, directionY=0;
let score=0;

let HighScore = localStorage.getItem("highscore") || 0; 
HighScoreCount.innerHTML=`HighScore:${HighScore}`;

function gameover(){
    clearInterval(interval);
    alert("Game Over! Press OK to Play Again..")
    location.reload(); 
}

function FoodPosition(){
    foodX = Math.floor(Math.random()*30) + 1;
    foodY = Math.floor(Math.random()*30) + 1;
}

function changedirection(event){
    if(event.key === "ArrowUp"){
        directionX = 0;
        directionY = -1;
    }
    else if(event.key === "ArrowDown"){
        directionX = 0;
        directionY = 1;
    }
    else if(event.key === "ArrowRight"){
        directionX = 1;
        directionY = 0;
    }
    else if(event.key === "ArrowLeft"){
        directionX = -1;
        directionY = 0;
    }

}


function initgame(){
    if(gamefinished) return gameover();
    let htmlMarkup = `<div class="food" style="grid-area: ${foodY}/${foodX}"></div>`;
    if( snakeX === foodX && snakeY === foodY ){
        FoodPosition();
        snakebody.push([foodX,foodY]);
        score++;

        HighScore = score >= HighScore ? score : HighScore;
        localStorage.setItem("highscore",HighScore);
        ScoreCount.innerHTML=`Score:${score}`;
        HighScoreCount.innerHTML=`HighScore:${HighScore}`;

    }

   for (let i = snakebody.length - 1; i > 0; i--) { 
        snakebody[i] = snakebody[i-1];
    }

    snakebody[0] = [snakeX,snakeY];

    snakeX+=directionX;
    snakeY+=directionY;

    if(snakeX<=0 || snakeX>30 || snakeY<=0 || snakeY>30){
        gamefinished = true;
    }

    for (let i  = 0; i < snakebody.length; i++) {
        htmlMarkup += `<div class="snake" style="grid-area: ${snakebody[i][1]}/${snakebody[i][0]}"></div>`; 
        
        if(i !==0 && snakebody[0][1] === snakebody[i][1] && snakebody[0][0] === snakebody[i][0]){
            gamefinished= true; 
        }
    }
    GameBody.innerHTML = htmlMarkup;
}

Controls.forEach((div) => {
    div.addEventListener("click", () => {
        if (div.classList.contains("fa-arrow-right")) {
            directionX = 1;
            directionY = 0;
        } else if (div.classList.contains("fa-arrow-up")) {
            directionX = 0;
            directionY = -1;
        } else if (div.classList.contains("fa-arrow-down")) {
            directionX = 0;
            directionY = 1;
        }else if (div.classList.contains("fa-arrow-left")) {
            directionX = -1;
            directionY = 0;
        }else {
            console.log("Box clicked");
        }
    });
});
document.addEventListener("keydown",changedirection);

FoodPosition();
interval = setInterval(initgame,175);