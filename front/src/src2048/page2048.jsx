import React, {useState, useEffect, useCallback} from 'react';
import Item2048 from "./item2048";
import styled from "@emotion/styled";

const Page2048 = (props) => {

    const [field, setField] = useState([
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
    ])

    const isGameFinished = () => {
        let flag = 1;
        field.forEach(item => item.forEach(
            x => {
                if (x === 0)
                    flag = 0;
            }
        ))
        return flag;
    }

    const [maxContent, setMaxContent] = useState(2);
    const getRandomInt = (min, max) => {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    const getRandomContent = () => {
        return 2;
    }

    const mapField = (f) => {
        return f.map(row => row.map(x => x));
    }

    const initialCallback = useCallback(() => {
        if (!isGameFinished()) {
            let newField = mapField(field);
            let row = getRandomInt(0, 3);
            let col = getRandomInt(0, 3);
            let content = getRandomContent();
            if (newField[row][col] === 0)
                newField[row][col] = content;
            row = getRandomInt(0, 3);
            col = getRandomInt(0, 3);
            content = getRandomContent();
            if (newField[row][col] === 0)
                newField[row][col] = content;
            row = getRandomInt(0, 3);
            col = getRandomInt(0, 3);
            content = getRandomContent();
            if (newField[row][col] === 0)
                newField[row][col] = content;
            setField(newField);
        }
    }, [])

    useEffect(() => {
        initialCallback();
        window.addEventListener('keydown', listener);
    }, [])

    const listener = (e) => {
        handleKeyPress(e.key)
    }

    const Map = styled.div`
      width: 400px;
      height: 400px;
      border-radius: 2px;
      padding: 0;
    `
    const handleKeyPress = (key) => {
        switch (key) {
            case "ArrowUp":
                break;
            case "ArrowDown":
                break;
            case "ArrowLeft":
                setField(oldField => {
                    let newField = mapField(oldField);
                    newField.forEach(row => {
                        if (row[0] === 0 || row[0] === row[1]) {
                            row[0] = row[0] + row[1];
                            row[1] = row[2];
                            row[2] = row[3];
                            row[3] = row[0];
                        }
                        if (row[1] === 0 || row[1] === row[2]) {
                            row[1] = row[1] + row[2];
                            row[2] = row[3];
                            row[3] = row[0];
                        }
                        if (row[2] === 0 || row[2] === row[3]) {
                            row[2] = row[2] + row[3];
                            row[3] = 0;
                        }
                    })
                    return newField;
                })
                break;
            case "ArrowRight":
                break;
            default:
                break;
        }
    }

    return <Map>
        {field.map((item, i) =>
            <div style={{display: "flex"}}  key={'k' + i}>{item.map((element, l) => {
                return (
                    <Item2048 key={'k' + i + 't' + l} content={element}/>
                )
            })}</div>
        )}
    </Map>
}

export default Page2048;