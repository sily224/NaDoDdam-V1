import styled from "styled-components";
import { useState } from 'react';
import { useEffect } from 'react';
import MyReservationEdit from "../components/MyReservationEdit";
import { getToken } from '../utils/utils';
import * as userApi from "../lib/userApi";

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
  // const  filterData= (e) => {
  //   const type = e.target.name;
  //   const filterdData = reservationData.filter(item => item.status === type);

  //   type !== "전체" 
  //   ? setfilterdData(filterdData)
  //   : setfilterdData(reservationData);
  // }


  // const dateFilterData = () => {
  //   const setValue = timeValue.value;
   
  //   if(setValue === 'threeMonth'){
  //     const today = new Date();
  //     const newDay = new Date();

  //     console.log(today.getDate() - 90)
  //     // return setStartDate(newDay.setDate(today.getDate() - 90 ))
  //     // setDateFiltered(reservationData.filter(item => item.data)
  //   }

  // }

  return (
    <>
      <MyReservationEdit/>
    </>
    )
}

export {StyledList, StyledListInner, StyledImageWrap, StyledNavWrapper,MyReservation };