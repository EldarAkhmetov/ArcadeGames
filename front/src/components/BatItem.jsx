import React from 'react';
import styled from "@emotion/styled";
import Miss from '../img/miss.png'
import Bomb from '../img/bomb.svg'
import BombBlow from '../img/bomb-blow.svg'
import One from '../img/1.svg'
import Two from '../img/2.svg'
import Three from '../img/3.svg'
import Four from '../img/4.svg'
import Five from '../img/5.svg'
import Six from '../img/6.svg'
import Seven from '../img/7.svg'
import Eight from '../img/8.svg'
import Nine from '../img/9.svg'

function BatItem({cageStatus, onClick}) {
    let Item = styled.div``

    const handleClick = (...args) => {
        onClick(...args);
    }
    // Пустая ячейка
    if (cageStatus === 0 || (cageStatus >= 50 && cageStatus < 60)) {
        Item = styled.button`
          background: rgba(255, 255, 255, 0.87);
          width: 50px;
          height: 50px;
          padding: 0;
          margin: 0;
          border: 2px solid #b0d0f6;`

    }
    // Корабль
    if (cageStatus > 10 && cageStatus < 21) {
        Item = styled.button`
          background: lawngreen;
          width: 50px;
          height: 50px;
          padding: 0;
          margin: 0;
          border: 2px solid #b0d0f6;`

    }
    // Ранен
    if (cageStatus === 5) {
        Item = styled.button`
          background: red;
          width: 50px;
          height: 50px;
          padding: 0;
          margin: 0;
          border: 2px solid #b0d0f6;`
    }
    // Убит
    if (cageStatus === 6) {
        Item = styled.button`
          background: darkred;
          width: 50px;
          height: 50px;
          padding: 0;
          margin: 0;
          border: 2px solid #b0d0f6;`
    }
    // Мимо
    if (cageStatus === 7) {
        Item = styled.button`
          background-image: url(${Miss}) ;
          background-size: contain;
          width: 50px;
          height: 50px;
          padding: 0;
          margin: 0;
          border: 2px solid #b0d0f6;`
    }

    if (cageStatus === 30 || cageStatus === 31) {
        Item = styled.button`
          background-image: url(${Bomb}) ;
          background-color: blue;
          background-size: contain;
          width: 50px;
          height: 50px;
          padding: 0;
          margin: 0;
          border: 2px solid #c0d0f6;`
    }

    if (cageStatus === 32) {
        Item = styled.button`
          background-image: url(${BombBlow}) ;
          background-color: red;
          background-size: contain;
          width: 50px;
          height: 50px;
          padding: 0;
          margin: 0;
          border: 2px solid #c0d0f6;`
    }

    if (cageStatus === 41) {
        Item = styled.button`
          background-image: url(${One}) ;
          background-color: green;
          background-repeat: no-repeat;
          background-size: contain;
          width: 50px;
          height: 50px;
          padding: 0;
          margin: 0;
          border: 2px solid #c0d0f6;`
    }

    if (cageStatus === 42) {
        Item = styled.button`
          background-image: url(${Two}) ;
          background-color: green;
          background-repeat: no-repeat;
          background-size: contain;
          width: 50px;
          height: 50px;
          padding: 0;
          margin: 0;
          border: 2px solid #c0d0f6;`
    }

    if (cageStatus === 43) {
        Item = styled.button`
          background-image: url(${Three}) ;
          background-color: green;
          background-size: contain;
          background-repeat: no-repeat;
          width: 50px;
          height: 50px;
          padding: 0;
          margin: 0;
          border: 2px solid #c0d0f6;`
    }

    if (cageStatus === 44) {
        Item = styled.button`
          background-image: url(${Four}) ;
          background-color: green;
          background-size: contain;
          background-repeat: no-repeat;
          width: 50px;
          height: 50px;
          padding: 0;
          margin: 0;
          border: 2px solid #c0d0f6;`
    }

    if (cageStatus === 45) {
        Item = styled.button`
          background-image: url(${Five}) ;
          background-color: green;
          background-size: contain;
          background-repeat: no-repeat;
          width: 50px;
          height: 50px;
          padding: 0;
          margin: 0;
          border: 2px solid #c0d0f6;`
    }

    if (cageStatus === 46) {
        Item = styled.button`
          background-image: url(${Six}) ;
          background-color: green;
          background-size: contain;
          background-repeat: no-repeat;
          width: 50px;
          height: 50px;
          padding: 0;
          margin: 0;
          border: 2px solid #c0d0f6;`
    }

    if (cageStatus === 47) {
        Item = styled.button`
          background-image: url(${Seven}) ;
          background-color: green;
          background-size: contain;
          background-repeat: no-repeat;
          width: 50px;
          height: 50px;
          padding: 0;
          margin: 0;
          border: 2px solid #c0d0f6;`
    }

    if (cageStatus === 48) {
        Item = styled.button`
          background-image: url(${Eight}) ;
          background-color: green;
          background-size: contain;
          background-repeat: no-repeat;
          width: 50px;
          height: 50px;
          padding: 0;
          margin: 0;
          border: 2px solid #c0d0f6;`
    }

    if (cageStatus === 49) {
        Item = styled.button`
          background-image: url(${Nine}) ;
          background-color: green;
          background-size: contain;
          background-repeat: no-repeat;
          width: 50px;
          height: 50px;
          padding: 0;
          margin: 0;
          border: 2px solid #c0d0f6;`
    }

    return (
        <Item onClick={handleClick} onContextMenu={handleClick}>
        </Item>
    );
}

export default BatItem;