import React from 'react';
import RatingCard from "../components/RatingCard";
import Box from "@mui/material/Box";
import styled from "@emotion/styled";
import {useEffect, useState} from 'react';
import {Api} from "../api/api";

const BestPlayers = (props) => {

    const [bests, setBests] = useState([]);

    useEffect(() => {
        Api.getBestPlayers()
            .then(res => setBests(res));
    }, []);

    const Box = styled.div`
      padding: 30px;
      background: rgba(232, 225, 116, 0.33);`
    return (
        <Box
        >
            <h1>BestPlayers</h1>
            {bests.map((user, i) => {
                return <RatingCard key={'key' + i}
                                   place={1 + i}
                                   login={user.login}
                                   game_count={user.games}
                                   winrate={Math.floor(user.wins / user.games * 100) + '%'}/>
            })}
        </Box>
    );
}

export default BestPlayers;