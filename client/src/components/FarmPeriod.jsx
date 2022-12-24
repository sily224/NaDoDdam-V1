import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { initDate } from "../store/FormSlice";
import Calender from '../components/ReactCalender';
import styled from 'styled-components';


const CalenderContainer = styled.div`
    display : flex;
    justify-content : center;
`;
const CalenderContent = styled.div`
    display : block;
    width: 100%;
    text-align : center;
`;
const StartCalenderContent = styled.div``;
const EndCalenderContent = styled.div``;

//memo 지혜 : period (체험운영기간)
const FarmPeriod = (props) =>{

    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [startCalenderOpen, setStartCalenderOpen] = useState(false);
    const [endCalenderOpen, setEndCalenderOpen] = useState(false);
    const dispatch = useDispatch();

    const date = useSelector((state) => state.form.date);
    
    useEffect (() => {
        setStartDate(date);
    },[startCalenderOpen]);

    useEffect (() => {
        setEndDate(date);
    },[endCalenderOpen]);

    useEffect (() => {
        //memo 지혜 : 상위 컴포넌트로 startDate전달
        props.onStateLiftining({startDate:startDate});
        dispatch(initDate());
    },[startDate]);

    useEffect (() => {
        //memo 지혜 : 상위 컴포넌트로 endDate전달
        props.onStateLiftining({endDate:endDate});
        dispatch(initDate());
    },[endDate]);

    const handleEndCalenderOpen =()=>{
        // memo 지혜 : 시작날 선택전 마지막날 선택하는 것을 막음
        if(startDate===''){alert('시작날짜를 먼저 정해주세요.');return;}
        setEndCalenderOpen(!endCalenderOpen)
    }

    return (        
        <CalenderContainer>
            <CalenderContent>
                <StartCalenderContent>
                    <button type='button' onClick={()=>setStartCalenderOpen(!startCalenderOpen)}>시작날짜</button>
                    {
                        startCalenderOpen ? <Calender period={{start : new Date()}} create/> : null
                    }
                    <p>{!startCalenderOpen && startDate}</p>
                </StartCalenderContent>
            </CalenderContent>
            <CalenderContent>
                <EndCalenderContent>
                    <button  type='button' onClick={()=>handleEndCalenderOpen()}>마감날짜</button>
                    {
                        endCalenderOpen ? <Calender period={{start : new Date(startDate)}} create/> : null
                    }
                    <p>{!endCalenderOpen && endDate}</p>
                </EndCalenderContent>
            </CalenderContent>
        </CalenderContainer>
    )
};

export default FarmPeriod;