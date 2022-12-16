import React, { useState,useEffect,useContext } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css'; // css import
import { DetailContext } from "../pages/DetailPage"

const ReactCalender = () => {
<<<<<<< HEAD
    const {detailData : data} = useContext(DetailContext);
=======
    const { detailData : data } = useContext(DetailContext);
>>>>>>> 6ab9594a01e054a966bb724b0e69b7b5384baf0c
    const [start,end] = data.period;
    const [value, onChange] = useState(new Date(start));
    
    useEffect(() => {
        console.log(value)
    },[value]);

    return (
        <div>
            <Calendar calendarType="US" onChange={onChange} value={value} minDate={new Date(start)} maxDate = {new Date(end)}/>
        </div>
    );
};
export default React.memo(ReactCalender);