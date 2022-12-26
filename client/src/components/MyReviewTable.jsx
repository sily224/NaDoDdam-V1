import { getToken } from '../utils/utils';
import * as userApi from "../lib/userApi";
import { useState, useEffect } from 'react';
import styled from 'styled-components';

import { useDispatch, useSelector } from 'react-redux';
import ModalContainer from './Modal';
import { showModal } from '../store/ModalSlice';

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

const MyReviewTable = () => {
  const [data, setData] = useState([]);
  const [dataIndex, setDataIndex] = useState(null);
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
      setData(res.data);
    }catch(err) {
      console.log(err)
    }
  }

  useEffect(() => {
    getReviewData();
  },[])

  const ShowResrvation = () => {
    return (<>
      {data.map((reservation , index) => { 
        const {farm, time, review, reserveInfo} = reservation;
        const start_time = time.start_time.slice(0,5);
        const end_time = time.end_time.slice(0,5);
        return (
          <StyledList key={index}>
            <StyledListInner>
              <StyledImageWrap>
                <img src={farm.url} alt="농장사진"/>
              </StyledImageWrap>
              <StyledContent>
                <StyledTitle>
                  <h3>{farm.name}</h3>
                </StyledTitle>
                <p>{time.date} {start_time} -  {end_time}</p>
                <p>인원: {reserveInfo.personnel}명</p>
                <p>{review.content}</p>
              </StyledContent>
            </StyledListInner>
            <button onClick={() => {
              dispatch(showModal());
              setDataIndex(index);
            }}>더보기</button>
          </StyledList>
          )
        })}
      </>  
    );
  };

  const ShowDetail = () => {
    const detailDataArr = [data[dataIndex]];
    console.log(detailDataArr)
    
    return (
      <>
      {modalOpen && <ModalContainer>
        {detailDataArr.map(reservation => {
          const {farm, time, review, reserveInfo} = reservation;
          const start_time = time.start_time.slice(0,5);
          const end_time = time.end_time.slice(0,5);

          return (
            <div>
                <StyledTitleWrap>
                  <StyledImageWrap>
                    <img src={farm.url} alt="농장사진"/>
                  </StyledImageWrap>
                  <div>
                    <h4>{farm.name}</h4> 
                    <p>{time.date}</p>
                  </div>
                </StyledTitleWrap>
                <div>
                  <p>예약정보</p>
                  <StyledContentWrap>
                      <p>날짜: {time.date}</p>
                      <p>시간: {start_time}-{end_time}</p>
                      <p>인원: {reserveInfo.personnel}명</p>
                  </StyledContentWrap>
                  <p>{review.content}</p>
                </div>
                <button>수정</button>
                <button>삭제</button>
            </div>)
        }
        )}
      </ModalContainer>}
      </>
    )
  }

  return (
    <>
    <ShowResrvation />
    <ShowDetail />
    </>
    )
}

export default MyReviewTable;