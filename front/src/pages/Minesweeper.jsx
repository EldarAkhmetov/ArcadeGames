import React, {useState, useEffect} from 'react';
import Container from "@mui/material/Container";
import Battlefield from "../components/Battlefield";
import Button from "@mui/material/Button";
import styled from "@emotion/styled";
import Label from "@mui/material/InputLabel";
import { Api } from "../api/api";

const width50 = {
    width: 50
}
const flex = {
    display: 'flex',
    justifyContent: 'space-between'
}

const traverseBoard = (x, y, data, size) => {
    const el = [];
    //up
    if (x > 0) {
      el.push({ value: data[x - 1][y], x: x - 1, y});
    } 
    //down
    if (x < size - 1) {
      el.push({ value: data[x + 1][y], x: x + 1, y});
    }
    //left
    if (y > 0) {
      el.push({ value: data[x][y - 1], x, y: y - 1 });
    }
    //right
    if (y < size - 1) {
      el.push({ value: data[x][y + 1], x, y: y + 1 });
    }
    // top left
    if (x > 0 && y > 0) {
      el.push({ value: data[x - 1][y - 1], x: x - 1, y: y - 1 });
    }
    // top right
    if (x > 0 && y < size - 1) {
      el.push({ value: data[x - 1][y + 1], x: x - 1, y: y + 1 });
    }
    // bottom right
    if (x < size - 1 && y < size - 1) {
      el.push({ value: data[x + 1][y + 1], x: x + 1, y: y + 1 });
    }
    // bottom left
    if (x < size - 1 && y > 0) {
      el.push({ value: data[x + 1][y - 1], x: x + 1, y: y - 1 });
    }
    return el;
  }

