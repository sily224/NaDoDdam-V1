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

const UpdateReview = ({id}) => {
    const [clicked, setClicked] = useState([false, false, false, false, false]);
    const [reviewContent, setReviewContent] = useState('');
    const [reviewId, setReviewId] = useState(null);
    const [rating, setRating] = useState(0);
    const navigate = useNavigate();
    const textRef = useRef();
    let starScore = clicked.filter(Boolean).length;
  
    const getReviewData = async () => {
      const token = getToken();
      const res = await userApi.get(`//localhost:3500/api/review`, {
        headers: {
          authorization: token,
        },
      });
      const result  = res.data.filter(item => item.reserveInfo.id === Number(id));
      setReviewContent([result[0].review.content]);
      setRating(result[0].review.rating);
      setReviewId(result[0].review.id);
  };
  
    const showRating = () => {
      let clickStates = [...clicked];
      clickStates.map((i, idx) => clickStates[idx] = idx <= rating-1 ? true : false)
      setClicked(clickStates);
    }
  
    useEffect(()=>{
      getReviewData();
    },[]);

    useEffect(()=>{
      showRating();
    },[rating]);
  
    const handleStarClick = index => {
      let clickStates = [...clicked];
      clickStates.forEach((i, idx) => clickStates[idx] = idx <= index ? true : false)
      setClicked(clickStates);
     };
  
     const updateReviewHandler = async(e) => {
      e.preventDefault();
      const content = textRef.current.value;
      const rating = starScore;
      try {
        await userApi.patch(`//localhost:3500/api/review/${reviewId}`, {
          content,
          rating
        });
        alert('수정되었습니다.');
        navigate('/myreview');
      } catch (err) {
        console.log(err.response.data.Error);
        alert('문제가 발생했습니다. 다시 시도해 주세요.');
      }
    };
    
    return (
      <>
      <RatingBox>
        {[0,1,2,3,4].map(item =>
        <ImStarFull 
        key={item}
        className={clicked[item] && 'black'}
        onClick={() => handleStarClick(item)}
        />)
        }
      </RatingBox>
      <form onSubmit={updateReviewHandler}>
        <textarea 
          name="content"
          defaultValue={reviewContent}
          ref={textRef}
          maxLength={50}
        ></textarea>
        {reviewContent.length >= 50 && '50자 까지 작성이 가능합니다.'}
        <button type="submit">수정</button>
      </form>
      </>
    )
  }

  export default UpdateReview;