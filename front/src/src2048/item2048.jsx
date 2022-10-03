import styled from "@emotion/styled";

const Item2048 = (props) => {
    const {content} = props;
    const Item = styled.div`
          background-color: lightyellow;      
          width: 99px;
          height: 98px;
          display: flex;
          align-items: center;
          justify-content: center;
          border: 2px solid #c0d0f6;`
    return <Item>{content ? content : ""}</Item>
}

export default Item2048;