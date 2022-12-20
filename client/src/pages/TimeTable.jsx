import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { showModal } from '../store/ModalSlice';
import ModalContainer from './../components/Modal';
import FarmFormat from '../components/FarmFormat';
import Calender from '../components/ReactCalender';
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
const DayBtns = () =>{
    const dayKor = ['월','화','수','목','금','토','일'];
    const dayEng = ['mon','tue','wed','thr','fri','sar','sun'];
    return (
        <div>
            {
                dayKor.map((day,idx)=> {return <button value={dayEng[idx]} key={dayEng[idx]}>{day}</button>})
            }
        </div>
    )
}
const TimeTable = ()=>{
    const [timeTable, setTimeTable] = useState([]);
    const [timeList, setTimeList] = useState([]);

    const [startCalenderOpen, setStartCalenderOpen] = useState(false);
    const [endCalenderOpen, setEndCalenderOpen] = useState(false);

    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

    const [startTime, setStartTime] = useState('');
    const [endTime, setEndTime] = useState('');

    const dispatch = useDispatch();
    const modalOpen = useSelector((state) => state.modal.modal);

    const date = useSelector((state) => state.form.date);


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
    const createTime = () =>{
        setTimeList([...timeList, [startTime,endTime]]);
    }
    const delTime = (e) =>{
        const idx = e.target.value;
        timeList.splice(idx,1);
        setTimeList([...timeList]);
        console.log(timeList);
    }
    const renderTime = () =>{
        return (
        <div>{
            timeList.map((time,idx) => { return (
                                    <div key={`${time[0]}-${time[1]}-${idx}`}>
                                        <button onClick={delTime} value={idx}>-</button>
                                        <li>{idx+1}타임  {time[0]} : {time[1]}</li>
                                    </div>)}  
            )}    
        </div>);
    };
    const handleStartTime = (e) =>{
        setStartTime(e.target.value);
    };

    const handleEndTime = (e) =>{
        setEndTime(e.target.value);
    };

    useEffect (() => {
        fetchData();
    }, []);

    useEffect (() => {
        setStartDate(date);
    },[startCalenderOpen]);

    useEffect (() => {
        setEndDate(date);
    },[endCalenderOpen]);
    
    useEffect (() => {
        renderTime();
    },[timeList]);

    return (
        <>
        <FarmFormat>
            { timeTable && <button onClick = {() => dispatch(showModal())}>추가하기</button>}
        </FarmFormat>

        { modalOpen && <ModalContainer>
                <div>
                    <h1>체험시간표</h1>
                    <div>
                        <h3>체험 날짜</h3>
                        <CalenderContainer>
                            <CalenderContent>
                                <button onClick={()=>setStartCalenderOpen(!startCalenderOpen)}>시작날짜</button>
                                {
                                    startCalenderOpen ? <Calender period={{start : new Date()}} create/> : null
                                }
                                <p>{!startCalenderOpen && startDate}</p>
                            </CalenderContent>
                            <CalenderContent>
                                <button  onClick={()=>setEndCalenderOpen(!endCalenderOpen)}>마감날짜</button>
                                {
                                    endCalenderOpen ? <Calender period={{start : new Date(startDate)}} create/> : null
                                }
                                <p>{!endCalenderOpen && endDate}</p>
                            </CalenderContent>
                        </CalenderContainer>
                    </div>
                    <div>
                        <h3>체험 요일</h3>
                        <DayBtns />
                    </div>
                    <div>
                        <h3>체험 시간</h3>
                        <button type='button' onClick={createTime}>+</button>
                        <label>시작시간</label><input type='time' value={startTime} onChange={handleStartTime}/>
                        <label>끝나는시간</label><input type='time' value={endTime} onChange={handleEndTime}/>
                        
                        <div>
                            {/* 렌더링 순서가 이상함 
                                { timeList && timeList.map((time,idx) => { return (
                                    <div key={`${time[0]}-${time[1]}-${idx}`}>
                                        <button onClick={delTime} value={idx}>-</button>
                                        <li>{idx+1}타임  {time[0]} : {time[1]}</li>
                                    </div>
                                    )})       
                                }*/
                                renderTime()    
                            }
                        </div>
                        
                    </div>
                    <div>
                        <h3>체험 비용</h3>
                        <input type='text' placeholder='입력하세요'></input>
                    </div>
                    <button type='submit'>추가하기</button>
                </div>
            </ModalContainer>
        }
        </>
    )
}

export default TimeTable;