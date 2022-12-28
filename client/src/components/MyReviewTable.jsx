import { getToken } from '../utils/utils';
import * as userApi from "../lib/userApi";
import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { ImStarFull } from "react-icons/im";
import { useDispatch, useSelector } from 'react-redux';
import ModalContainer from './Modal';
import { showModal, closeModal } from '../store/ModalSlice';
import { Link } from 'react-router-dom';
import { HOST } from '../global-variables';

const StyledTitleWrap = styled.div`
  display:flex;
`

const StyledTitle = styled.div`
  margin-bottom: 1%;

  > h3 {
    display: inline-block;
    margin-bottom: 0;
  }

  > span {
    background-color: lightgrey;
    padding: 1%;
    margin-left: 1%;
    border-radius: 10px;
  }
`

const StyledContent = styled.div`
  width:70%;

  >p {
    margin-bottom: 0;
  }
`

const StyledContentWrap = styled.div`
  display:flex;
  justify-content:space-between;
`

const StyledNavWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 2%;
`

const StyledList = styled.div`
  border: 1px solid lightgray;
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 3%;
  box-sizing: border-box;
  margin-bottom: 2%;
`

const StyledListInner = styled.div`
  display:flex;
  align-items: center;
    
`

const StyledImageWrap = styled.div`
  width: 30%;
  height: 100%;
  margin-right: 20px;
  overflow: hidden;
  border-radius: 20px;

  >img {
    width: 100%;
  }
`

const StarRateWrap = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  margin: 100px 0 0 15px;
  .star_icon {
    display: inline-flex;
    margin-right: 5px;
  }
`

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
const StarRate = ({rating}) => {
  const [clicked, setClicked] = useState([true,true,true,true,true]);
  
  const handleStarClick = () => {
    let clickStates = [...clicked];
    clickStates.map((i, idx) => clickStates[idx] = idx <= rating-1 ? true : false)
    setClicked(clickStates);
   };

useEffect(() => {
  handleStarClick();
},[])

  return (
    <RatingBox>
      {[0,1,2,3,4].map(item =>
      <ImStarFull 
      key={item}
      className={clicked[item] && 'black'}
      />)
      }
    </RatingBox>
  )
}

const MyReviewTable = () => {
  const [data, setData] = useState([]);
  const [dataIndex, setDataIndex] = useState(0);
  const dispatch = useDispatch();
  const modalOpen = useSelector((state) => state.modal.modal);
    
  const getReviewData = async() => {
    try {
      const token = getToken();
      const res = await userApi.get(`//localhost:3500/api/review`, {
        headers: {
          authorization: token,
        },
      });
      const result = res.data.sort((a, b) => {
				let aTime = a.review.createdAt;
				let bTime = b.review.createdAt;
				if (aTime > bTime) return -1;
				if (aTime === bTime) return 0;
				if (aTime < bTime) return 1;
			});
      setData(result);
      setData(res.data);
    }catch(err) {
      console.log(err)
    }
  }

  useEffect(() => {
    getReviewData();
  },[])

  const ShowReviewList = () => {
    const deleteReviewHandler = async(e) => {
      const id = e.target.name;
      console.log(id)
      try{
        await userApi.delete(`${HOST}/api/review/${id}`);
        alert('삭제되었습니다.');
        dispatch(closeModal());
        getReviewData();
      }catch(err){
        console.log(err);
      }
    };

    return (<>
      {data.map((item, index) => { 
        const {review, reserveInfo, time} = item || {};
        const start_time = time.start_time.slice(0,5);
        const end_time = time.end_time.slice(0,5);
        return (
          <StyledList key={index}>
            <StyledListInner>
              <StyledImageWrap>
                <img src={time.url} alt="농장사진"/>
              </StyledImageWrap>
              <StyledContent>
                <StyledTitle>
                  <h3>{time.farmName}</h3>
                </StyledTitle>
                <p>{time.date} {start_time} - {end_time}</p>
                <p>인원: {reserveInfo.personnel}명</p>
                <p>{review.content}</p>
                <StarRate rating={review.rating}/>
              </StyledContent>
            </StyledListInner>
            <div>
            <button>
              <Link to ={`/updatereview/${reserveInfo.id}`}>
                수정
              </Link>
            </button>
            <button onClick={() => dispatch(showModal())}>삭제</button>
            {modalOpen && <ModalContainer>
                  <p>리뷰를 삭제하시겠습니까?</p>
                  <button>닫기</button>
                  <button onClick={(e) => {deleteReviewHandler(e)}}>확인</button>
            </ModalContainer>}
            </div>
          </StyledList>
          )
        })}
      </>  
    );
  };

  return (
    <>
    <ShowReviewList />
    </>
    )
}

export default MyReviewTable;