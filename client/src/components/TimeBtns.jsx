import {useState,useEffect,useContext} from 'react';
import { DetailContext } from '../pages/DetailPage';
import { useDispatch, useSelector } from 'react-redux';
import { getStartTime,getEndTime } from '../store/FormSlice';
import styled from 'styled-components';


const TimeButton = styled.button`
    display:block;
    width : 100%;
    height : 90px;
    font-size : 1rem;
    background-color : white;
    border : 1px orange solid;
    &.active {
        background-color : orange;
        opacity: 0.5;
        color : white;
    }
`;

const TimeBtns = () =>{
    const [startTimeList, setStartTimeList] = useState([]);
    const [endTimeList, setEndTimeList] =  useState([]);
    const [timeBtnActive, setTimeBtnActive] = useState(0);
    
    const {timeTable} = useContext(DetailContext);
    const date = useSelector((state) => state.form.date);
    const dispatch = useDispatch();
    
    useEffect(() => {
        if(timeTable){
            const targetTable = timeTable.filter(table => table.date === date);
            // console.log(targetTable);

            setStartTimeList([...targetTable.map((table)=> table.start_time)]);
            setEndTimeList([...targetTable.map((table)=> table.end_time)]);
        }
    },[timeTable,date])
    
    useEffect(()=>{
        dispatch(getStartTime(startTimeList[timeBtnActive]));
        dispatch(getEndTime(endTimeList[timeBtnActive]));
    },[timeBtnActive]);

    const handleTimeSelect = (e) => {
        setTimeBtnActive(e.target.value); //index
    };

    return  startTimeList && startTimeList.map( (start,idx)=>{
        return <div key= {`TimeButtonContainer-${idx}`}>
                <TimeButton 
                    key= {`TimeButton-${idx}`}
                    className={'btn' + (idx == timeBtnActive ? ' active' : '')} 
                    value ={idx} onClick={handleTimeSelect}>{`${idx+1}타임  ${start} ${endTimeList[idx]}`}
                </TimeButton>
            </div>
    });
};

export default TimeBtns;