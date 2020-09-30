import React from 'react';
import './Board.css'

var board = new Array(3);
for (var i = 0; i < board.length; i++) {
    board[i] = new Array(3);
    for (var j = 0; j < board[i].length; j++) {
        board[i][j] = "";
    }
}

const playerX = '&#10005';
const playerO = '&#9675';
var game_state = 0;
var game_mode = 1;
var turn = true;

class Board extends React.Component {

    checkBoard() {
        for (var i = 0; i < 3; i++) {
            if (board[i][0] === board[i][1] && board[i][1] === board[i][2] && board[i][0] !== "") {
                return board[i][0];
            }
        }

        for (i = 0; i < 3; i++) {
            if (board[0][i] === board[1][i] && board[1][i] === board[2][i] && board[0][i] !== "") {
                return board[0][i];
            }
        }

        if (board[0][0] === board[1][1] && board[1][1] === board[2][2] && board[0][0] !== "") {
            return board[0][0];
        }
        if (board[2][0] === board[1][1] && board[1][1] === board[0][2] && board[2][0] !== "") {
            return board[2][0];
        }

        for (i = 0; i < 3; i++) {
            for (var j = 0; j < 3; j++) {
                if (board[i][j] === "") return 0;
            }
        }
        return -1;
    }

    makeComputerMove() {
        var bestMove;
        var bestScore = -Infinity;
        for (var i = 0; i < 3; i++) {
            for (var j = 0; j < 3; j++) {
                if (board[i][j] === "") {
                    this.addSymbol(i, j, false, playerO, "playerO");
                    var score = this.minimaxWithPruning(0, false, -Infinity, Infinity);
                    this.addSymbol(i, j, true, playerO, "playerO");
                    if (score > bestScore) {
                        bestScore = score;
                        bestMove = [i, j]
                        console.log(bestMove)
                    }
                }
            }
        }

        this.addSymbol(bestMove[0], bestMove[1], false, playerO, "playerO");
        var result = this.checkBoard();
        if (result === playerX || result === playerO) {
            if (turn) alert("Player X Won")
            else alert("Computer Won")
            game_state = 1;
        }
        else if (result === -1) {
            alert("Draw")
            game_state = -1;
        }
    }

    minimaxWithPruning(depth, isMaximizing, alpha, beta) {
        var curBoard = this.checkBoard();
        if (curBoard === playerX) {
            return -10;
        }
        else if (curBoard === playerO) {
            return 10;
        }
        else if (curBoard === -1) {
            return 0;
        }

        var bestScore;
        if (isMaximizing) {
            bestScore = -Infinity;
            for (let i = 0; i < 3; i++) {
                for (let j = 0; j < 3; j++) {
                    if (board[i][j] === "") {
                        this.addSymbol(i, j, false, playerO, "playerO");
                        var score = this.minimaxWithPruning(depth + 1, false, alpha, beta);
                        this.addSymbol(i, j, true, playerO, "playerO");
                        if (score > bestScore) bestScore = score;
                        if (score > alpha) alpha = score;
                        if (alpha >= beta) break;
                    }
                }
            }
        }
        else {
            bestScore = Infinity;
            for (let i = 0; i < 3; i++) {
                for (let j = 0; j < 3; j++) {
                    if (board[i][j] === "") {
                        this.addSymbol(i, j, false, playerX, "playerX");
                        score = this.minimaxWithPruning(depth + 1, true, alpha, beta);
                        this.addSymbol(i, j, true, playerX, "playerX");
                        if (bestScore > score) {
                            bestScore = score;
                        }
                        if (beta > score) beta = score;
                        if (alpha >= beta) break;
                    }
                }
            }
        }
        return bestScore;
    }

    checkGameState() {
        game_state = this.checkBoard();
        if (game_state === 0) {
            turn = !turn;
            if (game_mode === 2) {
                this.makeComputerMove();
                turn = !turn;
            }
        }
        else if (game_state === -1) alert("Draw")
        else {
            if (turn) alert("Player X Won")
            else alert("Player O Won")
        }
    }

    addSymbol(row, col, undo, symbol, symbolString) {
        var cells = document.getElementsByClassName("board-cell");

        if (undo) {
            cells[(row * 3) + col].innerHTML = "";
            cells[(row * 3) + col].classList.remove("playerX");
            cells[(row * 3) + col].classList.remove("playerO");
            board[row][col] = "";
        }
        else {
            cells[(row * 3) + col].innerHTML = symbol;
            cells[(row * 3) + col].classList.add(symbolString);
            board[row][col] = symbol;
        }
    }

    updateBoard(row, col) {
        var cells = document.getElementsByClassName("board-cell");
        if (cells[(row * 3) + col].innerHTML === "" && game_state === 0) {
            var symbol, symbolString;
            if (turn) {
                symbol = playerX;
                symbolString = "playerX";
            }
            else {
                symbol = playerO;
                symbolString = "playerO";
            }
            this.addSymbol(row, col, false, symbol, symbolString);
            this.checkGameState(row, col);
        }
    }

    render() {
        return (
            <div className="board-grid">
                <div className="board-cell" onClick={() => this.updateBoard(0, 0)}></div>
                <div className="board-cell" onClick={() => this.updateBoard(0, 1)}></div>
                <div className="board-cell" onClick={() => this.updateBoard(0, 2)}></div>
                <div className="board-cell" onClick={() => this.updateBoard(1, 0)}></div>
                <div className="board-cell" onClick={() => this.updateBoard(1, 1)}></div>
                <div className="board-cell" onClick={() => this.updateBoard(1, 2)}></div>
                <div className="board-cell" onClick={() => this.updateBoard(2, 0)}></div>
                <div className="board-cell" onClick={() => this.updateBoard(2, 1)}></div>
                <div className="board-cell" onClick={() => this.updateBoard(2, 2)}></div>
            </div>
        );
    }
}

export default Board;

export const resetBoard = (mode) => {
    var cells = document.getElementsByClassName("board-cell");

    for (var i = 0; i < 3; i++) {
        for (var j = 0; j < 3; j++) {
            board[i][j] = "";
            cells[(i * 3) + j].innerHTML = "";
            cells[(i * 3) + j].classList.remove("playerX")
            cells[(i * 3) + j].classList.remove("playerO")
        }
    }
    game_state = 0;
    turn = true;
    game_mode = mode;
};
