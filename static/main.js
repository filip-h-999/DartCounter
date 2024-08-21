let score1 = 501;
let score2 = 501;
let currentPlayer = 1;
let throwsLeft = 3;
const history = [];

const clickSound = new Audio('static/sound/click.mp3');

// Function to play the sound
function playSound(sound) {
    const soundClone = sound.cloneNode();
    soundClone.play();
}

// Add this function to main.js
function updatePlayerUnderline() {
    const playerOneName = document.getElementById('playerOneName');
    const playerTwoName = document.getElementById('playerTwoName');

    if (currentPlayer === 1) {
        playerOneName.classList.add('underline');
        playerTwoName.classList.remove('underline');
    } else {
        playerOneName.classList.remove('underline');
        playerTwoName.classList.add('underline');
    }
}

// Call updatePlayerUnderline in subtractPoints and nextPlayer functions
function subtractPoints(points) {
    playSound(clickSound); // Use the playSound function

    if (currentPlayer === 1) {
        score1 = Math.max(score1 - points, 0);
        document.getElementById('score1').textContent = score1;
        // if (score1 === 0) {
        //     alert('Player 1 wins!');
        //     resetGame();
        //     return;
        // }
    } else {
        score2 = Math.max(score2 - points, 0);
        document.getElementById('score2').textContent = score2;
        // if (score2 === 0) {
        //     alert('Player 2 wins!');
        //     resetGame();
        //     return;
        // }
    }

    history.push({ points, player: currentPlayer });

    throwsLeft--;
    if (throwsLeft === 0) {
        currentPlayer = currentPlayer === 1 ? 2 : 1;
        throwsLeft = 3;
        updatePlayerUnderline(); // Update underline when player changes
    }

    animateButton(points);
}

function undoLastAction() {
    const lastAction = history.pop();
    if (!lastAction) return;

    // Update the score for the player who made the last action
    if (lastAction.player === 1) {
        score1 += lastAction.points;
        document.getElementById('score1').textContent = score1;
    } else {
        score2 += lastAction.points;
        document.getElementById('score2').textContent = score2;
    }

    // If we're undoing the first throw of a turn, switch players and set throwsLeft to 1
    if (throwsLeft === 3) {
        currentPlayer = currentPlayer === 1 ? 2 : 1;
        throwsLeft = 1; // Set to 1 because we're undoing the action that initiated the turn
    } else {
        throwsLeft++; // Increment throwsLeft to reflect the undone action
    }

    // Update the underline to reflect the current player
    updatePlayerUnderline();
}

function nextPlayer() {
    currentPlayer = currentPlayer === 1 ? 2 : 1;
    throwsLeft = 3;
    playSound(clickSound); // Use the playSound function
    updatePlayerUnderline(); // Update underline when player changes
}

// Call updatePlayerUnderline initially to set the correct underline
updatePlayerUnderline();

function animateButton(points) {
    const buttons = document.querySelectorAll('button');
    buttons.forEach(button => {
        if (button.textContent === points.toString() || button.textContent === `D${points / 2}` || button.textContent === `T${points / 3}`) {
            button.classList.add('active');
            setTimeout(() => {
                button.classList.remove('active');
            }, 100);
        }
    });
}

function resetGame() {
    score1 = 501;
    score2 = 501;
    currentPlayer = 1;
    throwsLeft = 3;
    history.length = 0;
    document.getElementById('score1').textContent = score1;
    document.getElementById('score2').textContent = score2;
}

// Add event listener for button click to animate and play sound
document.querySelectorAll('button').forEach(button => {
    button.addEventListener('click', (event) => {
        event.target.classList.add('active');
        setTimeout(() => {
            event.target.classList.remove('active');
        }, 100);
    });
});