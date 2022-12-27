import { useState, useEffect} from "react";
import { useDispatch, useSelector } from 'react-redux';
import { Link } from "react-router-dom";
import Moment from 'moment';
import styled, {css} from 'styled-components';
import { showModal } from '../store/ModalSlice';
import { closeModal } from '../store/ModalSlice';
import ModalContainer from './Modal';
import Location from './Location';
import { getToken } from '../utils/utils';
import * as userApi from "../lib/userApi";
import {
  StyledSubmitButton, 
  ConfirmButton, 
  StyledImageWrap, 
  StyledTitle, 
  StyledSubTitle,
  StatusButton,
  StatusSelect
} from '../styles/Styled';


const StyledTitleWrap = styled.div`
  display:flex;
  align-items:center
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
const StyledStatusLabel = styled.span`
  border: none;
  background: #83d644;
  border-radius: 5px;
  padding: 0.2rem;
  color: #fff;
  margin-left: 0.5rem;
  font-size: 0.8rem;
`


const MyReservationTable = () => {
  const [originalData, setOriginalData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [dataIndex, setDataIndex] = useState();
  const [statusOption , setStatusOption] = useState('전체');
  const [dateOption , setDateOption] = useState('지난 3개월');
  const [canclePage, setCanclePage] = useState(false);
  const dispatch = useDispatch();
  const modalOpen = useSelector((state) => state.modal.modal);
  const statusList = ["전체", "예약대기", "예약완료", "예약취소", "체험완료"];

  const getReservationData = async () => {
    const token = getToken();
    const res = await userApi.get(`//localhost:3500/api/reserve`, {
      headers: {
        authorization: token,
      },
    });
    const result = res.data.sort((a, b) => {
      let aTime = a.info.date;
      let bTime = b.info.date;
      if (aTime > bTime) return -1;
      if (aTime === bTime) return 0;
      if (aTime < bTime) return 1;
    });
    setOriginalData(result);
    setFilteredData(result);
  };

  useEffect(() => {
    getReservationData();
  },[]);

  const  filterData= () => {
    let filteredData = [...originalData];
    const today =  Moment().format('YYYY-MM-DD');

    if(statusOption !== "전체" ){
      filteredData = filteredData.filter(item => item.reserve.status === statusOption);
    }

    if(dateOption === 'threeMonthAgo'){
      filteredData = filteredData.filter(item => 
        (Moment().subtract('3', 'months').format('YYYY-MM-DD') < item.info.date) 
        && item.info.date <= today
        );
    }else if(dateOption === 'sixMonthAgo'){
      filteredData = filteredData.filter(item =>
        (Moment().subtract('6', 'months').format('YYYY-MM-DD') < item.info.date) 
        && item.info.date <= today
        );
    }else if(dateOption === 'oneYearAgo'){
      filteredData = filteredData.filter(item => 
        (Moment().subtract('1', 'years').format('YYYY-MM-DD') < item.info.date) 
        && item.info.date <= today
        );
    }
    setFilteredData(filteredData);
  };

  useEffect(()=> {
    filterData();
  },[statusOption, dateOption]);

  const ShowDefault = () => {
    return <>
      {!canclePage 
      ? <>
        <StyledTitle>예약조회</StyledTitle>
        <StyledNavWrapper>
        <div>
          {statusList.map((state) => (
            <StatusButton 
              key={state} 
              onClick={()=>
              setStatusOption(state)}
              clicked = {statusOption === state ? true : false}
              >
              {state}
            </StatusButton>
          ))}
        </div>
        <select value={dateOption} onChange={(e) => setDateOption(e.target.value)}>
					<option value="threeMonthAgo">지난 3개월</option>
					<option value="sixMonthAgo">지난 6개월</option>
					<option value="oneYearAgo">지난 1년</option>
				</select>
        </StyledNavWrapper>
      </>
      : <h1>예약취소</h1>
      }
    </>
  };

  const ShowResrvation = () => {
    return (<>
      {filteredData.map((reservation , index) => { 
        const {info, reserve} = reservation || {};
        const start_time = info.start_time.slice(0,5);
        const end_time = info.end_time.slice(0,5);
        return (
          <StyledList key={index}>
            <StyledListInner>
              <StyledImageWrap>
                <img src={info.url} alt="농장사진"/>
              </StyledImageWrap>
              <StyledContent>
                <StyledTitleWrap>
                  <h5
                    style={{
                      textDecoration 
                      : reserve.status === '예약취소' 
                      ? 'line-through' 
                      : 'none'}}>
                        {info.name}
                  </h5>
                  <StyledStatusLabel>
                    {reserve.status}
                  </StyledStatusLabel>
                </StyledTitleWrap>
                <p>날짜: {info.date}</p>
                <p>체험시간: {start_time} -  {end_time}</p>
                <p>인원: {reserve.personnel}명</p>
                <p>결제금액 : {(reserve.total_price).toLocaleString()}원</p>
              </StyledContent>
            </StyledListInner>
            <div>
              <ConfirmButton
                name={index} 
                onClick={(e)=> {
                setDataIndex(e.target.name)
                dispatch(showModal())}}>
                더보기
              </ConfirmButton>
                {(reserve.status === '체험완료' && reserve.review === undefined) &&
                  <ConfirmButton>
                    <Link to={`/writereview/${reserve.id}`}>
                      후기작성
                    </Link>
                  </ConfirmButton>
                }
                {(reserve.status === '예약대기' || reserve.status === '예약완료')
                  && <ConfirmButton 
                  name={index}
                  onClick={(e)=> {
                    setDataIndex(e.target.name);
                    setCanclePage(prev =>!prev);
                    dispatch(closeModal());
                  }}
                  reject
                  >
                  예약취소
               </ConfirmButton>
              }
            </div>
          </StyledList>
          )
        })}
        {modalOpen && <ModalContainer><DetailReservation /></ModalContainer>}
      </>  
    );
  };

  const DetailReservation = () => {
    const filterDataArr = [filteredData[dataIndex]];
    
    return (
      <>
        {filterDataArr.map(reservation => {
          const {info, reserve} = reservation || {};
          const start_time = info.start_time.slice(0,5);
          const end_time = info.end_time.slice(0,5);
          return <div key={`${dataIndex}`-`${info.id}`}>
            {!canclePage 
              ? (<div>
                    <StyledTitleWrap>
                      <StyledImageWrap>
                        <img src={info.url} alt="농장사진"/>
                      </StyledImageWrap>
                      <div>
                        <h4 style={{
                          textDecoration : reserve.status === '예약취소' 
                          ? 'line-through' 
                          : 'none'}}>
                            {info.name}({reserve.status})
                        </h4> 
                        <p>{info.date}</p>
                      </div>
                  </StyledTitleWrap>
                    <div>
                      <p>예약정보</p>
                      <StyledContentWrap>
                        <div>
                          <p>날짜: {info.date}</p>
                          <p>시간: {start_time}-{end_time}</p>
                          <p>인원: {reserve.personnel}명</p>
                        </div>
                        <Location location={info.address}/>
                      </StyledContentWrap>
                      <div>
                        <div>
                          <p>결제수단</p>
                          <p>{reserve.payment === 'card' && '카드결제'}</p>
                        </div>
                        <div>
                          <p>결제금액: {reserve.total_price.toLocaleString()}원</p>
                        </div>
                      </div>
                    </div>
                    {(reserve.status === "예약완료" || reserve.status === "예약대기") 
                    && <button 
                      onClick={() => {
                        dispatch(closeModal());
                        setCanclePage(prev =>!prev);
                      }}> 
                        예약취소
                      </button>
                    }
                  </div>) 
                : <canclePage />
              }
            </div>
          })}
      </>
    )
  }

  const cancleResevationHandler = async(e) => {
    const id = e.target.name;
    try {
      await userApi.patch(`//localhost:3500/api/reserve/${id}`, {
        status: '예약취소',
      }); 
      dispatch(closeModal());
      getReservationData();
      setCanclePage(prev =>!prev);
    } catch (err) {
      console.log(err.response.data.Error)
    }
  }

  const CancleReservationPage = () => {
    const filterDataArr = [filteredData[dataIndex]];

    return (
      <>
      {filterDataArr.map(reservation => {
        const {info, reserve} = reservation || {};
        const start_time = info.start_time.slice(0,5);
        const end_time = info.end_time.slice(0,5);
        return (
         <div key={`${dataIndex}-${info.id}`}>
          <p>{info.name}</p>
          <p>{info.description}</p>
          <p>{info.date}</p>
          <p>{start_time}-{end_time}</p>
          <p>인원{reserve.personnel}명</p>
          <p>취소사유</p>
          <p>최종환불금액: {reserve.total_price.toLocaleString()}</p>
          <button onClick={() => setCanclePage(prev =>!prev)}>이전</button>
          <button onClick={() => dispatch(showModal())}>예약취소</button>
          {modalOpen && <ModalContainer w="25%" h="20%" overflow="hidden">
            예약을 취소하시겠습니까?
            <button name={reserve.id} onClick={(e) => cancleResevationHandler(e)}>취소하기</button>
            <button onClick={() => dispatch(closeModal())}>이전</button>
          </ModalContainer>}
        </div>
      )}
    )} 
    </>   
    )
  }

  return (
    <>
    <ShowDefault/>
    {!canclePage ? <ShowResrvation /> : <CancleReservationPage/>}
    </>
  )
}

export default MyReservationTable;