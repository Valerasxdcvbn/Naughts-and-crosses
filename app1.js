const btn1 = document.getElementById('0')
const btn2 = document.getElementById('1')
const btn3 = document.getElementById('2')
const btn4 = document.getElementById('3')
const btn5 = document.getElementById('4')
const btn6 = document.getElementById('5')
const btn7 = document.getElementById('6')
const btn8 = document.getElementById('7')
const btn9 = document.getElementById('8')
const state = document.getElementById('state')
const btn0 = document.getElementById('btn0')
const zero = 'o'
const cross = 'x'
const main = document.getElementById('main')
const btnEnd =  document.createElement('button')
btnEnd.textContent = 'Начать новую игру';
btnEnd.className= 'btnEnd';
const messageEnd = document.getElementById('output')
let gameState = false
btn1.onclick = () => {renderSquare(btn1)}
btn2.onclick = () => {renderSquare(btn2)}
btn3.onclick = () => {renderSquare(btn3)}
btn4.onclick = () => {renderSquare(btn4)}
btn5.onclick = () => {renderSquare(btn5)}
btn6.onclick = () => {renderSquare(btn6)}
btn7.onclick = () => {renderSquare(btn7)}
btn8.onclick = () => {renderSquare(btn8)}
btn9.onclick = () => {renderSquare(btn9)}
let pos = 0;
const boardSize = 9;
let board = Array(boardSize).fill(2); // 2 означает пустую клетку
let renderState = true

function renderSquare(btn) {
    if (renderState) {
        const index = parseInt(btn.id);
        if (board[index] !== 2) return; // Клетка уже занята, ничего не делаем

        board[index] = pos;
        if (pos === 0) {
            btn.innerHTML = 'X';
            state.innerHTML = 'Ходят: Нолики';
            pos = 1;
        } else {
            btn.innerHTML = 'O';
            state.innerHTML = 'Ходят: Крестики';
            pos = 0;
        }
    }
        if (!intervalId) {
            startCheckingBoard();
        }
}

function checkWinner() {
    // Преобразуем строку в двумерный массив для удобства работы
    let grid = [
        [board[0], board[1], board[2]],
        [board[3], board[4], board[5]],
        [board[6], board[7], board[8]]
    ];

    // Проверяем строки
    for (let i = 0; i < 3; i++) {
        if (grid[i].every(cell => cell === 0)) {
            return "Победа Крестиков";
        }
        if (grid[i].every(cell => cell === 1)) {
            return "Победа Ноликов";
        }
    }

    // Проверяем столбцы
    for (let j = 0; j < 3; j++) {
        if (grid[0][j] === 0 && grid[1][j] === 0 && grid[2][j] === 0) {
            return "Победа Крестиков";
        }
        if (grid[0][j] === 1 && grid[1][j] === 1 && grid[2][j] === 1) {
            return "Победа Ноликов";
        }
    }

    // Проверяем главные диагонали
    if ((grid[0][0] === 0 && grid[1][1] === 0 && grid[2][2] === 0)
     || (grid[0][2] === 0 && grid[1][1] === 0 && grid[2][0] === 0)) {
        return "Победа Крестиков";
    }
    if ((grid[0][0] === 1 && grid[1][1] === 1 && grid[2][2] === 1)
     || (grid[0][2] === 1 && grid[1][1] === 1 && grid[2][0] === 1)) {
        return "Победа Ноликов";
    }

    // Проверяем наличие пустых клеток
    for (let k = 0; k < boardSize; k++) {
        if (board[k] === 2) {
            return undefined; // Игра ещё не завершена
        }
    }

    // Если победитель не найден и больше нет свободных клеток, то ничья
    return "Ничья";
    
}

let intervalId = null;

function startCheckingBoard() {
    intervalId = setInterval(() => {
        const result = checkWinner();
        if (result) {
            messageEnd.textContent = result;
            renderState = false
            main.appendChild(btnEnd);
            stopCheckingBoard();
        }
    }, 100);
}

function stopCheckingBoard() {
    if (intervalId) {
        clearInterval(intervalId);
        intervalId = null;
    }
}

btnEnd.onclick = function () {
    btn1.innerHTML = '';
    btn2.innerHTML = '';
    btn3.innerHTML = '';
    btn4.innerHTML = '';
    btn5.innerHTML = '';
    btn6.innerHTML = '';
    btn7.innerHTML = '';
    btn8.innerHTML = '';
    btn9.innerHTML = '';
    
    // Очистка массива board
    board = Array(boardSize).fill(2);

    messageEnd.textContent = '';
    stopCheckingBoard(); 
    renderState = true
};

