//assign variables
let boxes = Array.from(document.getElementsByClassName("box"));
let display = document.querySelector(".game--status");
const restartBtn = document.querySelector("#reset");
const player1 = document.querySelector(".player--x")
const player2 = document.querySelector(".player--o")
const playerX = 'X'
const playerO = 'O'

//Toggle between active player
player1.classList.add("activePlayer")
player2.classList.remove("activePlayer")

//generate a computed css style for the winner
const winnerIndicator = getComputedStyle(document.body).getPropertyValue("--winning-boxes")

//displays the game status
const winnerMessage = () => `player ${currentPlayer} has won!`;
const drawMessage = () => `Game ended in TIE!`;

//let spaces = ['', '', '', '', '', '', '', '', '',]; //this also makes spaces null
let currentPlayer = 'X';
let spaces = Array(9).fill(null)


const gameStart = () => {
    //Loop through the elements  and add a click event listener to each element
    boxes.forEach(i => i.addEventListener('click', boxClicked));
    boxes.forEach(i => i.addEventListener('touchstart', boxClicked));
    // for (let i = 0; i < boxes.length; i++) {
    //     boxes[i].addEventListener('click', boxClicked); //Both approaches are equivalent and will achieve the same result. 
    // }
};


function boxClicked(e){
    //console.log(e) // the (e) argument represents the event object that is passed to the function and contains the properties or information about the event which has occurred 
    const userMoves = e.target.id // to access the id attribute of the element that was clicked
    //console.log(e.target.id)
    const box = e.target;
    //console.log(e.target) // the e.target property is used to access the element that triggered the event

    // remove the event listener from the box to prevent clicking in an already clicked box
    box.removeEventListener('click', boxClicked);
    box.removeEventListener('touchstart', boxClicked);

    if(!spaces[userMoves]){ //the logical NOT (!) operator checks if the space at the index specified by userMoves is empty
        spaces[userMoves] = currentPlayer; // show the current player's move
        box.innerText = currentPlayer; // you can also use e.target.innerText = currentPlayer 

        if(playerWins() !== false){  // !== operator checks if the result of the playerWins() function is not equal to false
        
            boxes.forEach(i => i.removeEventListener('click', boxClicked)) // stop clicking in any box
            boxes.forEach(i => i.removeEventListener('touchstart', boxClicked)) // stop clicking in any box
            display.innerText = winnerMessage();
            let winning_blocks = playerWins();
            //to iterate over the elements in winning_blocks and sets the backgroundColor property of the elements in boxes at the corresponding indexes to the value of winnerIndicator
            winning_blocks.map( box => boxes[box].style.backgroundColor = winnerIndicator) 
            return
            
        }
        // Check if all squares are filled, but no player has won
        if(spaces.every(i => i !== null && playerWins() === false)){ // if all spaces in the array are not empty and no player wins
            // Display a message saying the game has ended in a tie
            display.innerText = drawMessage();
        }   
    };
    
    currentPlayer = currentPlayer == 'X' ? 'O' : 'X';
    player1.classList.toggle("activePlayer")
    player2.classList.toggle("activePlayer")
    
};

//Array of arrays that contains the indexes of the spaces on the game board that form a winning combination
const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [0, 4, 8]
]

function playerWins(){
    //assign the values at the 1st, 2nd, and 3rd indexes of the condition array to the variables a, b, and c, respectively
    for (const condition of winningConditions) {
        let [a, b, c] = condition
        // the code checks if the space at index [a] is not null && if The spaces at indexes [a, b, and c] all contain the same value
        if(spaces[a] && (spaces[a] == spaces[b] && spaces[a] == spaces[c])) {
            return [a,b,c]
        }
    }
    return false 
}

//alternatively you can use switch statement 

// function playerWins(){
//     switch (true) {
//         case spaces[0] && (spaces[0] == spaces[1] && spaces[0] == spaces[2]):
//             return [0, 1, 2]
//         case spaces[3] && (spaces[3] == spaces[4] && spaces[3] == spaces[5]):
//             return [3, 4, 5]
//         // more cases for each winning condition
//         default:
//             return false
//     }
// }

//OR you could use some() method
// function playerWins() {
//     return winningConditions.some(([a, b, c]) => {
//         return spaces[a] && (spaces[a] == spaces[b] && spaces[a] == spaces[c])
//     })
//     return false
// }



restartBtn.addEventListener('click', function restartGame(){
    spaces.fill(null)
    boxes.forEach(box =>{
        box.innerText = '';
        box.style.backgroundColor='';
    })

    display.innerHTML = '';
    gameStart(); 
});

restartBtn.addEventListener('touchstart', function restartGame(){
    spaces.fill(null)
    boxes.forEach(box =>{
        box.innerText = '';
        box.style.backgroundColor='';
    })

    display.innerHTML = '';
    gameStart(); 
});

gameStart();