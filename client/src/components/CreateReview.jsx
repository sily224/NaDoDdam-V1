import { ImStarFull } from "react-icons/im";
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router";
import styled from 'styled-components'
import * as userApi from "../lib/userApi";

import { getToken } from '../utils/utils';
import { useParams } from "react-router";
import {StyledTitle, StyledSubTitle,SubmitButton} from '../styles/Styled'
import { HOST } from "../global-variables";

const RatingBox = styled.div`
  margin: 0 auto;
  padding-top: 1rem;

  & svg {
    color: #C4C4C4;
    cursor: pointer;
  }
  .black {
    color: yellow;
  }
`
const Container = styled.div`
 display: flex;
 justify-content: space-evenly;
`

const ReservationWrap = styled.div`
 display: flex;
 align-items: center;
`

const FarmImg = styled.div`
  width: 30%;
  margin-right: 1.5rem;
  > img {
    width: 100%;
    border-radius: 20px;
  }
`

const StyledTextarea = styled.textarea`
  background : #fff;
  border-radius: 5px;
  margin-top: 0.5rem;
  width: 50%;
  height: 100px;
`

const CreateReview = () => {
  const [clicked, setClicked] = useState([false, false, false, false, false]);
  const navigate = useNavigate();
  
  const [reservationData, setReservationData] = useState([]);
  const [farmId, setFarmId] = useState(null);
  const { id }= useParams();
  let starScore = clicked.filter(Boolean).length;
  
  const handleStarClick = index => {
    let clickStates = [...clicked];
    clickStates.forEach((i, idx) => clickStates[idx] = idx <= index ? true : false)
    setClicked(clickStates);
   };
   const getReservationData = async () => {
    const token = getToken();
    const res = await userApi.get(`${HOST}/api/reserve`, {
      headers: {
        authorization: token,
      },
    });
    const result  = res.data.filter(item => item.reserve.id === Number(id));
    setReservationData([result[0]]);
    setFarmId(result[0].info.id);
 };


useEffect(() => {
  getReservationData();
 },[]);

   const postReviewDataHandler = async(e) => {
    e.preventDefault();
    const content = e.target.content.value;
    const rating = starScore;
    const farm_id = farmId;
    try{
      await userApi.post(`${HOST}/api/review/${id}`, {
        content,
        rating,
        farm_id
      })
      navigate('mypage/review');
    }catch(err){
      console.log(err);
    }
  };

  return (
    <div>
      <StyledTitle>리뷰 작성</StyledTitle>
       {reservationData.map(item => {
         const {info, reserve} = item
         const start_time = info.start_time.slice(0,5);
         const end_time = info.end_time.slice(0,5);
         return (
           <ReservationWrap key={info.id}>
           <FarmImg><img src={info.url} alt="농장이미지"/></FarmImg>
           <div>
           <h2>{info.name}</h2>
            <p>체험 날짜: {info.date}</p>
            <p>체험 시간: {start_time} - {end_time}</p>
            <p>체험 인원: {reserve.personnel}명</p>
           </div>
           </ReservationWrap>
         )
       })}
       <div>
        <hr />
        
    <StyledSubTitle marginTop>농장 체험 경험은 어떠셨나요?</StyledSubTitle>
    <RatingBox>
      {[0,1,2,3,4].map(item =>
      <ImStarFull 
      key={item}
      className={clicked[item] && 'black'}
      onClick={() => handleStarClick(item)}
      />)
      }
    </RatingBox>
    <form onSubmit={postReviewDataHandler}>
      <StyledTextarea name="content" placeholder="후기를 작성해주세요"></StyledTextarea><br />
      <SubmitButton type="submit">저장 하기</SubmitButton>
    </form>
    </div>
    </div>
    
  )
}

export default CreateReview;