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
`

const StyledListInner = styled.div`
  display:flex;
  align-items: center;
    
`

const StyledImageWrap = styled.div`
  border: 1px solid #000;
  width: 150px;
  height: 150px;
  margin-right: 20px;

  >img {
    width: 100%;
  }
`
const optionList = [
  { value: '지난 3개월', label: '지난 3개월' },
  { value: '지난 6개월', label: '지난 6개월' },
  { value: '지난 1년', label: '지난 1년' }
]

const MyReservationEdit = () => {
  const [originalData, setOriginalData] = useState([]);
  const [filteredData, setFilteredData] =useState([]);
  const [dataIndex, setDataIndex] = useState();
  const [statusOption , setStatusOption] = useState('전체');
  const [dateOption , setDateOption] = useState('지난 3개월');
  const [cancleReservation, setCancleReservation] = useState(false);
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
      {!cancleReservation 
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
      {filteredData.slice(offset, offset + 10).map((item , index) => { 
        const start_time = item.time.start_time.slice(0,5);
        const end_time = item.time.end_time.slice(0,5);
        return (
          <StyledList key={index}>
            <StyledListInner>
              <StyledImageWrap>
                <img src={item.farm.url} alt="농장사진"/>
              </StyledImageWrap>
              <div>
                <div>
                  <h3 style={{
                    textDecoration : item.reserve.status === '예약취소' 
                    ? 'line-through' 
                    : 'none'}}>
                      {item.farm.name}
                      <span>({item.reserve.status})</span>
                  </h3> 
                </div>
                <p>날짜: {item.time.date}</p>
                <p>체험시간: {start_time} -  {end_time}</p>
                <p>인원: {item.reserve.personnel}명</p>
                <p>결제금액 : {(item.reserve.total_price).toLocaleString()}원</p>
              </div>
            </StyledListInner>
            <div>
              <button 
                name={index} 
                onClick={(e)=> {
                setDataIndex(e.target.name)
                dispatch(showModal())}}>
                더보기
              </button>
                {item.reserve.status === '체험완료' && <button>후기작성</button> }
                {(item.reserve.status === '예약대기' || item.reserve.status === '예약완료')
                  && <button 
                  name={index}
                  onClick={(e)=> {
                    setDataIndex(e.target.name)
                    setCancleReservation(prev =>!prev)
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
        {filterDataArr.map(item => {
          const start_time = item.time.start_time.slice(0,5);
          const end_time = item.time.end_time.slice(0,5);
          return <div key={`${dataIndex}`-`${item.farm.id}`}>
            {!cancleReservation 
              ? (<div>
                    <StyledTitleWrap>
                      <StyledImageWrap>
                        <img src={item.farm.url} alt="농장사진"/>
                      </StyledImageWrap>
                      <div>
                        <h4 style={{
                          textDecoration : item.reserve.status === '예약취소' 
                          ? 'line-through' 
                          : 'none'}}>
                            {item.farm.name}({item.reserve.status})
                        </h4> 
                        <p>{item.time.date}</p>
                      </div>
                  </StyledTitleWrap>
                    <div>
                      <p>예약정보</p>
                      <StyledContentWrap>
                        <div>
                          <p>날짜: {item.time.date}</p>
                          <p>시간: {start_time}-{end_time}</p>
                          <p>인원: {item.reserve.personnel}명</p>
                        </div>
                        <Location location={item.farm.address}/>
                      </StyledContentWrap>
                      <div>
                        <div>
                          <p>결제수단</p>
                          <p>결제수단</p>
                        </div>
                        <div>
                          <p>결제금액: {item.reserve.total_price.toLocaleString()}원</p>
                        </div>
                      </div>
                    </div>
                    {(item.reserve.status === "예약완료" || item.reserve.status === "예약대기") 
                    && <button 
                      onClick={() => {
                        setCancleReservation(prev =>!prev)
                        dispatch(closeModal())
                      }}> 
                        예약취소
                      </button>
                    }
                  </div>) 
                : <CancleReservation />
              }
            </div>
          })}
      </>
    )
  }

  const CancleReservation = () => {
    const filterDataArr = [filteredData[dataIndex]];
    return (
      <>
      {filterDataArr.map(item => {
        const start_time = item.time.start_time.slice(0,5);
        const end_time = item.time.end_time.slice(0,5);
        return (
         <div key={`${dataIndex}-${item.farm.id}`}>
          <p>{item.farm.name}</p>
          <p>{item.farm.description}</p>
          <p>{item.time.date}</p>
          <p>{start_time}-{end_time}</p>
          <p>인원{item.reserve.personnel}명</p>
          <p>취소사유</p>
          <p>최종환불금액: {item.reserve.total_price.toLocaleString()}</p>
          <button onClick={() => setCancleReservation(prev =>!prev)}>이전</button>
        </div>
      )}
    )} 
    </>   
    )
  }

  return (
    <>
    <ShowDefault/>
    {!cancleReservation ? <ShowResrvation />: <CancleReservation/>}
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