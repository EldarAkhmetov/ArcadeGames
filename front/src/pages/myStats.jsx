import React, {useState, useEffect} from 'react';
import {Api} from "../api/api";
import styled from "@emotion/styled";
import StarIcon from '@mui/icons-material/Star';
import {yellow} from '@mui/material/colors';
import AccountCircleSharpIcon from '@mui/icons-material/AccountCircleSharp';
import EqualizerSharpIcon from '@mui/icons-material/EqualizerSharp';
import SportsEsportsSharpIcon from '@mui/icons-material/SportsEsportsSharp';

function MyStats(props) {
    const {login} = props;
    const [stats, setStats] = useState({});

    useEffect(() => {
        Api.getStats(login)
            .then(res => setStats(res));
    }, []);

    const GameStat = styled.h1`
      padding: 30px;
      background: rgba(232, 225, 116, 0.33);
    `
    const Card = styled.div`
      margin: 30px;
      background: rgba(202, 241, 227, 0.53);
      padding: 10px;
      border: 2px solid #333;
      border-radius: 10px;
      text-align: center;
    `
    // const Card = styled.div`
    // if (!login) return <div></div>

    return (
        <>
            <GameStat> <StarIcon
                fontSize={"large"}
                sx={{color: yellow[500]}}
            />Game stats
                <StarIcon
                    fontSize={"large"}
                    sx={{color: yellow[500]}}
                />
            </GameStat>

            {stats ?
                <Card>
                    <div>

                        <h2><AccountCircleSharpIcon fontSize={"medium"}/>Login: {stats.login} </h2>
                    </div>
                    <h3>Minesweeper :</h3>
                    <h3>Hard lvl win : {stats.mineHardWin} of {stats.mineHard}</h3>
                    <h3>Medium lvl win : {stats.mineNormalWin} of {stats.mineNormal}</h3>
                    <h3>Easy lvl win : {stats.mineEasyWin} of {stats.mineEasy}</h3>
                    <h3>2048 :</h3>
                    <h3>Games played : {stats.fifteenGames}</h3>
                    <h3>Record : {stats.fifteenRecord}</h3>
                    <h3>Average number of moves in the game : {stats.fifteenRecord}</h3>
                    <h3>Tag Game:</h3>
                    <h3>Games played : {stats.fifteenGames}</h3>
                    <h3>Record : {stats.fifteenRecord}</h3>
                    <h3>Average number of moves in the game : {stats.fifteenMedium}</h3>
                    <Card styled={{width: 50}}>
                    <h3><SportsEsportsSharpIcon/>Games played: {stats.games}</h3>
                    <h3><EqualizerSharpIcon/>Win rate : {stats.wins}%</h3>
                    </Card>
                </Card> : null}

        </>
    );
}


export default MyStats;