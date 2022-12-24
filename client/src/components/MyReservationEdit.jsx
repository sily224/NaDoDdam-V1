import { useState, useEffect} from "react";
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Moment from 'moment';
import styled from 'styled-components';
import { showModal } from '../store/ModalSlice';
import { closeModal } from '../store/ModalSlice';
import ModalContainer from '../components/Modal';
import Location from '../components/Location';
import Pagination from './Pagination';
import { getToken } from '../utils/utils';
import * as userApi from "../lib/userApi";


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

const MyReservationEdit = () => {
  const [originalData, setOriginalData] = useState([]);
  const [filteredData, setFilteredData] =useState([]);
  const [dataIndex, setDataIndex] = useState();
  const [statusOption , setStatusOption] = useState('전체');
  const [dateOption , setDateOption] = useState('지난 3개월');
  const [canclePage, setCanclePage] = useState(false);
  const dispatch = useDispatch();
  const modalOpen = useSelector((state) => state.modal.modal);
  const [page, setPage] = useState(1);
	const offset = (page - 1) * 10;
  const statusList = ["전체", "예약대기", "예약완료", "예약취소", "체험완료"];

  const getReservationData = async () => {
    const token = getToken();
    const res = await userApi.get(`//localhost:3500/api/reserve`, {
      headers: {
        authorization: token,
      },
    });
    setOriginalData(res.data);
    setFilteredData(res.data);
  };

  useEffect(() => {
    getReservationData();
  },[]);

  const  filterData= (e) => {
    let filteredData = [...originalData];
    const today =  Moment().format('YYYY-MM-DD');

    if(statusOption !== "전체" ){
      filteredData = filteredData.filter(item => item.reserve.status === statusOption);
      console.log(statusOption)
    }

    if(dateOption === '지난 3개월'){
      filteredData = filteredData.filter(item => 
        (Moment().subtract('3', 'months').format('YYYY-MM-DD') < item.reserve.createdAt.split("T")[0]) 
        && item.reserve.createdAt.split("T")[0] <= today
        );
    }else if (dateOption === '지난 6개월'){
      filteredData = filteredData.filter(item =>
        (Moment().subtract('6', 'months').format('YYYY-MM-DD') < item.reserve.createdAt.split("T")[0]) 
        && item.reserve.createdAt.split("T")[0] <= today
        );
    }else if(dateOption === '지난 1년'){
      filteredData = filteredData.filter(item => 
        (Moment().subtract('1', 'years').format('YYYY-MM-DD') < item.reserve.createdAt.split("T")[0]) 
        && item.reserve.createdAt.split("T")[0] <= today
        );
    }
    
    setFilteredData(filteredData);
  };

  useEffect(()=> {
    filterData();
  },[statusOption, dateOption])

  const ShowDefault = () => {
    return <>
      {!canclePage 
      ? <>
        <h1>예약조회</h1>
        <StyledNavWrapper>
        <div>
          {statusList.map((status) => (
            <button key={status} onClick={()=>setStatusOption(status)}>{status}</button>
          ))}
        </div>
        <select value={dateOption} onChange={(e) => setDateOption(e.target.value)}>
						<option value="지난 3개월">지난 3개월</option>
						<option value="지난 6개월">지난 6개월</option>
						<option value="지난 1년">지난 1년</option>
				</select>
        </StyledNavWrapper>
      </>
      : <h1>예약취소</h1>
      }
    </>
  };

  const ShowResrvation = () => {
    return (<>
      {filteredData.slice(offset, offset + 10).map((reservation , index) => { 
        const {farm, time, reserve} = reservation;
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
                  <h3 style={{
                  textDecoration : reserve.status === '예약취소' 
                  ? 'line-through' 
                  : 'none'}}>{farm.name}</h3>
                  <span>{reserve.status}</span>
                </StyledTitle>
                <p>날짜: {time.date}</p>
                <p>체험시간: {start_time} -  {end_time}</p>
                <p>인원: {reserve.personnel}명</p>
                <p>결제금액 : {(reserve.total_price).toLocaleString()}원</p>
              </StyledContent>
            </StyledListInner>
            <div>
              <button 
                name={index} 
                onClick={(e)=> {
                setDataIndex(e.target.name)
                dispatch(showModal())}}>
                더보기
              </button>
                {reserve.status === '체험완료' && <button>후기작성</button> }
                {(reserve.status === '예약대기' || reserve.status === '예약완료')
                  && <button 
                  name={index}
                  onClick={(e)=> {
                    setDataIndex(e.target.name)
                    setCanclePage(prev =>!prev)
                  }}>
                  예약취소
               </button>
              }
            </div>
          </StyledList>
          )
        })}
      </>  
    );
  };

  const DetailReservation = () => {
    const filterDataArr = [filteredData[dataIndex]];
    
    return (
      <>
        {filterDataArr.map(reservation => {
          const {farm, time, reserve} = reservation;
          const start_time = time.start_time.slice(0,5);
          const end_time = time.end_time.slice(0,5);
          return <div key={`${dataIndex}`-`${farm.id}`}>
            {!canclePage 
              ? (<div>
                    <StyledTitleWrap>
                      <StyledImageWrap>
                        <img src={farm.url} alt="농장사진"/>
                      </StyledImageWrap>
                      <div>
                        <h4 style={{
                          textDecoration : reserve.status === '예약취소' 
                          ? 'line-through' 
                          : 'none'}}>
                            {farm.name}({reserve.status})
                        </h4> 
                        <p>{time.date}</p>
                      </div>
                  </StyledTitleWrap>
                    <div>
                      <p>예약정보</p>
                      <StyledContentWrap>
                        <div>
                          <p>날짜: {time.date}</p>
                          <p>시간: {start_time}-{end_time}</p>
                          <p>인원: {reserve.personnel}명</p>
                        </div>
                        <Location location={farm.address}/>
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
                        setCanclePage(prev =>!prev)
                        dispatch(closeModal())
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

  const CancleReservationPage = () => {
    const filterDataArr = [filteredData[dataIndex]];

    const cancleResevation = async(e) => {
      const id = e.target.name;
      try {
        await userApi.patch(`//localhost:3500/api/reserve/${id}`, {
          status: '예약취소',
        }); 
        getReservationData();
        setCanclePage(prev =>!prev);
        
      } catch (err) {
        console.log(err.response.data.Error)
      }
    }

    return (
      <>
      {filterDataArr.map(reservation => {
        const {farm, time, reserve} = reservation;
        const start_time = time.start_time.slice(0,5);
        const end_time = time.end_time.slice(0,5);
        return (
         <div key={`${dataIndex}-${farm.id}`}>
          <p>{farm.name}</p>
          <p>{farm.description}</p>
          <p>{time.date}</p>
          <p>{start_time}-{end_time}</p>
          <p>인원{reserve.personnel}명</p>
          <p>취소사유</p>
          <p>최종환불금액: {reserve.total_price.toLocaleString()}</p>
          <button onClick={() => setCanclePage(prev =>!prev)}>이전</button>
          <button name={reserve.id} onClick={(e) => cancleResevation(e)}>예약취소</button>
        </div>
      )}
    )} 
    </>   
    )
  }

  return (
    <>
    <ShowDefault/>
    {!canclePage ? <ShowResrvation />: <CancleReservationPage/>}
    {modalOpen && <ModalContainer><DetailReservation /></ModalContainer>}
    <Pagination
			total={filteredData.length}
			limit={10}
			page={page}
			setPage={setPage}
		/>
    </>
  )
}

export default MyReservationEdit;