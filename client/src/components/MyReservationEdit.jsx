import { useState } from "react";
import ModalContainer from '../components/Modal';
import { showModal } from '../store/ModalSlice';
import { useDispatch, useSelector } from 'react-redux';
import { StyledList, StyledListInner,StyledImageWrap } from "../pages/MyReservation";

const MyReservationEdit = ({filterdData}) => {
  const [dataIndex, setReservationDataIndex] = useState();
  const [cancleReservation, setCancleReservation] = useState(false);
  const dispatch = useDispatch();
  const modalOpen = useSelector((state) => state.modal.modal);

  const DetailReservation = () => {
    let data = [filterdData[dataIndex]];

    return (
      <>
      {modalOpen ? <ModalContainer>
        {data.map(item => {return <>
        {!cancleReservation ? (
          <div key={dataIndex}>
          <div>
          <div>농장이미지</div>
          <div>
            <p>농장명/체험명</p>
            <p>{item.data}</p>
          </div>
        </div>
        <div>
          <p>예약정보</p>
          <div>
            <div>
              <p>날짜</p>
              <p>{item.data}</p>
              <p>시간</p>
              <p>14:00</p>
              <p>인원</p>
              <p>{item.personnel}명</p>
            </div>
            {/* <p><Location/></p> */}
          </div>
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
        {item.status === "예약완료" ? <button onClick={() => setCancleReservation(prev =>!prev)}>예약취소</button> : null}
        </div>
        ) : (
          <div key={dataIndex}>
            <p>예약번호</p>
            <p>예약자</p>
            <p>{item.date}</p>
            <p>인원{item.personnel}명</p>
            <p>취소사유</p>
            <p>최종환불금액: {item.total_price}</p>
  
          </div>
        )}
        </>
        })}
      </ModalContainer>
     : setCancleReservation(false) 
    }
      </>
    )
  }

    return (
        <>
        {filterdData.map((item , index) => { return (
            <StyledList key={index}>
            <StyledListInner>
            <StyledImageWrap>농장이미지</StyledImageWrap>
            <div>
                <div>
                <h3>농장명 / 체험명</h3> 
                <div>{item.status}</div> 
                </div>
                <div>{item.data}</div>
                <div>{item.personnel}명</div>
                <div>결제금액 : {(item.total_price).toLocaleString()}원</div>
            </div>
            </StyledListInner>
        <div>
            <button name={index} onClick={(e)=> {
              setReservationDataIndex(e.target.name)
              dispatch(showModal())
            }}>더보기</button>
            <button>예약취소</button>
        </div>
        </StyledList>)})}
        <DetailReservation/>
        </>
    )
}

export default MyReservationEdit;