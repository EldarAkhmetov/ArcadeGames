import React from 'react';
import styled from "@emotion/styled";
import BatItem from "./BatItem";

let F1 = styled.div`
  width: 500px;
  height: 518px;
  border-radius: 2px;
  border: 4px solid #148fff;
  padding: 0;
  background: #b0d0f6;
`

function Battlefield(props) {
    const {handleHit, field, fieldSize} = props;
    if (fieldSize === 10) {
        F1 = styled.div`
            width: 500px;
            height: 518px;
            border-radius: 2px;
            border: 4px solid #148fff;
            padding: 0;
            background: #b0d0f6;
        `
    } else  if (fieldSize === 15) {
        F1 = styled.div`
            width: 750px;
            height: 778px;
            border-radius: 2px;
            border: 4px solid #148fff;
            padding: 0;
            background: #b0d0f6;
      `
    } else {
        F1 = styled.div`
            width: 1760px;
            height: 1040px;
            border-radius: 2px;
            border: 4px solid #148fff;
            padding: 0;
            background: #b0d0f6;
      `
    }
    const handleClink = (props, event) => {
        handleHit(props, event);
    }

    return (
        <F1>
            {field.map((item, i) =>
                item.map((element, l) => {
                    return (
                        <BatItem key={'k'+i+'t'+l} cageStatus={element} onClick={(e) => handleClink([i,l], e)}/>
                    )
                })
            )}
        </F1>
    );
}

export default Battlefield;

