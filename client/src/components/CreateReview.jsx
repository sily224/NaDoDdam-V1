import { ImStarFull } from "react-icons/im";
import { useState } from "react";
import styled from 'styled-components'

const RatingBox = styled.div`
  margin: 0 auto;

  & svg {
    color: #C4C4C4;
    cursor: pointer;
  }
  :hover svg {
    color: black;
  }
  & svg:hover ~ svg {
    color: #C4C4C4;
  }
  .black {
    color: black;
  }
`

const CreateReview = () => {
  const [clicked, setClicked] = useState([false, false, false, false, false]);

  const handleStarClick = index => {
    let clickStates = [...clicked];
    clickStates.forEach((i, idx) => clickStates[idx] = idx <= index ? true : false)
    setClicked(clickStates);
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
      <textarea placeholder="후기를 작성해주세요"></textarea>
    </>
  )
}

const UpdateReview = () => {
  const [clicked, setClicked] = useState([false, false, false, false, false]);

  const handleStarClick = index => {
    let clickStates = [...clicked];
    clickStates.forEach((i, idx) => clickStates[idx] = idx <= index ? true : false)
    setClicked(clickStates);
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
      <textarea placeholder="후기를 작성해주세요"></textarea>
    </>
  )
}

export  {CreateReview, UpdateReview};