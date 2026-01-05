const res = localStorage.getItem('result');
const winner = localStorage.getItem('winner');
const msgEl = document.getElementById('result-msg');

if (res === 'win') {
  msgEl.textContent = `🎉 Congratulations ${winner}!`;
} else {
  msgEl.textContent = `🤝 It's a Draw!`;
}

document.getElementById('play-again')
  .addEventListener('click', () => {
    window.location.href = 'index.html';
  });
