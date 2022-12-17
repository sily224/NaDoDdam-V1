import React, { useState,useEffect,useContext } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { getDate } from "../store/FormStore";
import { DetailContext } from "../pages/DetailPage"
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css'; // css import


const ReactCalender = () => {
    const {detailData : data} = useContext(DetailContext);
    const [start,end] = data.period;

    const [value, setValue] = useState(new Date());
    const dispatch = useDispatch();
    const stateValue = useSelector(state=>state.date);

    useEffect(() => {
        console.log(value);
        dispatch(getDate(value.toString()));
    },[value]);

    return (
        <>
        {/* <p>{stateValue}</p> */}
        <div>
            <Calendar calendarType="US" onChange={setValue} value={value} minDate={new Date(start)} maxDate={new Date(end)}/>
        </div>
        </>
    );
};
export default ReactCalender;