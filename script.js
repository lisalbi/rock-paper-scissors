let userScore = 0;
let computerScore = 0;
let gameActive = true;

const userScoreText = document.querySelector('#userScore');
const computerScoreText = document.querySelector('#computerScore');
const result = document.querySelector('#result');
const finalResult = document.querySelector('#finalResult');
const playAgainBtn = document.querySelector('#playAgainBtn');
const imgContainers = document.querySelectorAll(".imgContainer");
const playerMoves = document.querySelectorAll(".playerMoves");
const rpcBtns = document.querySelectorAll(".rpcBtn");

playAgainBtn.addEventListener('click', reset);
rpcBtns.forEach(btn => btn.addEventListener('click', function() {
    playRound(this.value, computerPlay());
}));

//Computer randomly chooses and returns a move.
function computerPlay() {
	const randNumber = Math.floor(Math.random() * 3);
  if (randNumber == 0) {
  	return 'rock';
  }
  if (randNumber == 1) {
  	return 'paper';
  }
  if (randNumber == 2) {
  	return 'scissors';
  }
}

//Plays a round according to the user and computer selection, then updates score.
function playRound(userSelection, computerSelection) {
    updateImages(userSelection, computerSelection)
    if (gameActive) {
        if (userSelection === computerSelection) {
            result.textContent = "It's a tie!";
        }
        else if (userSelection === 'rock') {
            if (computerSelection === 'scissors') {
                updateScore(1);
                result.textContent = "You win! Rock beats scissors";
            }
            else {
                updateScore(-1);
                result.textContent = "You lose! Paper beats rock";
            }
        }
        else if (userSelection === 'paper') {
            if (computerSelection === 'rock') {
                updateScore(1);
                result.textContent = "You win! Paper beats rock";
            }
            else {
                updateScore(-1);
                result.textContent = "You lose! Scissors beats paper";
            }
        }
        else if (userSelection === 'scissors') {
            if (computerSelection === 'paper') {
                updateScore(1);
                result.textContent = "You win! Scissors beats paper";
            }
            else {
                updateScore(-1);
                result.textContent = "You lose! Rock beats scissors";
            }
        }
    }
}

//Updates score. If the user or computer reaches 5 wins, the game is ended.
function updateScore(winner) {
    if (winner === 1) {
        userScore++;
        userScoreText.textContent = userScore;
        if (userScore === 5) {
            endGame(1);
        }
    }
    else {
        computerScore++;
        computerScoreText.textContent = computerScore;
        if (computerScore === 5) {
            endGame(-1);
        }
    }
}

//Ends game by displaying results and disabling rock, paper, scissor buttons.
//Player container borders are color coded to indicate who won.
//Then displays the 'play again' button.
function endGame(winner) {
    rpcBtns.forEach(btn => btn.disabled = true);
    gameActive = false;
    if (winner === 1) {
        finalResult.textContent = "Congrats! You won the game.";
        playerMoves[0].style.border = '4px solid rgb(25, 156, 25)';
        playerMoves[1].style.border = '4px solid rgb(245, 85, 85)';
    }
    else {
        finalResult.textContent = "Game Over! You lost the game.";
        playerMoves[0].style.border = '4px solid rgb(245, 85, 85)';
        playerMoves[1].style.border = '4px solid rgb(25, 156, 25)';
    }
    playAgainBtn.style.visibility = "visible";
}

//Resets game by reseting scores, clearing results, enabling rock-paper-scissor buttons.
function reset() {
    rpcBtns.forEach(btn => btn.disabled = false);
    updateImages('default', 'default');
    playAgainBtn.style.visibility = "hidden";
    userScore = 0;
    computerScore = 0;
    userScoreText.textContent = userScore;
    computerScoreText.textContent = computerScore;
    finalResult.textContent = '';
    result.innerText = '\n';
    gameActive = true;
    playerMoves.forEach(container => container.style.border = null);
}

//Updates images inside player move container each time a round is played, 
//indicating each player's move.
function updateImages(userSelection, computerSelection) {
    imgContainers[0].style.backgroundImage = `url("imgs/${userSelection}.png")`;
    imgContainers[1].style.backgroundImage = `url("imgs/${computerSelection}.png")`;
}
