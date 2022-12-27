import {useState,useEffect,useContext} from 'react';
import { DetailContext } from '../pages/DetailPage';
import { useDispatch, useSelector } from 'react-redux';
import { getStartTime, getEndTime, getPersonnel, getPrice, getTimeId } from '../store/FormSlice';
import styled from 'styled-components';
import {green,yellow} from '../global-variables';

const TimeButtonContainer = styled.div`
    display:flex;
    flex-direction:column;
    justify-content: flex-start;
    align-items: flex-start;
    flex-wrap: wrap;
    height:100%;
`;
const TimeButton = styled.button`
    width : 100%;
    height : 90px;
    font-size : 1rem;
    background-color : white;
    border : 1px ${green} solid;
    &.active {
        font-size : 1.2rem;
        background-color : ${green};
        color : white;
    }
    &:hover{
        background-color : ${green};
        opacity: 0.5;
    }
`;

const TimeBtns = () =>{
    const [startTimeList, setStartTimeList] = useState([]);
    const [endTimeList, setEndTimeList] =  useState([]);
    const [personnel, setPersonnel] =  useState([]);
    const [price, setPrice] =  useState([]);
    const [timeId, setTimeId] = useState([]);
    const [timeBtnActive, setTimeBtnActive] = useState(null);
    
    const {timeTable} = useContext(DetailContext);
    const date = useSelector((state) => state.form.date);
    const dispatch = useDispatch();
    
    useEffect(() => {
        if(timeTable){
            // 타켓 날짜의 모든 타임내역
            const targetTable = timeTable.filter(table => table.date === date);

            setStartTimeList([...targetTable.map((table)=> table.start_time.slice(0,5))]);
            setEndTimeList([...targetTable.map((table)=> table.end_time.slice(0,5))]);
            setPersonnel([...targetTable.map((table)=> table.personnel)]);
            setPrice([...targetTable.map((table)=> table.price)]);
            setTimeId([...targetTable.map((table)=> table.id)]);
        }
    },[timeTable,date])
    
    useEffect(()=>{
        dispatch(getStartTime(startTimeList[timeBtnActive]));
        dispatch(getEndTime(endTimeList[timeBtnActive]));
        dispatch(getPersonnel(personnel[timeBtnActive]));
        dispatch(getPrice(price[timeBtnActive]));
        dispatch(getTimeId(timeId[timeBtnActive]));
    },[timeBtnActive]);

    const handleTimeSelect = (e) => {
        setTimeBtnActive(e.target.value); //index
    };

    return  startTimeList && startTimeList.map( (start,idx)=>{
        return <TimeButtonContainer key= {`TimeButtonContainer-${idx}`}>
                <TimeButton 
                    key= {`TimeButton-${idx}`}
                    className={'btn' + (idx == timeBtnActive ? ' active' : '')} 
                    value ={idx} onClick={handleTimeSelect}>{`${idx+1}타임  ${start} ~ ${endTimeList[idx]}`}
                </TimeButton>
            </TimeButtonContainer>
    });
};

export default TimeBtns;