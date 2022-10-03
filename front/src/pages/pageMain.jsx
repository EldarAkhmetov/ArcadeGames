import React, {useState, useEffect} from 'react';
import {Api} from "../api/api";
import Battlefield from "../components/Battlefield";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import BatItem from "../components/BatItem";

function PageMain(props) {
    const {login} = props;

    let [gameStarted, setGameStarted] = useState(false);
    let [isPlayerWin, setIsPlayerWin] = useState(false);
    let [isPlayerLose, setIsPlayerLose] = useState(false);
    const [myCages, setMyCages] = useState([]);

    const getBlankField = () => {
        return [
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        ]
    }
    let [myField, setMyField] = useState(getBlankField());
    let [pcField, setPcField] = useState(getBlankField());

    const handleStart = (_) => {
        if (!gameStarted) {
            Api.startGame(login, myCages).then(res => {
                let {gamerField, pcField} = res;
                setMyField(gamerField);
                setPcField(pcField);
            })
            setGameStarted(true);
            setIsPlayerWin(false)
            setIsPlayerLose(false)
        }
    }
    const handleFinish = (_) => {
        if (gameStarted) {
            Api.finishGame(login).then(res => {
                let {gamerField, pcField} = res;
                setMyField(gamerField);
                setPcField(pcField);
            })
            setGameStarted(false);
            setMyCages([]);
            setMyTempField(getBlankField());
        }
    }

    const flex = {
        display: 'flex'
    }
    const width50 = {
        width: 50
    }
    const handlePcFieldHint = (coord) => {
        if (gameStarted && !isPlayerWin) {
            Api.hit(login, coord).then(res => {
                let {gamerField, pcField, isWin, isLose} = res;
                setMyField(gamerField);
                setPcField(pcField);
                setIsPlayerWin(isWin);
                setIsPlayerLose(isLose);
                if (isWin || isLose) {
                    {
                        setGameStarted(false);
                        setMyCages([]);
                        setMyTempField(getBlankField());
                    }
                }
            })
        }
    }

    const [type, setType] = useState(null)
    const [myTempField, setMyTempField] = useState(getBlankField);
    const handleOne = () => {
        if (!isCageTypeFull('cage1'))
            setType('cage1');
    }
    const handleTwo = () => {
        if (!isCageTypeFull('cage2'))
            setType('cage2');
    }

    const handleThree = () => {
        if (!isCageTypeFull('cage3'))
            setType('cage3');
    }
    const handleFour = () => {
        if (!isCageTypeFull('cage4'))
            setType('cage4');
    }

    const getCage = (type, coords, direction, index, level) => {
        return {
            type,
            coords,
            direction,
            index,
            level,
            hitted: 0
        }
    }

    const mapCagesToField = (cages) => {
        let result = getBlankField();
        cages.forEach(cage => {
            switch (cage.type) {
                case 'cage1':
                    result[cage.coords[0]][cage.coords[1]] = cage.index;
                    break;
                case 'cage2':
                    result[cage.coords[0]][cage.coords[1]] = cage.index;
                    if (cage.direction) {
                        result[cage.coords[0] + 1][cage.coords[1]] = cage.index;
                    } else {
                        result[cage.coords[0]][cage.coords[1] + 1] = cage.index;
                    }
                    break;
                case 'cage3':
                    result[cage.coords[0]][cage.coords[1]] = cage.index;
                    if (cage.direction) {
                        result[cage.coords[0] + 1][cage.coords[1]] = cage.index;
                        result[cage.coords[0] + 2][cage.coords[1]] = cage.index;
                    } else {
                        result[cage.coords[0]][cage.coords[1] + 1] = cage.index;
                        result[cage.coords[0]][cage.coords[1] + 2] = cage.index;
                    }
                    break;
                case 'cage4':
                    result[cage.coords[0]][cage.coords[1]] = cage.index;
                    if (cage.direction) {
                        result[cage.coords[0] + 1][cage.coords[1]] = cage.index;
                        result[cage.coords[0] + 2][cage.coords[1]] = cage.index;
                        result[cage.coords[0] + 3][cage.coords[1]] = cage.index;
                    } else {
                        result[cage.coords[0]][cage.coords[1] + 1] = cage.index;
                        result[cage.coords[0]][cage.coords[1] + 2] = cage.index;
                        result[cage.coords[0]][cage.coords[1] + 3] = cage.index;
                    }
                    break;
                default:
                    break;
            }
        })
        return result;
    }

    const getCageCoords = (cage) => {
        let coords = [];
        switch (cage.type) {
            case 'cage1':
                coords.push(cage.coords)
                break;
            case 'cage2':
                coords.push(cage.coords)
                if (cage.direction) {
                    coords.push([cage.coords[0]+1, cage.coords[1]])
                } else {
                    coords.push([cage.coords[0], cage.coords[1]+1])
                }
                break;
            case 'cage3':
                coords.push(cage.coords)
                if (cage.direction) {
                    coords.push([cage.coords[0]+1, cage.coords[1]])
                    coords.push([cage.coords[0]+2, cage.coords[1]])
                } else {
                    coords.push([cage.coords[0], cage.coords[1]+1])
                    coords.push([cage.coords[0], cage.coords[1]+2])
                }
                break;
            case 'cage4':
                coords.push(cage.coords)
                if (cage.direction) {
                    coords.push([cage.coords[0]+1, cage.coords[1]])
                    coords.push([cage.coords[0]+2, cage.coords[1]])
                    coords.push([cage.coords[0]+3, cage.coords[1]])
                } else {
                    coords.push([cage.coords[0], cage.coords[1]+1])
                    coords.push([cage.coords[0], cage.coords[1]+2])
                    coords.push([cage.coords[0], cage.coords[1]+3])
                }
                break;
        }
        return coords;
    }

    const getCord = (cord1, cord2, level) =>
    {
        if (cord1[0] + level - 1 === cord2[0] && cord1[1] === cord2[1])
            return {
                cord: cord1,
                direction: 1
            };
        if (cord1[0] === cord2[0] + level - 1 && cord1[1] === cord2[1])
            return {
                cord: cord2,
                direction: 1
            };
        if (cord1[0] === cord2[0] && cord1[1] + level - 1 === cord2[1])
            return {
                cord: cord1,
                direction: 0
            };
        if (cord1[0] === cord2[0] && cord1[1] === cord2[1] + level - 1)
            return {
                cord: cord2,
                direction: 0
            };
        return null;
    }

    const isCageTypeFull = (type) => {
        let count = 0;
        myCages.forEach(cage => cage.type === type ? count++ : null);
        switch (type) {
            case 'cage1':
                if (count >= 4)
                    return true;
                break;
            case 'cage2':
                if (count >= 3)
                    return true;
                break;
            case 'cage3':
                if (count >= 2)
                    return true;
                break;
            case 'cage4':
                if (count >= 1)
                    return true;
                break;
        }
        return false;
    }

    const [startCord, setStartCord] = useState(null);

    const setIfCorrectMyTempField = (cord) => {
        if (cord[0] >= 0 && cord[0] <= 9 && cord[1] >= 0 && cord[1] <= 9)
            myTempField[cord[0]][cord[1]] = 1;
    }

    const pushCage = (cage) => {
        let cords = getCageCoords(cage);
        let available = true;
        cords.forEach(cord => {
            if (myTempField[cord[0]][cord[1]] !== 0)
                available = false;
        })
        if (available) {
            myCages.push(cage);
            cords.forEach(cord => {
                setIfCorrectMyTempField([cord[0]-1,cord[1]-1]);
                setIfCorrectMyTempField([cord[0],cord[1]-1]);
                setIfCorrectMyTempField([cord[0]+1,cord[1]-1]);
                setIfCorrectMyTempField([cord[0]-1,cord[1]]);
                setIfCorrectMyTempField([cord[0],cord[1]]);
                setIfCorrectMyTempField([cord[0]+1,cord[1]]);
                setIfCorrectMyTempField([cord[0]-1,cord[1]+1]);
                setIfCorrectMyTempField([cord[0],cord[1]+1]);
                setIfCorrectMyTempField([cord[0]+1,cord[1]+1]);
            })
            setMyCages(myCages);
            setMyTempField(myTempField);
        }
    }

    const handleMyFieldHint = (coord) => {
        if (!gameStarted) {
            // режим расстановки кораблей
            switch (type) {
                case 'cage1':
                    if (myTempField[coord[0]][coord[1]] === 0 && !isCageTypeFull(type))
                        pushCage(getCage(type, coord, 0, myCages.length + 11, 1))
                    break;
                case 'cage2':
                    if (startCord) {
                        if (myTempField[coord[0]][coord[1]] === 0 && !isCageTypeFull(type))
                        {
                            let newCord = getCord(startCord, coord, 2);
                            if (newCord)
                                pushCage(getCage(type, newCord.cord, newCord.direction, myCages.length + 11, 2));
                        }
                        setStartCord(null);
                    } else {
                        setStartCord(coord);
                    }
                    break;
                case 'cage3':
                    if (startCord) {
                        if (myTempField[coord[0]][coord[1]] === 0 && !isCageTypeFull(type))
                        {
                            let newCord = getCord(startCord, coord, 3);
                            if (newCord)
                                pushCage(getCage(type, newCord.cord, newCord.direction, myCages.length + 11, 3));
                        }
                        setStartCord(null);
                    } else {
                        setStartCord(coord);
                    }
                    break;
                case 'cage4':
                    if (startCord) {
                        if (myTempField[coord[0]][coord[1]] === 0 && !isCageTypeFull(type))
                        {
                            let newCord = getCord(startCord, coord, 4);
                            if (newCord)
                                pushCage(getCage(type, newCord.cord, newCord.direction, myCages.length + 11, 4));
                        }
                        setStartCord(null);
                    } else {
                        setStartCord(coord);
                    }
                    break;
                default:
                    break;
            }
            setMyCages(myCages);
            setMyField(mapCagesToField(myCages));
            if (isCageTypeFull('cage1') && isCageTypeFull('cage2') &&
                isCageTypeFull('cage3') && isCageTypeFull('cage4'))
            {
                handleStart({});
            }
        }
    }


    return (
        <Container>
            <div>
                {/*<Button onClick={handleStart}>Start game</Button>*/}
                <Button onClick={handleFinish}>Finish game</Button>
            </div>
            {gameStarted ? null : <>
                <div style={flex}>
                    <BatItem cageStatus={type === 'cage1' ? 7 : 11} onClick={handleOne}/>
                    <div style={width50}></div>
                    <BatItem cageStatus={type === 'cage2' ? 7 : 11} onClick={handleTwo}/>
                    <BatItem cageStatus={type === 'cage2' ? 7 : 11} onClick={handleTwo}/>
                    <div style={width50}></div>
                    <BatItem cageStatus={type === 'cage3' ? 7 : 11} onClick={handleThree}/>
                    <BatItem cageStatus={type === 'cage3' ? 7 : 11} onClick={handleThree}/>
                    <BatItem cageStatus={type === 'cage3' ? 7 : 11} onClick={handleThree}/>
                    <div style={width50}></div>
                    <BatItem cageStatus={type === 'cage4' ? 7 : 11} onClick={handleFour}/>
                    <BatItem cageStatus={type === 'cage4' ? 7 : 11} onClick={handleFour}/>
                    <BatItem cageStatus={type === 'cage4' ? 7 : 11} onClick={handleFour}/>
                    <BatItem cageStatus={type === 'cage4' ? 7 : 11} onClick={handleFour}/>
                </div>
                <div>
                    <br/>
                </div>
            </>}
            <div style={flex}>
                <Battlefield field={myField} handleHit={handleMyFieldHint}/>
                <div style={width50}></div>
                <Battlefield field={pcField} handleHit={handlePcFieldHint}/>
            </div>
            {isPlayerWin ? <div>You are WIN!!!</div> : null}
            {isPlayerLose ? <div>You are Lose!!!</div> : null}
        </Container>
    );
}

export default PageMain;