import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { showModal, closeModal } from '../store/ModalSlice';
import { initDate } from '../store/FormSlice';
import ModalContainer from '../components/Modal'
import FarmPeriod from '../components/FarmPeriod';
import FarmFormat from '../components/FarmFormat';
import FarmTime from '../components/FarmTime';
import Pagination from '../components/Pagination';
import styled from 'styled-components';

import * as userApi from '../lib/userApi';

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
const FarmImg = styled.img`
    margin-right: 20px;
    width: 20%;
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
const H3 = styled.h3`
    margin : 30px 0 10px;
    font-size : 1.3rem;
`;
const SubmitBtn = styled.button`
    margin-top : 20px;
`;
const FailAnnouncement = styled.p`
	text-align: center;
	margin-top: 5rem;
`;



//memo 지혜 : TimeTable
const TimeTable = ()=>{
    const [timeTable, setTimeTable] = useState([]);
    const [postData, setPostData] = useState({});
    const [maxHeadCount, setMaxHeadCount] = useState([]);
    const [cost, setCost] = useState('');
    const [page, setPage] = useState(1);
    
    const dispatch = useDispatch();
    const modalOpen = useSelector((state) => state.modal.modal);

    const fetchData = async () => {
        try {
            await userApi.get('http://localhost:3500/api/timetables/owner').then((res) => {
                console.log(res.data);
                setTimeTable([...res.data]);
            });
        }
        catch(e){
            console.log(e);
        }
    };
    
    const getHeadCount = state =>{
        setMaxHeadCount([...maxHeadCount,...state]);
    }

    const stateLiftining = state => {
        setPostData({...postData,...state});
    }

    const handleSubmit = async(e) =>{   
        e.preventDefault();
        console.log(postData.timeList);
        if(postData.timeList.length < 1 || cost < 1 ||!postData.startDate || !postData.endDate) {
            alert('모든 값을 올바르게 기입해주세요');
            return;
        };
        
        const d1 = new Date(postData.startDate);
        const d2 = new Date(postData.endDate);
        const {timeList} = postData;

        let diffDate = d1.getTime() - d2.getTime();
        diffDate = Math.abs(diffDate /(1000*60*60*24));

        for (let i = 0; i < diffDate + 1 ; i++ ){
            const date = `${d1.getFullYear()}-${d1.getMonth() + 1}-${d1.getDate()+i}`;
            
            for (let j = 0; j< timeList[0].length -1;j++){
                const start_time = timeList[j][0];
                const end_time = timeList[j][1];
                const personnel = maxHeadCount[j];

                try {
                    const res = await userApi.post('http://localhost:3500/api/timetables',{
                        'date': date,
                        'personnel':personnel,
                        'price':cost,
                        'start_time':start_time,
                        'end_time':end_time
                    });
                    console.log(res);
                }
                catch(e){
                    console.log(e);
                }
            }
        }
        alert('체험시간표 등록완료');
        dispatch(closeModal());
        dispatch(initDate());
        setCost(0);
        fetchData();
    };

    const onTimeTableDelete = async(id) => {
        await userApi.delete(`http://localhost:3500/api/timetables/${id}`);
        fetchData();
    };

    const onTimeTableUpdate = (id)=>{
        dispatch(showModal());


        // axios.put(`http://localhost:3500/api/timetables/${idx}`,{


        // });
    };

    useEffect (() => {
        fetchData();
    }, []);

    
    return (
        <>
        <FarmFormat>
            
            <Subject>체험시간표</Subject>
            <AddTimTable type='button' onClick = {() => dispatch(showModal())}>추가하기</AddTimTable>
            <Pagination total={timeTable.length} limit={5} page={page} setPage={setPage}/>

            { timeTable.length < 1 ? <FailAnnouncement>체험시간표를 추가하세요</FailAnnouncement> : 
                    timeTable.map((table,idx) =>{
                        return(
                            <TimeTableList key={idx}>
                                <h4>체험테이블{idx+1}</h4>
                                <TimTableItem>
                                    <FarmImg src={table.farm? table.farm.url:''} alt='농장이미지'></FarmImg>
                                    <TimTableContent>
                                        <div>
                                            <span>날짜 : </span>
                                            <span>{table.date}</span>
                                        </div>
                                        <div>
                                            <span>시작시간 : </span>
                                            <span>{table.start_time}</span>
                                        </div>

                                        <div>
                                            <span>끝나는시간 : </span>
                                            <span>{table.end_time}</span>
                                        </div>
                                        
                                        <div>
                                            <span>가격 : </span>
                                            <span>{table.price}</span>  
                                        </div>
                                            
                                        <div>
                                            <span>인원수 : </span>
                                            <span>{table.personnel}</span>
                                        </div>
                                    </TimTableContent>
                                    <TimeTableButtons>
                                        <TimeTableButton type='button' onClick={()=>onTimeTableUpdate(table.id)}>수정</TimeTableButton>
                                        <TimeTableButton type='button' onClick={()=>onTimeTableDelete(table.id)}>삭제</TimeTableButton>
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
                        <H3>체험 날짜</H3>
                        <FarmPeriod onStateLiftining ={stateLiftining}/>  
                    </div>

                    <div>
                        <H3>체험 시간</H3>
                        <FarmTime onStateLiftining={stateLiftining} getHeadCount={getHeadCount}></FarmTime>
                        
                    </div>
                    <div>
                        <H3>체험 비용</H3>
                        <input type='text' placeholder='체험비용을 입력하세요' value={cost} onChange={(e)=>setCost(e.target.value)}></input>
                    </div>
                    <SubmitBtn type='submit'>추가하기</SubmitBtn>
                </form>
            </ModalContainer>
        }
        </>
    )
}

export default TimeTable;