import { ImStarFull } from "react-icons/im";
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router";
import styled from 'styled-components'
import * as userApi from "../lib/userApi";

import { getToken } from '../utils/utils';

const RatingBox = styled.div`
  margin: 0 auto;

  & svg {
    color: #C4C4C4;
    cursor: pointer;
  }
  .black {
    color: yellow;
  }
`


const CreateReview = ({id, farmId}) => {
  const [clicked, setClicked] = useState([false, false, false, false, false]);
  const navigate = useNavigate();
  let starScore = clicked.filter(Boolean).length;
  
  const handleStarClick = index => {
    let clickStates = [...clicked];
    clickStates.forEach((i, idx) => clickStates[idx] = idx <= index ? true : false)
    setClicked(clickStates);
   };

   const postReviewDataHandler = async(e) => {
    e.preventDefault();
    const content = e.target.content.value;
    const rating = starScore;
    const farm_id = farmId;
    try{
      await userApi.post(`//localhost:3500/api/review/${id}`, {
        content,
        rating,
        farm_id
      })
      navigate('/myreview');
    }catch(err){
      console.log(err);
    }
  };

  return (
    <>
    <RatingBox>
      <p>농장 체험 경험은 어떠셨나요?</p>
      {[0,1,2,3,4].map(item =>
      <ImStarFull 
      key={item}
      className={clicked[item] && 'black'}
      onClick={() => handleStarClick(item)}
      />)
      }
    </RatingBox>
    <form onSubmit={postReviewDataHandler}>
      <textarea name="content" placeholder="후기를 작성해주세요"></textarea>
      <button type="submit">저장</button>
    </form>
    </>
  )
}

export default CreateReview;