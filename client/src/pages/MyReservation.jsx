import styled from "styled-components";
import { useState } from 'react';
import axios from 'axios';
import { useEffect } from 'react';
import MyReservationEdit from "../components/MyReservationEdit";

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
`


const MyReservation = () => {
  const [reservationData, setReservationData] = useState([]);
  const [filterdData, setFilter] =useState([]);

  const getReservationData = async() => {
    await axios.get("/reservationData.json").then((res) => {
      setReservationData(res.data.reservation);
      setFilter(res.data.reservation);
    });
  };

  useEffect(() => {
    getReservationData();
  },[]);

  const list = ["전체", "예약완료", "예약취소", "체험완료"];

  const setdList = (e) => {
    let type = e.target.name;
    const filterdData = reservationData.filter(item => item.status === type);
    type !== "전체" ?
    setFilter(filterdData)
    : setFilter(reservationData);
  }

  return (
    <>
      <h1>예약조회</h1>
      <StyledNavWrapper>
      <div>
        {list.map((item) => (
          <button key={item} name={item} onClick={setdList}>{item}</button>
        ))}
      </div>
      <select>
        <option>지난 3개월</option>
        <option>지난 6개월</option>
        <option>지난 1년</option>
      </select>
      </StyledNavWrapper>
      <MyReservationEdit filterdData={filterdData}/>
    </>
    )
}

export {StyledList, StyledListInner, StyledImageWrap, MyReservation };