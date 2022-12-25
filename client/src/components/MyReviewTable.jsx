import { getToken } from '../utils/utils';
import * as userApi from "../lib/userApi";
import { useState, useEffect } from 'react';
import styled from 'styled-components';

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
  const [data, setData] = useState()
    
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

  console.log(data);

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
            <div>
              {/* <button 
                name={index} 
                onClick={(e)=> {
                setDataIndex(e.target.name)
                dispatch(showModal())}}>
                더보기
              </button> */}
                {/* {reserve.status === '체험완료' && <button name={index}  onClick={(e)=> {console.log(e.target.name)}}>후기작성</button> }
                {(reserve.status === '예약대기' || reserve.status === '예약완료')
                  && <button 
                  name={index}
                  onClick={(e)=> {
                    setDataIndex(e.target.name)
                    console.log(e.target.name)
                    setCanclePage(prev =>!prev)
                  }}>
                  예약취소
               </button>
              } */}
            </div>
          </StyledList>
          )
        })}
      </>  
    );
  };

  return (
    <>
    <ShowResrvation />
    </>
    )
}

export default MyReviewTable;