let btnRef = document.querySelectorAll(".button-option");
let popupRef = document.querySelector(".popup");
let newgameBtn = document.getElementById("new-game");
let restartBtn = document.getElementById("restart");
let msgRef = document.getElementById("message");

let winningPattern = [
    [0, 1, 2],
    [0, 3, 6],
    [2, 5, 8],
    [6, 7, 8],
    [3, 4, 5],
    [1, 4, 7],
    [0, 4, 8],
    [2, 4, 6],
];
//Player 'x' plays first
let xTurn = true;
let count = 0;

const disableButtons = () => {
    btnRef.forEach((Element) => (Element.disabled = true));
    //Enable popup
    popupRef.classList.remove("hide");
};


restartBtn.addEventListener("click", () => {
    count = 0;
    enableButtons();
});
//Enable all buttons (for new game and restart)

const enableButtons = () => {
    btnRef.forEach((Element) => {
        Element.innerText = "";
        Element.disabled = false;
    });

    //disable popup
    popupRef.classList.add("hide");
};

//This function is executed when a player wins 
const winFunction = (letter) => {
    disableButtons();
    if (letter == "x") {
        msgRef.innerHTML = "&#x1F389; <br> 'x' wins";
    } else {
        msgRef.innerHTML = "&#x1F389; <br> 'o' wins";
    }
};

//Function for draw
const drawFunction = () => {
    disableButtons();
    msgRef.innerHTML = "&#x1F60E; <br> it's a draw";
}

//New Game
newgameBtn.addEventListener("click", () => {
    count = 0;
    enableButtons();
});
//win Logic
const winChecker = () => {
    //Loop through all win patterns
    for (let i of winningPattern) {
        let [Element1, Element2, Element3] =
            [btnRef[i[0]].innerText,
            btnRef[i[1]].innerText,
            btnRef[i[2]].innerText,
            ];
        //check if elements are filled
        //if 3 empty elements are same and would give win as a would
        if (Element1 != "" && Element2 != "" && Element3) {

            if (Element1 == Element2 && Element2 == Element3) {
                // if all 3 buttons have same values then value to winfunction
                winFunction(Element1);
            }
        }

    }

}
//Display x/o on click
btnRef.forEach((Element) => {
    Element.addEventListener("click", () => {
        if (xTurn) {
            xTurn = false;
            //display x
            Element.innerText = "x";
            Element.disabled = true;
        }
        else {
            xTurn = true;
            //display Y
            Element.innerText = "o";
            Element.disabled = true;
        }
        //Increament count on each click
        count += 1;
        if (count === 9) {
            drawFunction();
            //its a draw since there are a total of 9
        }

        //check for win on every click
        winChecker();
    });
});

//enable Buttons and disable popup on page load
window.onload = enableButtons;

