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
    const [forTime, setForTime] = useState('');
    const [maxHeadCount, setMaxHeadCount] = useState(0);
    const [maxHeadCountList, setMaxHeadCountList] = useState([]);


    const renderTime = () =>{
        return (
        <div>
            {
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
        if(!isNaN(startTime)){alert("Please enter start time");return;}
        if(maxHeadCount<1){alert("Please enter headCount");return;}
        if(forTime<1){alert("Please enter forTime");return;}
        
        for (var i=0;i<timeList.length;i++){
            if(timeList[i][1] > startTime){
                alert("Please enter correct forTime");return;
            }
        }
        setTimeList([...timeList, [startTime,endTime]]);
        setMaxHeadCountList([...maxHeadCountList,maxHeadCount]);
    };

    const onDelTime = (e) =>{
        const idx = e.target.value;
        timeList.splice(idx,1);
        setTimeList([...timeList]);

        maxHeadCountList.splice(idx,1);
        setMaxHeadCountList([... maxHeadCountList]);
    };

    const handleStartTime = (e) =>{
        setStartTime(e.target.value);
    };
    const handleMaxHeadCount = (e)=>{
        setMaxHeadCount(e.target.value);
    }

    useEffect(() => {
        const [h,m] = startTime.split(":");      
        setEndTime([parseInt(h)+parseInt(forTime),m].join(":"));
    },[startTime]);

    
    useEffect (() => {
        const formTimeInput = document.getElementById('forTime');
        timeList.length >0 ? formTimeInput.readOnly = true : formTimeInput .readOnly = false;
        renderTime();
    },[timeList]);

    return (
        <>
        { timeList &&
            <>
                <div style={{display:"flex"}}>
                    <div>
                        <label>시간</label>
                        <input type="text" id="forTime" placeholder="체험시간을 입력하세요" value={forTime} onChange={(e)=>setForTime(e.target.value)}/>
                    </div>
                    <div>
                        <label>시작시각</label>
                        <input type='time'  value={startTime} onChange={handleStartTime}/>
                    </div>
                    <div>
                        <label>인원</label>
                        <input style={{width:"40px"}} type='text' placeholder='인원' value={maxHeadCount} onChange={handleMaxHeadCount} ></input>
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