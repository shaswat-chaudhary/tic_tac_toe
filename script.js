const boxes = document.querySelectorAll(".box");
const gamePlayer = document.querySelector(".game-player");
const newGamebtn = document.querySelector(".btn");


let currentPlayer;
let gameGrid;

const winingPosition = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
]

function initGame() {

    currentPlayer = "X";
    gameGrid = ["","","","","","","","",""];
    boxes.forEach((box,index) => {
        box.innerText = "";
        boxes[index].style.pointerEvents = "all";
        box.classList = `box box${index+1}`;
    });
    newGamebtn.classList.remove("active");
    gamePlayer.innerText = `Current Player - ${currentPlayer}`;
   

}
initGame();


function swapTurn(){
    if(currentPlayer === "X"){
        currentPlayer = "O";
    }
    else{
        currentPlayer = "X";
    }

    gamePlayer.innerText = `Current Player - ${currentPlayer}`;
}

function checkGameOver(){
     
    let answer = "";

    winingPosition.forEach((position) => {
        if( (gameGrid[position[0]] !== "" || gameGrid[position[1]] !== "" || gameGrid[position[2]] !== "")
           && (gameGrid[position[0]] === gameGrid[position[1]] ) && (gameGrid[position[1]] === gameGrid[position[2]]))
           {

            //check if winner is x

            if(gameGrid[position[0]] === "X")
            answer = "X";
            else {
                answer = "O";
            }

            //disable pointer
            boxes.forEach((box) => {
                box.style.pointerEvents = "none";
            })

            //now we know X/O is winner
            boxes[position[0]].classList.add("win");
            boxes[position[1]].classList.add("win");
            boxes[position[2]].classList.add("win");
           }
    });

if(answer !== ""){
    gamePlayer.innerText = `Winner Player - ${answer}`;
    newGamebtn.classList.add("active");
    return;
}

let fillCount = 0;
gameGrid.forEach((box) => {
    if(box !== "")
    fillCount++;
});

if(fillCount ===9){
    gamePlayer.innerText = "Game Tied !";
    newGamebtn.classList.add("active");
}

}

function handleClick(index){
    if(gameGrid[index] === ""){
        boxes[index].innerText = currentPlayer;
        gameGrid[index] = currentPlayer;
        boxes[index].style.pointerEvents = "none";

        //swap turn

        swapTurn();

        //winner 

        checkGameOver();
    }

}

boxes.forEach((box,index) => {
    box.addEventListener("click", () => {
        handleClick(index);
    })
})

newGamebtn.addEventListener("click", initGame);