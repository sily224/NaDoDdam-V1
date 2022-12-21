import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { showModal } from '../store/ModalSlice';
import ModalContainer from './../components/Modal'
import Calender from '../components/ReactCalender';
import FarmFormat from '../components/FarmFormat';
import styled from 'styled-components';
import axios from 'axios';

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
const DayBtn = styled.button`
    backgroudColor: ${props =>props.isClicked ? 'black' : 'lightgray'};
`;

const FarmPeriod = () =>{
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

    return (        
        <CalenderContainer>
            <CalenderContent>
            <StartCalenderContent>
                <button onClick={()=>setStartCalenderOpen(!startCalenderOpen)}>시작날짜</button>
                {
                    startCalenderOpen ? <Calender period={{start : new Date()}} create/> : null
                }
                <p>{!startCalenderOpen && startDate}</p>
            </StartCalenderContent>
        </CalenderContent>
        <CalenderContent>
            <EndCalenderContent>
                <button  onClick={()=>setEndCalenderOpen(!endCalenderOpen)}>마감날짜</button>
                {
                    endCalenderOpen ? <Calender period={{start : new Date(startDate)}} create/> : null
                }
                <p>{!endCalenderOpen && endDate}</p>
            </EndCalenderContent>
        </CalenderContent>
    </CalenderContainer>
    )
};

const FarmTime = () =>{
    const [timeList, setTimeList] = useState([]);
    const [startTime, setStartTime] = useState('');
    const [endTime, setEndTime] = useState('');
    const [maxHeadCount, setMaxHeadCount] = useState(0);
    const [maxHeadCountList, setMaxHeadCountList] = useState([]);

    const renderTime = () =>{
        return (
        <div>{
            timeList.map((time,idx) => { 
                return (
                    <div key={`${time[0]}-${time[1]}-${idx}`}>
                        <button onClick={onDelTime} value={idx}>-</button>
                        <li>{idx+1}타임  {time[0]} : {time[1]} {maxHeadCountList[idx]}명</li>
                    </div>
                )
            })  
        }    
        </div>);
    };

    const onCreateTime = () =>{
        setTimeList([...timeList, [startTime,endTime]]);
        setMaxHeadCountList([...maxHeadCountList,maxHeadCount]);
    };

    const onDelTime = (e) =>{
        const idx = e.target.value;
        timeList.splice(idx,1);
        maxHeadCountList.splice(idx,1);
        setTimeList([...timeList]);
        setMaxHeadCountList([... maxHeadCountList]);
    };

    const handleStartTime = (e) =>{
        setStartTime(e.target.value);
    };

    const handleEndTime = (e) =>{
        setEndTime(e.target.value);
    };
    const handleMaxHeadCount = (e)=>{
        setMaxHeadCount(e.target.value);
    }
    
    useEffect (() => {
        renderTime();
    },[timeList]);

    return (
        <>
        { timeList &&
            <>
                <div style={{display:"flex"}}>
                    <div >
                        <label>시작시간</label>
                        <input type='time' value={startTime} onChange={handleStartTime}/>
                    </div>
                    <div>
                        <label>끝나는시간</label>
                        <input type='time' value={endTime} onChange={handleEndTime}/>
                    </div>
                    <div>
                        <label>수용인원</label>
                        <input type='text' placeholder='수용인원' value={maxHeadCount} onChange={handleMaxHeadCount} ></input>
                    </div>
                    <div>
                        <label>추가</label>
                        <button type='button' onClick={onCreateTime}>+</button>
                    </div>
                </div>   
                <div>
                    {renderTime()}
                </div>
            </>
        }
        </>
    )
};
const WeekDay = () =>{
    
    const weekDays = ['mon','tue','wed','thr','fri','sar','sun'];
    const [isClicked,setIsClicked] = useState([false,false,false,false,false,false,false]);

    const handleIsClick = (idx) =>{
        isClicked.splice(idx, 1, !isClicked[idx]);
        setIsClicked([...isClicked]);
    };

    useEffect (() => {
        console.log(isClicked);
    },[isClicked]);

    return (
        <>
        {
            weekDays.map((weekday,idx)=> {
                return <button value={idx} key={idx} onClick={() => handleIsClick(idx)}>{weekday}</button>
            })
        }
        </>
    )
};

const TimeTable = ()=>{
    const [timeTable, setTimeTable] = useState([]);


    const dispatch = useDispatch();
    const modalOpen = useSelector((state) => state.modal.modal);

    const fetchData = async () => {
        try {
            await axios.get('/reservation.json').then((res) => {
                // console.log(res.data);
                // setReservation(res.data);
            });
        }
        catch(e){
            console.log(e);
        }
    };

    
    const handleSubmit = (e) =>{   
        e.preventDefault();
        console.log(

            
        );

        // navigate('/pay',{
        //     state : {
        //         시간표id
        //         농장id,
        //         headcount:최대인원
        //         price:price,
        //         period :period,
        //         times : [start,end],
        //     }
        // });
    };

    useEffect (() => {
        fetchData();
    }, []);



    return (
        <>
        <FarmFormat>
            { timeTable && <button onClick = {() => dispatch(showModal())}>추가하기</button>}
        </FarmFormat>

        { modalOpen && <ModalContainer>
                <form onSubmit={handleSubmit}>
                    <h1>체험시간표</h1>
                    <div>
                        <h3>체험 날짜</h3>
                        <FarmPeriod />  
                    </div>
                    <div>
                        <h3>체험 요일</h3>
                        <WeekDay />
                    </div>
                    <div>
                        <h3>체험 시간</h3>
                        <FarmTime></FarmTime>
                        
                    </div>
                    <div>
                        <h3>체험 비용</h3>
                        <input type='text' placeholder='입력하세요'></input>
                    </div>
                    <button type='submit'>추가하기</button>
                </form>
            </ModalContainer>
        }
        </>
    )
}

export default TimeTable;