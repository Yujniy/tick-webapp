document.addEventListener('DOMContentLoaded', () => {
    // Инициализация Telegram Web App
    const tg = window.Telegram.WebApp;
    tg.expand(); // Раскрываем на весь экран

    // Получаем параметры из URL
    const urlParams = new URLSearchParams(window.location.search);
    const userId = urlParams.get('user_id');
    const username = urlParams.get('username');
    const firstName = urlParams.get('first_name');
    
    // Используем переданное имя или данные из WebApp, или заглушку
    const playerName = firstName || tg.initDataUnsafe?.user?.first_name || "Гость";
    
    const board = document.getElementById('board');
    
    // Добавляем отображение имени над игровым полем
    const nameDisplay = document.createElement('div');
    nameDisplay.className = 'player-name';
    nameDisplay.textContent = `Игрок: ${playerName}`;
    board.parentNode.insertBefore(nameDisplay, board);

    const cells = Array.from(document.querySelectorAll('.cell'));
    let currentPlayer = 'X';
    let gameState = Array(9).fill(null);

    const winningCombinations = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    function checkWinner() {
        for (const combination of winningCombinations) {
            const [a, b, c] = combination;
            if (gameState[a] && gameState[a] === gameState[b] && gameState[a] === gameState[c]) {
                return gameState[a];
            }
        }
        return gameState.includes(null) ? null : 'Draw';
    }

    function handleClick(event) {
        const index = event.target.dataset.index;
        if (!gameState[index]) {
            gameState[index] = currentPlayer;
            event.target.textContent = currentPlayer;
            const winner = checkWinner();
            if (winner) {
                setTimeout(() => alert(winner === 'Draw' ? 'Ничья!' : `Победитель: ${winner}`), 100);
                gameState.fill(null);
                cells.forEach(cell => cell.textContent = '');
            }
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        }
    }

    cells.forEach(cell => cell.addEventListener('click', handleClick));
});
