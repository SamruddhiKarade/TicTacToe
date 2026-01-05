// DOM refs
const boxes = document.querySelectorAll('.box');
const resetBtn = document.getElementById('reset-btn');
const turnIndicator = document.getElementById('turn-indicator');

// Player names & state
const p1 = localStorage.getItem('p1') || 'Player 1';
const p2 = localStorage.getItem('p2') || 'Player 2';
let turnP1 = true;
let moves = 0;

const winPatterns = [
  [0,1,2],[3,4,5],[6,7,8],
  [0,3,6],[1,4,7],[2,5,8],
  [0,4,8],[2,4,6]
];

// Update the “Turn:” text
function updateTurn() {
  turnIndicator.textContent = `Turn: ${turnP1 ? p1 : p2}`;
}

// Reset board to start
function resetBoard() {
  turnP1 = true;
  moves = 0;
  boxes.forEach(b => {
    b.disabled = false;
    b.textContent = '';
    b.classList.remove('p1','p2');
  });
  updateTurn();
}

resetBtn.addEventListener('click', resetBoard);

// End game: save result and go to result page
function endGame(result, winnerName='') {
  localStorage.setItem('result', result);
  if (winnerName) localStorage.setItem('winner', winnerName);
  window.location.href = 'result.html';
}

// Check winning patterns
function checkWinner() {
  for (let pat of winPatterns) {
    const [a,b,c] = pat;
    const v1 = boxes[a].textContent,
          v2 = boxes[b].textContent,
          v3 = boxes[c].textContent;
    if (v1 && v1 === v2 && v2 === v3) {
      return v1;  // 'X' or 'O'
    }
  }
  return null;
}

// Box click handler
boxes.forEach(box => {
  box.addEventListener('click', () => {
    if (turnP1) {
      box.textContent = 'X';
      box.classList.add('p1');
    } else {
      box.textContent = 'O';
      box.classList.add('p2');
    }
    box.disabled = true;
    moves++;

    const winnerMark = checkWinner();
    if (winnerMark) {
      const winnerName = winnerMark === 'X' ? p1 : p2;
      endGame('win', winnerName);
    } else if (moves === 9) {
      endGame('draw');
    } else {
      turnP1 = !turnP1;
      updateTurn();
    }
  });
});

// Initialize on load
window.addEventListener('load', resetBoard);
