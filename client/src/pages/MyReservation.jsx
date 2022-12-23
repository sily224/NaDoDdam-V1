import styled from "styled-components";
import { useState } from 'react';
import axios from 'axios';
import { useEffect } from 'react';
import MyReservationEdit from "../components/MyReservationEdit";
import Select from 'react-select';

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

const optionList = [
  { value: 'threeMonth', label: '지난 3개월' },
  { value: 'sixMonth', label: '지난 6개월' },
  { value: 'oneYear', label: '지난 1년' }
]


const MyReservation = () => {
  const [reservationData, setReservationData] = useState([]);
  const [filterdData, setfilterdData] =useState([]);
  const [dateFiltered, setDateFiltered] = useState(new Date());
  const [timeValue, setTimeValue] = useState('');
 
  const getReservationData = async() => {
    await axios.get("/reservationData.json").then((res) => {
      setReservationData(res.data.reservation);
      setfilterdData(res.data.reservation);
    });
  };

  useEffect(() => {
    getReservationData();
  },[]);

  const tabList = ["전체", "예약완료", "예약취소", "체험완료"];

  const  filterData= (e) => {
    const type = e.target.name;
    const filterdData = reservationData.filter(item => item.status === type);

    type !== "전체" 
    ? setfilterdData(filterdData)
    : setfilterdData(reservationData);
  }

  const dateFilterData = () => {
    const setValue = timeValue.value;
   
    if(setValue === 'threeMonth'){
      const today = new Date();
      const newDay = new Date();

      console.log(today.getDate() - 90)
      // return setStartDate(newDay.setDate(today.getDate() - 90 ))
      // setDateFiltered(reservationData.filter(item => item.data)
    }

  }

  return (
    <>
      <h1>예약조회</h1>
      <StyledNavWrapper>
      <div>
        {tabList.map((item) => (
          <button key={item} name={item} onClick={filterData}>{item}</button>
        ))}
      </div>
      <Select 
      defaultValue={optionList[0]}
      onChange ={setTimeValue}
      options={optionList}/>
      </StyledNavWrapper>
      <MyReservationEdit filterdData={filterdData}/>
      
    </>
    )
}

export {StyledList, StyledListInner, StyledImageWrap, MyReservation };