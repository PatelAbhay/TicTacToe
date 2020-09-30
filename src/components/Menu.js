import React from 'react';
import './Menu.css'
import { resetBoard } from './Board.js'

var mode = 1;

class Menu extends React.Component {

    handleClick(clicked) {
        var activeButton = document.getElementsByClassName("activeButton")[0];
        var inactiveButton = document.getElementsByClassName("inactiveButton")[0];

        if (clicked !== activeButton.textContent) {
            activeButton.classList.remove("activeButton");
            activeButton.classList.add("inactiveButton");

            inactiveButton.classList.remove("inactiveButton");
            inactiveButton.classList.add("activeButton");
        }
        //change game_state
        if (clicked === "VS Computer") mode = 2;
        else mode = 1;
        resetBoard(mode);
    }

    render() {
        return (
            <div className="menu-container" >
                <h1>Tic <span>Tac</span> Toe</h1>
                <table>
                    <tbody>
                        <tr>
                            <td><button className="button1 activeButton" onClick={() => this.handleClick("2 Players")}>2 Players</button></td>
                            <td><button className="button2 inactiveButton" onClick={() => this.handleClick("VS Computer")}>VS Computer</button></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        );
    }
}

export default Menu;

