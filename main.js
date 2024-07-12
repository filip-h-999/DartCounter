let score1 = 501;
let score2 = 501;
let currentPlayer = 1;
let throwCount = 0;

function subtractPoints(points) {
    if (currentPlayer === 1) {
        if (score1 - points >= 0) {
            score1 -= points;
            document.getElementById('score1').textContent = score1;
            checkWinner(score1, 1);
        }
    } else {
        if (score2 - points >= 0) {
            score2 -= points;
            document.getElementById('score2').textContent = score2;
            checkWinner(score2, 2);
        }
    }
    throwCount++;
    
    if (throwCount === 3) {
        switchPlayer();
    }
}

function switchPlayer() {
    currentPlayer = currentPlayer === 1 ? 2 : 1;
    throwCount = 0;  // Reset throw count for the new player
}

function checkWinner(score, player) {
    if (score === 0) {
        alert(`Player ${player} wins!`);
        resetGame();
    }
}

function resetGame() {
    score1 = 501;
    score2 = 501;
    currentPlayer = 1;
    throwCount = 0;
    document.getElementById('score1').textContent = score1;
    document.getElementById('score2').textContent = score2;
}
