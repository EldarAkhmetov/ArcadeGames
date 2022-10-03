import React from 'react';
import styled from "@emotion/styled";

function RatingCard({login, winrate, game_count, place}) {
    return (

        <Card>
            <div style={{width: 300,}}>
                <h2>Player login: {login}</h2>
                <h3>Winrate: {winrate}</h3>
                <h3>game count: {game_count}</h3>
            </div>
            <h1 style={{marginLeft: 200, alignSelf: "center"}}>{place}</h1>
        </Card>
    );
}

export default RatingCard;

const Card = styled.div`
  display: flex;
  //justify-content: space-between;
  margin-bottom: 30px;
  background: rgba(87, 255, 194, 0.4);
  padding: 10px;
  border: 2px solid #fff;
  border-radius: 10px;
`