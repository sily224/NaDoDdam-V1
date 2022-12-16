import React from 'react';
// import {Link} from 'react-router-dom';
import styled from 'styled-components';

const FarmList = ({contents}) => {
  if (contents.length === 0){
    return (
      <div>게시물 없음</div>
    );
  } else {
    return (
      <Container>
        <ItemList className="itemList">
          {contents.map(content=>{
            return (
              <Item key={content.postNumber}>
                <button type="button" id={content.postNumber}>
                </button>
                <img src={content.imageURL} alt={content.name}/>
                <TextContainer>
                  <div>주소 : {content.address}</div>
                  <div>농장 : {content.name}</div>
                  <div>가격 : {content.price}</div>
                </TextContainer>
              </Item>)
          })}
        </ItemList>
      </Container>
    );
  }
}

const Container = styled.div`
  display : flex;
  overflow : hidden;
  justify-content : center;
  
`

const ItemList = styled.div`
  display : grid;
  grid-template-columns : repeat(auto-fill, minmax(400px, auto));
  grid-gap : 25px;
  max-width : 2100px;
`

const Item = styled.div`
  display : flex;
  flex-direction : column;
  flex-basis : auto;
  height : auto;
  width : auto;
  border : 1px solid black;
  position : relative;

  button {
    width : 30px;
    height : 30px;
    background-color : white;
    position : absolute;
    top : 5%;
    right : 5%;
  }

  button:hover {
    background-color : gray;
  }

  img {
    width : 100%;
    height : 60%;
  }
`
const TextContainer = styled.div`
  display : grid;
  height : 40%;
  object-fit : cover;
  grid-template-rows : 1fr 1fr 1fr; 
`

export default FarmList;