import React, { useState, useEffect } from 'react';
import styled from 'styled-components';


const TimeConatiner = styled.div`
    display: flex;
    justify-content: flex-start;
`;
const TimeContent = styled.div`
    :not(:last-child) {
        margin-right:10px;
    }
    width: 30%;
`;
const ForTimeInput = styled.input`
    display : block;
    width: 100%;
`;
const StartTimeInput = styled.input`
    display : block;
    width: 100%;
`;
const HeadCountInput = styled.input`
    display : block;
    width: 100%;
`;
const CreateBtn = styled.button`display:block;`;

// memo 지혜 : Time
const FarmTime = (props) =>{
    const [timeList, setTimeList] = useState([]);
    const [startTime, setStartTime] = useState('');
    const [endTime, setEndTime] = useState('');
    const [forTime, setForTime] = useState('');
    const [maxHeadCount, setMaxHeadCount] = useState('');
    const [maxHeadCountList, setMaxHeadCountList] = useState([]);

    const renderTime = () =>{
        return (
        <div>
            {
            timeList.map((time,idx) => { 
                return (
                    <div key={`${time[0]}-${time[1]}-${idx}`}>
                        <button type='button' onClick={onDelTime} value={idx}>-</button>
                        <li>{idx+1}타임  {time[0]} ~ {time[1]} {maxHeadCountList[idx]}명</li>
                    </div>
                )
            })  
        }    
        </div>);
    };


    const onCreateTime = () =>{

        if(!isNaN(startTime)){
            alert('시작시간을 입력해주세요.');
            return;
        }
        if(maxHeadCount<1){
            alert('인원은 1명 이상으로 입력해주세요.');
            return;
        }
        if(forTime<1){
            alert('체험시간은 1시간 이상으로 입력해주세요.');
            return;
        }

        for (let i = 0; i < timeList.length; i++){
            if(timeList[i][1] >= startTime){
                alert('중복된 시간입니다. 다시 입력해주세요.');
                return;
            }
        }

        setTimeList([...timeList, [startTime, endTime]]);
        setMaxHeadCountList([...maxHeadCountList,maxHeadCount]);
    };


    const onDelTime = (e) =>{
        const idx = e.target.value;

        timeList.splice(idx,1);
        maxHeadCountList.splice(idx,1);

        setTimeList([...timeList]);
        setMaxHeadCountList([...maxHeadCountList]);
    };

    const handleStartTime = (e) =>{
        setStartTime(e.target.value);
    };
    
    const handleMaxHeadCount = (e)=>{
        setMaxHeadCount(e.target.value);
    }

    // memo 지혜 : startTime변경시 endTime를 set시켜주는 사이드이펙트
    useEffect(() => {
        let [hour,min] = startTime.split(':');   
        hour = parseInt(hour) + parseInt(forTime);
        setEndTime([ hour > 9 ? hour : `0${hour}` , min].join(':'));
    },[startTime,forTime]);
    
    useEffect(() =>{
        props.LiftingHeadCount(maxHeadCountList);
    },[maxHeadCountList])

    // memo 지혜 : timeList변경시 사이드이펙트
    useEffect (() => {
        //memo 지혜 : 상위 컴포넌트로 timeList전달
        props.onStateLifting({timeList:[...timeList]});

        // memo 지혜 : 하나이상의 타임이 등록되면 forTime를 변경하지 못하게 함
        // formTime이 변경되면 체험시간이 달라져도 같은 금액으로 측정되기때문
        const formTimeInput = document.getElementById('forTime');
        timeList.length >0 ? formTimeInput.readOnly = true : formTimeInput.readOnly = false;
        

        //memo 지혜 : 수정할 경우
        if(props.target!='') {
            const el =   document.getElementById('createBtn');
            if(timeList.length > 0){
                el.disabled = true;
            }else{
                el.disabled = false;
            }
        }
        
        renderTime();
    },[timeList]);

    return (
        <>
        { timeList &&
            <>
                <TimeConatiner>
                    <TimeContent>
                        <label>시간</label>
                        <ForTimeInput type='text' id='forTime' placeholder='체험시간' value={forTime} onChange={(e)=>setForTime(e.target.value)}/>
                    </TimeContent>
                    <TimeContent>
                        <label>시작시각</label>
                        <StartTimeInput type='time' value={startTime} onChange={handleStartTime}/>
                    </TimeContent>
                    <TimeContent>
                        <label>인원</label>
                        <HeadCountInput type='text' placeholder='인원' value={maxHeadCount} onChange={handleMaxHeadCount} />
                    </TimeContent>

                    <TimeContent>
                        <label>추가</label>
                        <CreateBtn id='createBtn' type='button' onClick={onCreateTime} >+</CreateBtn>
                    </TimeContent>
                </TimeConatiner>   
                <div>
                    {renderTime()}
                </div>
            </>
        }
        </>
    )
};

export default FarmTime;