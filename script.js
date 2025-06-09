const board = document.getElementById('board');
    const statusDiv = document.getElementById('status');
    const restartBtn = document.getElementById('restartBtn');
    const X = '✕';
    const O = '◯';

    let cells = [];
    let game, isGameOver, current;

    function init() {
      board.innerHTML = '';
      cells = [];
      for(let i = 0; i < 9; i++) {
        const cell = document.createElement('button');
        cell.className = 'cell';
        cell.setAttribute('data-index', i);
        cell.addEventListener('click', onCellClick);
        cells.push(cell);
        board.appendChild(cell);
      }
      game = Array(9).fill('');
      isGameOver = false;
      current = X;
      updateStatus();
    }

    function onCellClick(e) {
      if (isGameOver) return;
      const idx = +e.currentTarget.getAttribute('data-index');
      if (game[idx]) return;
      game[idx] = current;
      e.currentTarget.textContent = current;      
      checkGame();
      if (!isGameOver) {
        current = current === X ? O : X;
        updateStatus();
      }
    }

    function updateStatus(msg) {
      if (msg !== undefined) {
        statusDiv.textContent = msg;
      } else if (!isGameOver) {
        statusDiv.innerHTML = `<strong>${current}</strong>, à vous de jouer`;
      }
    }

    function checkGame() {
      const wins = [
        [0,1,2],[3,4,5],[6,7,8],
        [0,3,6],[1,4,7],[2,5,8],
        [0,4,8],[2,4,6]
      ];
      for (let comb of wins) {
        const [a,b,c] = comb;
        if (game[a] && game[a] === game[b] && game[a] === game[c]) {
          showWin([a,b,c]);
          updateStatus(`Victoire de ${game[a]} !`);
          isGameOver = true;
          return;
        }
      }
      if (game.every(cell => cell)) {
        updateStatus("Égalité !");
        isGameOver = true;
      }
    }

    function showWin(indices) {
      indices.forEach(i => {
        cells[i].classList.add('win');
      });
    }

    restartBtn.addEventListener('click', () => {
      init();
    });

    window.addEventListener('resize', ()=>{
      // Allow board to stay centered/fit nicely on mobile.
      // No action needed since CSS handles it, but could adjust font size dynamically if needed.
    });

    init();