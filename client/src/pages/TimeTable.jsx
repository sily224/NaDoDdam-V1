import React, { useState, useEffect } from 'react';
import ModalContainer from './../components/Modal';
import { useDispatch, useSelector } from 'react-redux';
import { showModal } from '../store/ModalSlice';
import FarmFormat from '../components/FarmFormat';
import axios from 'axios';
import Calender from '../components/ReactCalender';

const TimeTable = ()=>{
    const [table, setTable] = useState([]);

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

    useEffect (() => {
        fetchData();
    }, []);

    const showCalender = () => {

        
    }

    return (
        <>
        
        <FarmFormat>
            { table && <button onClick = {() => dispatch(showModal())}>추가하기</button>}
        </FarmFormat>

        { modalOpen && <ModalContainer>
                <h1>체험시간표</h1>
                <div>
                    <h3>체험 날짜</h3>
                    <button>시작날짜</button>
                    <button>마감날짜</button>
                </div>
                <div><h3>체험 날짜</h3></div>
                <div><h3>체험 시간</h3></div>
                <div><h3>체험 비용</h3></div>
            </ModalContainer>
        }
        </>
    )
}

export default TimeTable;