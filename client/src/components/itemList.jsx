import React from 'react';
// import {Link} from 'react-router-dom';
import styled from 'styled-components';

const ItemList = ({contents}) => {
  if (contents.length === 0){
    return (
      <div>게시물 없음</div>
    );
  } else {
    return (
      <ItemListStyle className="itemList">
        {contents.map(content=>{

          return (
            <Item key={content.postNumber}>
              <input type='checkbox' id={content.postNumber}/>
              <img src={content.imageURL} alt={content.name}/>
              <p>주소 : {content.address}</p>
              <p>농장 : {content.name}</p>
              <p>가격 : {content.price}</p>
            </Item>)
        })}
      </ItemListStyle>
    );
  }
}

const ItemListStyle = styled.div`
  background-color : gray;
  display : grid;
  grid-template-columns : 1fr 1fr 1fr 1fr 1fr;
`

const Item = styled.div`

`

export default ItemList;