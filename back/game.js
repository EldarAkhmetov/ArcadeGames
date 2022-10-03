'use strict';

const {cageVariants} = require("./cages");

function checkField(cages) {
    if (!cages)
        return false;
    let cage1 = 0;
    let cage2 = 0;
    let cage3 = 0;
    let cage4 = 0;

    cages.forEach(cage => {
        switch (cage.type) {
            case 'cage1':
                cage1++;
                break;
            case 'cage2':
                cage2++;
                break;
            case 'cage3':
                cage3++;
                break;
            case 'cage4':
                cage4++;
                break;
            default:
                break;
        }
        if (cage1 !== 4 || cage2 !== 3 || cage3 !== 2 || cage4 !== 1)
            return false;
    })
    return true;
}

function generateCages() {
    let variant = Math.floor(Math.random() * 10);
    return cageVariants[variant];
}

function findCage(cages, index) {
    let result;
    cages.forEach(cage => {
        if (cage.index === index) {
            result = cage;
        }
    })
    return result;
}

function mapCagesToField(cages) {
    let result = getBlankField();
    cages.forEach(cage => {
        switch (cage.type) {
            case 'cage1':
                result[cage.coords[0]][cage.coords[1]] = cage.index;
                break;
            case 'cage2':
                result[cage.coords[0]][cage.coords[1]] = cage.index;
                if (cage.direction) {
                    result[cage.coords[0]+1][cage.coords[1]] = cage.index;
                } else {
                    result[cage.coords[0]][cage.coords[1]+1] = cage.index;
                }
                break;
            case 'cage3':
                result[cage.coords[0]][cage.coords[1]] = cage.index;
                if (cage.direction) {
                    result[cage.coords[0]+1][cage.coords[1]] = cage.index;
                    result[cage.coords[0]+2][cage.coords[1]] = cage.index;
                } else {
                    result[cage.coords[0]][cage.coords[1]+1] = cage.index;
                    result[cage.coords[0]][cage.coords[1]+2] = cage.index;
                }
                break;
            case 'cage4':
                result[cage.coords[0]][cage.coords[1]] = cage.index;
                if (cage.direction) {
                    result[cage.coords[0]+1][cage.coords[1]] = cage.index;
                    result[cage.coords[0]+2][cage.coords[1]] = cage.index;
                    result[cage.coords[0]+3][cage.coords[1]] = cage.index;
                } else {
                    result[cage.coords[0]][cage.coords[1]+1] = cage.index;
                    result[cage.coords[0]][cage.coords[1]+2] = cage.index;
                    result[cage.coords[0]][cage.coords[1]+3] = cage.index;
                }
                break;
            default:
                break;
        }
    })
    return result;
}

function changeIfZero(newNumb, numb)
{
    if (numb === 0)
        return newNumb;
    return numb;
}

function copyField(field)
{
    let result = getBlankField();
    field.forEach((row,i) => {
        row.forEach((el, l) => {
            result[i][l] = el;
        })
    })
    return result;
}

function mapCagesFromHittedField(cages, field) {
    let result = copyField(field);
    cages.forEach(cage => {
        switch (cage.type) {
            case 'cage1':
                result[cage.coords[0]][cage.coords[1]] = changeIfZero(cage.index, result[cage.coords[0]][cage.coords[1]]);
                break;
            case 'cage2':
                result[cage.coords[0]][cage.coords[1]] = changeIfZero(cage.index, result[cage.coords[0]][cage.coords[1]]);
                if (cage.direction) {
                    result[cage.coords[0]+1][cage.coords[1]] = changeIfZero(cage.index, result[cage.coords[0]+1][cage.coords[1]]);
                } else {
                    result[cage.coords[0]][cage.coords[1]+1] = changeIfZero(cage.index, result[cage.coords[0]][cage.coords[1]+1]);
                }
                break;
            case 'cage3':
                result[cage.coords[0]][cage.coords[1]] = changeIfZero(cage.index, result[cage.coords[0]][cage.coords[1]]);
                if (cage.direction) {
                    result[cage.coords[0]+1][cage.coords[1]] = changeIfZero(cage.index, result[cage.coords[0]+1][cage.coords[1]]);
                    result[cage.coords[0]+2][cage.coords[1]] = changeIfZero(cage.index, result[cage.coords[0]+2][cage.coords[1]]);
                } else {
                    result[cage.coords[0]][cage.coords[1]+1] = changeIfZero(cage.index, result[cage.coords[0]][cage.coords[1]+1]);
                    result[cage.coords[0]][cage.coords[1]+2] = changeIfZero(cage.index, result[cage.coords[0]][cage.coords[1]+2]);
                }
                break;
            case 'cage4':
                result[cage.coords[0]][cage.coords[1]] = changeIfZero(cage.index, result[cage.coords[0]][cage.coords[1]]);
                if (cage.direction) {
                    result[cage.coords[0]+1][cage.coords[1]] = changeIfZero(cage.index, result[cage.coords[0]+1][cage.coords[1]]);
                    result[cage.coords[0]+2][cage.coords[1]] = changeIfZero(cage.index, result[cage.coords[0]+2][cage.coords[1]]);
                    result[cage.coords[0]+3][cage.coords[1]] = changeIfZero(cage.index, result[cage.coords[0]+3][cage.coords[1]]);
                } else {
                    result[cage.coords[0]][cage.coords[1]+1] = changeIfZero(cage.index, result[cage.coords[0]][cage.coords[1]+1]);
                    result[cage.coords[0]][cage.coords[1]+2] = changeIfZero(cage.index, result[cage.coords[0]][cage.coords[1]+2]);
                    result[cage.coords[0]][cage.coords[1]+3] = changeIfZero(cage.index, result[cage.coords[0]][cage.coords[1]+3]);
                }
                break;
            default:
                break;
        }
    })
    return result;
}

function getBlankField() {
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

function getCageCoords(cage) {
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

function checkIsWin(cages) {
    let win = true;
    cages.forEach(cage => {
        if (cage.hitted < cage.level)
        {
            win = false;
        }
    })
    return win;
}

function hitByPc(cages, field) {
    let isNoHit = Math.floor(Math.random()*3);
    let goOut = false;
    if (!isNoHit) {
        cages.forEach(cage => {
            if (cage.hitted < cage.level) {
                let cords = getCageCoords(cage);
                cords.forEach(cord => {
                    if (field[cord[0]][cord[1]] !== 5 && field[cord[0]][cord[1]] !== 6 && !goOut) {
                        field[cord[0]][cord[1]] = 5;
                        cage.hitted++;
                        goOut = true;
                        hitByPc(cages, field);
                    }
                })
            }
        })
    } else {
        while (!goOut) {
            let i = Math.floor(Math.random()*10);
            let l = Math.floor(Math.random()*10);
            if (field[i][l] === 0 && !goOut) {
                goOut = true;
                field[i][l] = 7;
            }
        }
    }
}

module.exports = {
    checkField,
    generateCages,
    getBlankField,
    mapCagesToField,
    mapCagesFromHittedField,
    findCage,
    getCageCoords,
    checkIsWin,
    hitByPc}