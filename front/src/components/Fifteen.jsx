import { useEffect, useState } from "react";
import { React } from "react";
import Container from "@mui/material/Container";
import { Api } from "../api/api";

function Fifteen(props) {
    let { login } = props;
    let localField = JSON.parse(localStorage.getItem("fifteenField"));
    let localClicks = localStorage.getItem("fifteenClicks");
    const initialField = [
        [1, 2, 3, 4],
        [5, 6, 7, 8],
        [9, 10, 11, 12],
        [13, 14, 15, 0],
    ];

    let [clicks, setClicks] = useState(localClicks ? localClicks : 0);
    let [field, setField] = useState(localField ? localField : initialField);

    function getRandomBool() {
        if (Math.floor(Math.random() * 2) === 0) {
            return true;
        }
    }

    function Game(context, cellSize) {
        this.color = "#FFB93B";
        this.context = context;
        this.cellSize = cellSize;
        this.clicks = clicks;
    }

    Game.prototype.cellView = function (x, y) {
        this.context.fillStyle = "rgba(41, 146, 186, 0.8)";
        this.context.fillRect(x + 1, y + 1, this.cellSize - 2, this.cellSize - 2);
    };

    Game.prototype.numView = function () {
        this.context.font = "bold " + this.cellSize / 2 + "px Sans";
        this.context.textAlign = "center";
        this.context.textBaseline = "middle";
        this.context.fillStyle = "black";
    };

    Game.prototype.draw = function () {
        for (let i = 0; i < 4; i++) {
            for (let j = 0; j < 4; j++) {
                if (field[i][j] > 0) {
                    this.cellView(j * this.cellSize, i * this.cellSize);
                    this.numView();
                    this.context.fillText(
                        field[i][j],
                        j * this.cellSize + this.cellSize / 2,
                        i * this.cellSize + this.cellSize / 2
                    );
                }
            }
        }
    };

    Game.prototype.getNullCell = function () {
        for (let i = 0; i < 4; i++) {
            for (let j = 0; j < 4; j++) {
                if (field[j][i] === 0) {
                    return { x: i, y: j };
                }
            }
        }
    };

    Game.prototype.move = function (x, y) {
        let nullCell = this.getNullCell();
        let canMoveVertical = (x - 1 === nullCell.x || x + 1 === nullCell.x) && y === nullCell.y;
        let canMoveHorizontal = (y - 1 === nullCell.y || y + 1 === nullCell.y) && x === nullCell.x;

        if (canMoveVertical || canMoveHorizontal) {
            setField((field[nullCell.y][nullCell.x] = field[y][x]));
            setField((field[y][x] = 0));
            localStorage.setItem("fifteenField", JSON.stringify(field));

            this.clicks++;
            setClicks(this.clicks);
            localStorage.setItem("fifteenClicks", this.clicks);
        }
    };

    Game.prototype.victory = function () {
        let combination = initialField;
        let res = true;
        for (let i = 0; i < 4; i++) {
            for (let j = 0; j < 4; j++) {
                if (combination[i][j] !== field[i][j]) {
                    res = false;
                    break;
                }
            }
        }
        return res;
    };

    Game.prototype.mix = function (count) {
        let x, y;
        for (let i = 0; i < count; i++) {
            let nullCell = this.getNullCell();

            let verticalMove = getRandomBool();
            let upLeft = getRandomBool();

            if (verticalMove) {
                x = nullCell.x;
                if (upLeft) {
                    y = nullCell.y - 1;
                } else {
                    y = nullCell.y + 1;
                }
            } else {
                y = nullCell.y;
                if (upLeft) {
                    x = nullCell.x - 1;
                } else {
                    x = nullCell.x + 1;
                }
            }

            if (0 <= x && x <= 3 && 0 <= y && y <= 3) {
                this.move(x, y);
            }
        }
        this.clicks = 0;
        setClicks(this.clicks);
        localStorage.setItem("fifteenClicks", "0");
    };

    useEffect(() => {
        function letItGo() {
            let canvas = document.getElementById("canvas");
            canvas.width = 500;
            canvas.height = 500;

            let context = canvas.getContext("2d");
            context.fillRect(0, 0, canvas.width, canvas.height);

            let cellSize = canvas.width / 4;

            let game = new Game(context, cellSize);
            if (!localField) {
                game.mix(300);
            }
            game.draw();

            canvas.onclick = function (e) {
                let x = ((e.pageX - canvas.offsetLeft) / cellSize) | 0;
                let y = ((e.pageY - canvas.offsetTop) / cellSize) | 0;
                onEvent(x, y);
            };

            canvas.ontouchend = function (e) {
                let x = ((e.touches[0].pageX - canvas.offsetLeft) / cellSize) | 0;
                let y = ((e.touches[0].pageY - canvas.offsetTop) / cellSize) | 0;

                onEvent(x, y);
            };

            function onEvent(x, y) {
                game.move(x, y);
                context.fillRect(0, 0, canvas.width, canvas.height);
                game.draw();
                if (game.victory()) {
                    alert("Собрано за " + game.clicks + " касание!");
                    Api.finishFifteen(login, +game.clicks);
                    game.mix(300);
                    context.fillRect(0, 0, canvas.width, canvas.height);
                    game.draw(context, cellSize);
                }
            }
        }
        letItGo();
    }, []);

    return (
        <Container>
            <h1>Fifteen</h1>
            <canvas id="canvas"></canvas>
            <h3>Clicks: {clicks}</h3>
        </Container>
    );
}

export default Fifteen;