const Minesweeper = (props) => {
    let { login } = props;
    const numberOfMines = {
        "10": 4,
        "15": 12,
        "20": 24
    }

    let localField = JSON.parse(localStorage.getItem("minesweeperField"));
    let localSize = localStorage.getItem("minesweeperSize");
    console.log(localField, Number(localSize));

    const HIDDEN = 50;
    const FLAG_CORRECT = 30;
    const FLAG_INCORRECT = 31;
    const BOMB_BLOW = 32;
    const OPENED_CELL = 20;
    const SHOW_NUMBERS = 40;
    const EMPTY_CELL = 0;

    const getHidden = (field, size) => {
        let hidden = 0;
        for (let i = 0; i < size; i++) {
            for (let j = 0; j < size; j++) {
                if (field[i][j] === HIDDEN
                    || field[i][j] === FLAG_CORRECT) {
                        // console.log(field[i][j])
                        hidden++;
                    };
            }
        }
        return hidden;
    }

    const getNoMine = (field, size) => {
        let noMineField = 0;
        for (let i = 0; i < size; i++) {
            for (let j = 0; j < size; j++) {
                // console.log('field', field[i][j]);
                if (field[i][j] === EMPTY_CELL 
                    || field[i][j] > HIDDEN) {
                        
                        noMineField++;
                    };
            }
        }
        // console.log('emptyandincorrect', noMineField);
        console.log(field);
        return noMineField;
        
    }

    const isGameStarted = (field, size) => {
        let isStarted = false;
        for (let i = 0; i < size; i++) {
            for (let j = 0; j < size; j++) {
                if ((field[i][j] > SHOW_NUMBERS && field[i][j] < HIDDEN)
                    || field[i][j] === OPENED_CELL
                    || field[i][j] === BOMB_BLOW) {
                        return true;
                    };
            }
        }
        return isStarted;
    }

    const paint = (field, size, color) => {
        const newField = field.slice()
        for (let i = 0; i < size; i++) {
            for (let j = 0; j < size; j++) {
                newField[i][j] = color;
            }
        }
        return newField;
        
    }

    const revealEmpty = (x, y, data) => {
        let area = traverseBoard(x, y, data, fieldSize);
        area.map(value => {
            if (value.value !== FLAG_CORRECT
                && value.value !== FLAG_INCORRECT
                && value.value !== OPENED_CELL
                && (value.value === EMPTY_CELL 
                    || value.value !== HIDDEN)) {
                    if (value.value > HIDDEN) {
                        data[value.x][value.y] = data[value.x][value.y] % 10 + SHOW_NUMBERS;  
                    } else if (value.value === EMPTY_CELL) {
                        data[value.x][value.y] = OPENED_CELL;
                        revealEmpty(value.x, value.y, data, fieldSize);
                }
            }  
        })
        return data;
    }

    const handleMyFieldHint = (coord, event) => {
        event.preventDefault();
        if (field[coord[0]][coord[1]] === BOMB_BLOW) {
            handleFinish();
        }
        if (isPlayerLose || isPlayerWin) return;
        let newField = field.slice();
        if (event.type === 'click') {
            if (newField[coord[0]][coord[1]] === HIDDEN) {
                newField[coord[0]][coord[1]] = BOMB_BLOW;
                setIsPlayerLose(true);
                setField(paint(field, fieldSize, BOMB_BLOW));
                Api.finishMinesweeper(login, fieldSize, isPlayerWin);
                alert('You Lose!!!!!!!!!!!!!!!!11');
                return;
            } else if (newField[coord[0]][coord[1]] === EMPTY_CELL) {
                let updatedData = newField.slice();
                newField = revealEmpty(coord[0], coord[1], updatedData);

            } else if (newField[coord[0]][coord[1]] > HIDDEN) {
                newField[coord[0]][coord[1]] -= 10;
            }
            
            // console.log(newField)
        } else if (event.type === 'contextmenu') {
            if (newField[coord[0]][coord[1]] === EMPTY_CELL
                || newField[coord[0]][coord[1]] >= HIDDEN) {
                newField[coord[0]][coord[1]] = newField[coord[0]][coord[1]] === HIDDEN ? FLAG_CORRECT : FLAG_INCORRECT;
            } else if (newField[coord[0]][coord[1]] === FLAG_CORRECT) {
                newField[coord[0]][coord[1]] = HIDDEN;
            } else if (newField[coord[0]][coord[1]] === FLAG_INCORRECT) {
                newField[coord[0]][coord[1]] = EMPTY_CELL;
            }
        }
        setField(newField);
        const numberOfHidden = getHidden(field, fieldSize);
        const numberOfEmpty = getNoMine(field, fieldSize);
        const mines = numberOfMines[fieldSize];
        localStorage.setItem("minesweeperField", JSON.stringify(newField));
        console.log('numberOfEmpty', numberOfEmpty);
        
        // console.log(numberOfHidden);
        if (!numberOfEmpty) {
            setIsPlayerWin(true);
            Api.finishMinesweeper(login, fieldSize, true);
            alert('You have won!!!11');
            localStorage.setItem("minesweeperField", null);
            setField(paint(field, fieldSize, OPENED_CELL));
        }


    }

    const handleFinish = () => {
        if (isGameStarted(field, fieldSize) && (!isPlayerWin && !isPlayerLose)) {
            Api.finishMinesweeper(login, fieldSize, isPlayerWin);
        }
        localStorage.setItem("minesweeperField", null);
        setField(createNewBoard(fieldSize));
        setIsPlayerLose(false);
        setIsPlayerWin(false);
    }

    const getBlankField = (size) => {
        return new Array(size).fill().map(() => new Array(size).fill(0));
    }

    const createNewBoard = (size) => {
        const bombsNumber = numberOfMines[size];
        const board = getBlankField(size);
        const bombs = [];
        while (bombs.length < bombsNumber) {
            const x = Math.floor(Math.random() * size);
            const y = Math.floor(Math.random() * size);
            const coordinates = {x, y};
            const current = bombs.find((bomb) => JSON.stringify(bomb) === JSON.stringify(coordinates));
            if (!current) {
                bombs.push(coordinates);
            }
        }
        bombs.forEach(({x, y}) => {
            board[x][y] = HIDDEN;
        });

        const getNeighbors = (data, size) => {
            let updatedData = data;

            for (let i = 0; i < size; i++) {
                for (let j = 0; j < size; j++) {
                  if (data[i][j] !== HIDDEN) {
                    let mine = 0;
                    const area = traverseBoard(i, j, data, size);
                    area.map(value => {
                      if (value.value === HIDDEN) {
                        mine++;
                      }
                    });
                    if (mine === 0) {
                      updatedData[i][j] = EMPTY_CELL;
                    } else {
                        updatedData[i][j] = mine + HIDDEN;
                    }
                  }
                }
              }
              return (updatedData);
        }

        const boardWithNeighbors = getNeighbors(board, size);
        return boardWithNeighbors;
    }

    const handleChangeSize = (e) => {
        // console.log(e.target.value);
        console.log(e.target.value);
        localStorage.setItem("minesweeperSize", Number(e.target.value));
        handleFinish();
        setFieldSize(Number(e.target.value));
        
        setField(createNewBoard(Number(e.target.value)));
        setIsPlayerLose(false);
        setIsPlayerWin(false);
    }
    
    let [isPlayerWin, setIsPlayerWin] = useState(false);
    let [isPlayerLose, setIsPlayerLose] = useState(false);

    const [fieldSize, setFieldSize] = useState(Number(localSize) || 10);
    const [field, setField] = useState(localField || createNewBoard(fieldSize));
    

    // console.log(field)
    const DropdownLabel = styled.label`
      font-size: 20px;
      width: 115px;
      display: block;
    `;


    return (
        <Container>
            <div>
                {/*<Button onClick={handleStart}>Start game</Button>*/}
                <Button onClick={handleFinish}>Finish game</Button>
            </div>
            <div style={flex}>
                <Battlefield field={field} handleHit={handleMyFieldHint} fieldSize={fieldSize}/>
                <div style={width50}></div>
                <div>
                    <DropdownLabel htmlFor="size">Board size:</DropdownLabel>
                    <select id="size" name="Choose board size" onChange={handleChangeSize} defaultValue={fieldSize}>
                        <option value="10">10 X 10</option>
                        <option value="15">15 X 15</option>
                        <option value="20">20 X 20</option>
                    </select>
                </div>
            </div>
            {isPlayerWin ? <div>You are WIN!!!</div> : null}
            {isPlayerLose ? <div>You are Lose!!!</div> : null}
        </Container>
    )

}

export default Minesweeper;