import { useState, useEffect} from "react";
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Select from 'react-select';
import styled from 'styled-components';
import { showModal } from '../store/ModalSlice';
import { closeModal } from '../store/ModalSlice';
import ModalContainer from '../components/Modal';
import { StyledList, StyledListInner,StyledImageWrap, StyledNavWrapper } from "../pages/MyReservation";
import Location from '../components/Location';
import { getToken } from '../utils/utils';
import * as userApi from "../lib/userApi";

const StyledTitleWrap = styled.div`
  display:flex;
`

const StyledContentWrap = styled.div`
  display:flex;
  justify-content:space-between;
`
const optionList = [
  { value: 'threeMonth', label: '지난 3개월' },
  { value: 'sixMonth', label: '지난 6개월' },
  { value: 'oneYear', label: '지난 1년' }
]


const MyReservationEdit = () => {
  const [reservationData, setReservationData] = useState([]);
  const [filterdData, setfilterdData] =useState([]);
  const [dataIndex, setReservationDataIndex] = useState();
  const [cancleReservation, setCancleReservation] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const modalOpen = useSelector((state) => state.modal.modal);
  const tabList = ["전체", "예약대기", "예약완료", "예약취소", "체험완료"];

  const getReservationData = async () => {
    const token = getToken();
    const res = await userApi.get(`//localhost:3500/api/reserve`, {
      headers: {
        authorization: token,
      },
    });
    setReservationData(res);
    setfilterdData(res.data)
  };

  console.log(reservationData)

  useEffect(() => {
    getReservationData();
  },[]);

  const  filterData= (e) => {
    const type = e.target.name;
    const filterdData = reservationData.filter(item => item.status === type);

    type !== "전체" 
    ? setfilterdData(filterdData)
    : setfilterdData(reservationData);
  }

  const ShowDefault = () => {
    return <>
    <h1>예약조회</h1>
      <StyledNavWrapper>
      <div>
        {tabList.map((item) => (
          <button key={item} name={item} onClick={filterData}>{item}</button>
        ))}
      </div>
      <Select 
      defaultValue={optionList[0]}
      // onChange ={setTimeValue}
      options={optionList}/>
      </StyledNavWrapper>
    </>
  }

  const ShowResrvation = () => {
    return (<>
      {filterdData.map((item , index) => { 
        const date = item.createdAt.split("T")[0];
        const time = item.createdAt.slice(11, 16);
        return (
          <StyledList key={index}>
            <StyledListInner>
              <StyledImageWrap>농장이미지</StyledImageWrap>
              <div>
                <div>
                  <h3 style={{
                    textDecoration : item.status === '예약취소' 
                    ? 'line-through' 
                    : 'none'}}>
                      농장명 / 체험명
                      <span>{item.status}</span>
                  </h3> 
                </div>
                <div>날짜: {date} 체험시간: {time}</div>
                <div>인원: {item.personnel}명</div>
                <div>결제금액 : {(item.total_price).toLocaleString()}원</div>
              </div>
            </StyledListInner>
            <div>
              <button 
              name={index} 
              onClick={(e)=> {
              setReservationDataIndex(e.target.name)
              dispatch(showModal())}}>
                더보기
              </button>
              {item.status === "예약완료" || "예약대기"
              ? <button 
                  name={index}
                  onClick={(e)=> {
                    setReservationDataIndex(e.target.name)
                    setCancleReservation(prev =>!prev)
                  }}>예약취소</button> 
              : item.status === '체험완료' 
              ? <button>후기작성</button> 
              : null}
            </div>
          </StyledList>
          )
        })}
    </>  
    )
  }

  const CancleReservation = () => {
    const filterDataArr = [filterdData[dataIndex]];
    return (
      <>
      {filterDataArr.map(item => (
         <div key={dataIndex}>
          <p>{item.id}</p>
          <p>{item.name}</p>
          <p>{item.createdAt}</p>
          <p>인원{item.personnel}명</p>
          <p>취소사유</p>
          <p>최종환불금액: {item.total_price}</p>
          <button onClick={() => setCancleReservation(prev =>!prev)}>이전</button>
        </div>
      )
    )} 
    </>   
    )
  }
  
  const DetailReservation = () => {
    const filterDataArr = [filterdData[dataIndex]];
    
    return (
      <>
        {filterDataArr.map(item => {
          return <div key={`${dataIndex}`-`${item.id}`}>
            {!cancleReservation 
              ? (<div>
                    <StyledTitleWrap>
                      <div>농장이미지</div>
                      <div>
                        <h4 style={{
                          textDecoration : item.status === '예약취소' 
                          ? 'line-through' 
                          : 'none'}}>
                            농장명 / 체험명({item.status})
                        </h4> 
                        <p>{item.data}</p>
                      </div>
                  </StyledTitleWrap>
                    <div>
                      <p>예약정보</p>
                      <StyledContentWrap>
                        <div>
                          <p>날짜</p>
                          <p>{item.data}</p>
                          <p>시간</p>
                          <p>14:00</p>
                          <p>인원</p>
                          <p>{item.personnel}명</p>
                        </div>
                        <Location location='충청남도 보령시 남포면 농장길 194-61'/>
                      </StyledContentWrap>
                      <div>
                        <div>
                          <p>결제수단</p>
                          <p>결제수단</p>
                        </div>
                        <div>
                          <p>결제금액</p>
                          <p>{item.total_price}</p>
                        </div>
                      </div>
                    </div>
                    {item.status === ("예약완료" || "예약대기")
                    ? <button 
                      onClick={() => {
                        setCancleReservation(prev =>!prev)
                        dispatch(closeModal())
                      }}
                      > 
                        예약취소
                      </button> 
                    : null}
                  </div>) 
                : <CancleReservation />
              }
            </div>
          })}
      </>
    )
  }



  return (
    <>
    {!cancleReservation 
    ? <><ShowDefault/>
      <ShowResrvation />
      </>
    : <CancleReservation/>}
    {modalOpen && <ModalContainer><DetailReservation /></ModalContainer>}
      
    </>
  )
}

export default MyReservationEdit;