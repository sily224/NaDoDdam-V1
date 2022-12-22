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

const Subject = styled.h2`
	text-align: center;
	margin-top: 7%;
	margin-bottom: 3%;
`;
const TimeTableList = styled.div`
    border:1px black solid;
    padding 15px;
    margin-bottom: 20px;
    margin-left: 3%;
`;
const Img = styled.img`
    margin-right: 20px;
`;
const TimTableContent = styled.div`
    display:block
    width: 100%;
`; 
const TimTableItem = styled.div`
    display:flex;
`;
const AddTimTable = styled.button`
    display:block;
    margin-left:auto;
    margin-bottom:10px;
`;
const TimeTableButtons = styled.div`
    display:flex;
    flex-direction:column;
    margin-left:auto;
`;
const TimeTableButton =styled.button`
    :not(:last-child) {
        margin-bottom:10px;
    }
`;
//period (체험운영기간)
const FarmPeriod = (props) =>{
    //시작날
    const [startDate, setStartDate] = useState('');
    //마지막날
    const [endDate, setEndDate] = useState('');
    //시작날을 정하는 캘린더 open
    const [startCalenderOpen, setStartCalenderOpen] = useState(false);
    //마지막날을 정하는 캘린더 open
    const [endCalenderOpen, setEndCalenderOpen] = useState(false);
    //캘린더 날짜 선택시 그 값을 store에 저장해둠. 그것을 꺼내는 코드임
    const date = useSelector((state) => state.form.date);
    
    useEffect (() => {
        setStartDate(date);
    },[startCalenderOpen]);

    useEffect (() => {
        setEndDate(date);
    },[endCalenderOpen]);

    useEffect (() => {
        //상위 컴포넌트로 startDate전달
        props.onStateLiftining({startDate:startDate});
    },[startDate]);

    useEffect (() => {
        //상위 컴포넌트로 endDate전달
        props.onStateLiftining({endDate:endDate});
    },[endDate]);

    // 시작날 선택전 마지막날 선택하는 것을 막음
    const onHandleEndCalenderOpen =()=>{
        if(startDate===''){alert('시작날짜를 먼저 정해주세요.');return;}
        setEndCalenderOpen(!endCalenderOpen)
    }
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
                <button  onClick={()=>onHandleEndCalenderOpen()}>마감날짜</button>
                {
                    endCalenderOpen ? <Calender period={{start : new Date(startDate)}} create/> : null
                }
                <p>{!endCalenderOpen && endDate}</p>
            </EndCalenderContent>
        </CalenderContent>
    </CalenderContainer>
    )
};

