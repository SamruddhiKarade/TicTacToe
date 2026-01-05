document.getElementById('start-btn').addEventListener('click', () => {
  const p1 = document.getElementById('player1').value.trim() || 'Player 1';
  const p2 = document.getElementById('player2').value.trim() || 'Player 2';
  localStorage.setItem('p1', p1);
  localStorage.setItem('p2', p2);
  localStorage.removeItem('result');
  window.location.href = 'game.html';
});
