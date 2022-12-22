import axios from 'axios';
import React from 'react';
import {Link} from 'react-router-dom';
import styled from 'styled-components';

const handleButton = (e) => {
  const farmId = Number(e.target.id);
  console.log(farmId);
  e.target.style.backgroundColor = 'red';

  const token = localStorage.getItem('token');
  const header = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    }
  }

  axios.post(`http://localhost:3500/api/like/${farmId}`, header);
  
}

const FarmList = ({contents}) => {
  if (contents.length === 0){
    return (
      <Container>게시물 없음</Container>
    );
  } else {
    return (
      <Container>
        <ItemList className="itemList">
          {contents.map(content=>{
            return (
                <Item key={content.id}>
                  <button type="button" id={content.id} onClick={handleButton}/>
                  <Link to={`/detail/${content.id}`}>
                    <img src={content.imageURL} alt={content.name}/>
                    <TextContainer>
                      <div>농장 : {content.name}</div>
                      <div>주소 : {content.address}</div>
                      <div>가격 : {content.price}</div>
                    </TextContainer>
                  </Link>
                </Item>
              )
          })}
        </ItemList>
      </Container>
    );
  }
}

const Container = styled.div`
  box-sizing: border-box;
  display : flex;
  overflow : hidden;
  justify-content : center;
  width: 100%;
  margin : 0;

`

const ItemList = styled.div`
  display : grid;
  grid-template-columns : repeat(auto-fit, minmax(400px, auto));
  grid-gap : 25px;
  max-width : 2100px;
  width: 100%;
  height: 100%;
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
    z-index:1;
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