// Time
const FarmTime = (props) =>{
    // 전체 타임 목록
    const [timeList, setTimeList] = useState([]);
    // 시작타임
    const [startTime, setStartTime] = useState('');
    // 끝나는타임
    const [endTime, setEndTime] = useState('');
    // 한 타임에서 체험할 시간 
    const [forTime, setForTime] = useState('');
    // 최대인원수
    const [maxHeadCount, setMaxHeadCount] = useState(0);
    // 각 타임별 최대인원수
    const [maxHeadCountList, setMaxHeadCountList] = useState([]);

    // 타임리스트를 그려주는 함수
    const renderTime = () =>{
        return (
        <div>
            {
            timeList.map((time,idx) => { 
                return (
                    <div key={`${time.startTime}-${time.endTime}-${idx}`}>
                        <button onClick={onDelTime} value={idx}>-</button>
                        <li>{idx+1}타임  {time.startTime} ~ {time.endTime} {maxHeadCountList[idx]}명</li>
                    </div>
                )
            })  
        }    
        </div>);
    };

    // 타임 생성함수
    const onCreateTime = () =>{
        //시작타임 입력없이 생성을 할 수 없다
        if(!isNaN(startTime)){alert('Please enter start time');return;}
        //인원을 1이상 입력해야한다.
        if(maxHeadCount<1){alert('Please enter headCount');return;}
        //한 타임에서 체험할 시간은 1이상으로 입력해야한다.
        if(forTime<1){alert('Please enter forTime');return;}

        for (let i=0; i<timeList.length; i++){
            // 등록하고자하는 startTime이 타임리스트의 타임에서 엔드타임보다 작다면
            // 중복된 시간이 존재한다는 것이므로 리턴하여 이를 방지한다.
            if(timeList[i].endTime > startTime){
                alert('Please enter correct forTime');return;
            }
        }
        // 타임리스트에 추가한다.
        setTimeList([...timeList, {startTime: startTime, endTime:endTime}]);
        // 인원리스트에 추가한다.
        setMaxHeadCountList([...maxHeadCountList,maxHeadCount]);
    };

    // 타임 삭제함수
    const onDelTime = (e) =>{
        const idx = e.target.value;
        // 타임리스트의 idx에 해당하는 원소를 하나 삭제
        timeList.splice(idx,1);
        setTimeList([...timeList]);

        //인원리스트의 idx에 해당하는 원소를 하나 삭제
        maxHeadCountList.splice(idx,1);
        setMaxHeadCountList([...maxHeadCountList]);
    };

    const handleStartTime = (e) =>{
        setStartTime(e.target.value);
    };
    const handleMaxHeadCount = (e)=>{
        setMaxHeadCount(e.target.value);
    }

    // startTime변경시 endTime를 set시켜주는 사이드이펙트
    useEffect(() => {
        const [hour,min] = startTime.split(':');      
        // endTime = startTime + forTime시간
        // 문자열이므로 split하여 시간에만 forTime 더해 endTime를 set한다.
        setEndTime([parseInt(hour)+parseInt(forTime),min].join(':'));
    },[startTime]);

    // timeList변경시 사이드이펙트
    useEffect (() => {
        // 타임리스트를 상위 컴포넌트로 전달해주는 기능
        props.onStateLiftining({'timeList':timeList});

        // 하나이상의 타임이 등록되면 forTime를 변경하지 못하게 함
        // formTime이 변경되면 체험시간(ex. 2시간, 6시간)이 달라져도 같은 금액으로 측정되기때문
        const formTimeInput = document.getElementById('forTime');
        timeList.length >0 ? formTimeInput.readOnly = true : formTimeInput.readOnly = false;
        // 타임리스트 렌더링
        renderTime();
    },[timeList]);

    useEffect (() => {
        props.onStateLiftining({maxHeadCountList:maxHeadCountList});
    },[maxHeadCountList]);

    return (
        <>
        { timeList &&
            <>
                <div style={{display:'flex'}}>
                    <div>
                        <label>시간</label>
                        <input type='text' id='forTime' placeholder='체험시간을 입력하세요' value={forTime} onChange={(e)=>setForTime(e.target.value)}/>
                    </div>
                    <div>
                        <label>시작시각</label>
                        <input type='time'  value={startTime} onChange={handleStartTime}/>
                    </div>
                    <div>
                        <label>인원</label>
                        <input style={{width:'40px'}} type='text' placeholder='인원' value={maxHeadCount} onChange={handleMaxHeadCount} ></input>
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


//TimeTable
const TimeTable = ()=>{
    const [timeTable, setTimeTable] = useState([]);
    const [postData, setPostData] = useState({});
    const [cost, setCost] = useState(0);
    const dispatch = useDispatch();
    const modalOpen = useSelector((state) => state.modal.modal);

    const fetchData = async () => {
        try {
            await axios.get('/timetable.json').then((res) => {
                console.log(res.data);
                setTimeTable(res.data);
            });
        }
        catch(e){
            console.log(e);
        }
    };

    const stateLiftining = state => {
        console.log(state);
        setPostData({...postData,...state});
    }
    
    const handleSubmit = (e) =>{   
        e.preventDefault();
        console.log({...postData,cost});
    };

    const onTimeTableDelete = (idx) => {
        timeTable.splice(idx,1);
        setTimeTable([...timeTable]);
        // 삭제 요청api
    };

    const onTimeTableUpdate = (e)=>{
        dispatch(showModal())
    };

    useEffect (() => {
        fetchData();
    }, []);

    
    return (
        <>
        <FarmFormat>
            
            <Subject>체험시간표</Subject>
            <AddTimTable onClick = {() => dispatch(showModal())}>추가하기</AddTimTable>
            { timeTable && 
                    timeTable.map((table,idx) =>{

                        return(
                            <TimeTableList>
                                <h4>체험테이블{idx+1}</h4>
                                <TimTableItem>
                                    <Img alt='농장이미지'></Img>
                                    <TimTableContent>
                                        <div>
                                            <span>기간 : </span>
                                            <span>{`${table.period[0]} ~ ${table.period[1]}`}</span>
                                        </div>
                                        <div>
                                            <span>시간 : </span>
                                            {
                                                table.time.map( (t) =>{
                                                    return <span>{`${t[0]}~${t[1]}  `}</span> 
                                                })
                                            }
                                        </div>
                                        
                                        <div>
                                            <span>가격 : </span>
                                            <span>{table.price}</span>  
                                        </div>
                                            
                                        <div>
                                            <span>인원수 : </span>
                                            {
                                                table.maxHeadCount.map( (t) =>{
                                                    return <span>{t}명   </span>
                                                })
                                            }
                                        </div>
                                </TimTableContent>
                                <TimeTableButtons>
                                    <TimeTableButton onClick={()=>onTimeTableUpdate(idx)}>수정</TimeTableButton>
                                    <TimeTableButton onClick={()=>onTimeTableDelete(idx)}>삭제</TimeTableButton>
                                </TimeTableButtons>
                                </TimTableItem>
                            </TimeTableList>
                        )
                    })
            }
        </FarmFormat>

        { modalOpen && <ModalContainer>
                <form onSubmit={handleSubmit}>
                    <h1>체험시간표</h1>
                    <div>
                        <h3>체험 날짜</h3>
                        <FarmPeriod onStateLiftining ={stateLiftining}/>  
                    </div>

                    <div>
                        <h3>체험 시간</h3>
                        <FarmTime onStateLiftining={stateLiftining}></FarmTime>
                        
                    </div>
                    <div>
                        <h3>체험 비용</h3>
                        <input type='text' placeholder='입력하세요' value={cost} onChange={(e)=>setCost(e.target.value)}></input>
                    </div>
                    <button type='submit'>추가하기</button>
                </form>
            </ModalContainer>
        }
        </>
    )
}

export default TimeTable;