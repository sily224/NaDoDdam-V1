import axios from 'axios';
import React from 'react';
import {Link} from 'react-router-dom';
import styled from 'styled-components';

const handleButton = async (e) => {
  const farmId = Number(e.target.id);
  console.log('입력된 농장 아이디', farmId);
  if (e.target.style.backgroundColor!=='red') e.target.style.backgroundColor = 'red';
  else e.target.style.backgroundColor = "";

  const token = localStorage.getItem('token');
  const header = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    }
  }

  // 선택한 농장이 찜 목록에 있는지 확인
  await axios.get('http://localhost:3500/api/like', header)
  .then(res=>res.data)
  .then(async data=>{
    console.log('찜 목록들', data);
    for (let i=0;i<data.length;i++){
      if(data[i].farm_id === farmId){
        console.log('찜 목록 있으니 삭제하겠음'); // 찜 목록에 있음

        // 찜 삭제
        await axios(`http://localhost:3500/api/like/${farmId}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`
          }});
          return;
        }
      }

    console.log('찜 목록 없으니 등록하겠음'); // 찜 목록에 없음

    // 찜 등록
    await axios(`http://localhost:3500/api/like/${farmId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`
      },
    });
  });

  // axios.post(`http://localhost:3500/api/like/${farmId}`, header);

  
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

const FavoriteList = ({favorites}) => {
  if (favorites.length === 0){
    return (
      <Container>게시물 없음</Container>
    );
  } else {
    return (
      <Container>
        <ItemList className="itemList">
          {favorites.map(favorite=>{
            return (
                <Item key={favorite.farm_id}>
                  <button type="button" id={favorite.farm_id} onClick={handleButton}/>
                  <Link to={`/detail/${favorite.farm_id}`}>
                    <img src={favorite.imageURL} alt={favorite.name}/>
                    <TextContainer>
                      <div>농장 : {favorite.name}</div>
                      <div>주소 : {favorite.address}</div>
                      <div>가격 : {favorite.price}</div>
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

export {FarmList, FavoriteList};