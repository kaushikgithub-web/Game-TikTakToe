let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset-btn");
let newGameBtn = document.querySelector("#newgame-btn");
let MsgContainer = document.querySelector(".msg-container");
let Msg = document.querySelector("#msg");
let gameContainer = document.querySelector(".game");

let turnO = true;

const winPatterns = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8],
];

const soundX = new Audio('./sounds/playerO.wav');
const soundO = new Audio('./sounds/player X.wav');
const soundWinner = new Audio('./sounds/winner.wav');
const soundreset = new Audio('./sounds/restart-84727.mp3');

const resetgame = () => {
    turnO = true;
    soundreset.play();
    enableBoxes();
    gameContainer.classList.remove("fade-out");
    MsgContainer.classList.add("hide");
    MsgContainer.classList.remove("show");
}

boxes.forEach((box) => {
    box.addEventListener("click", () => {
        if (turnO) {
            box.innerText = "O";
            soundO.play();
            turnO = false;
        } else {
            box.innerText = "X";
            soundX.play();
            turnO = true;
        }
        box.disabled = true;
        checkWinner();
    });
});

const disableBoxes = () => {
    for (let box of boxes) {
        box.disabled = true;
    }
}

const enableBoxes = () => {
    for (let box of boxes) {
        box.disabled = false;
        box.innerText = "";
    }
}

const showWinner = (winner) => {
    Msg.innerText = `Congratulations, Winner is ${winner}`;
    soundWinner.play();
    gameContainer.classList.add("fade-out");
    MsgContainer.classList.remove("hide");
    MsgContainer.classList.add("show");
};

const checkWinner = function () {
    for (let pattern of winPatterns) {
        let pos1val = boxes[pattern[0]].innerText;
        let pos2val = boxes[pattern[1]].innerText;
        let pos3val = boxes[pattern[2]].innerText;

        if (pos1val != "" && pos2val != "" && pos3val != "") {
            if (pos1val === pos2val && pos2val === pos3val) {
                showWinner(pos1val);
            }
        }
    }
};

newGameBtn.addEventListener("click", resetgame);
resetBtn.addEventListener("click", resetgame);
