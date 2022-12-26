import React, { useState, useEffect, useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getDate } from '../store/FormSlice';
import { DetailContext } from '../pages/DetailPage';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css'; // css import



const IsNotPay = () => {
	const { timeTable } = useContext(DetailContext);
	if (timeTable){
		//memo 지혜 : 타임테이블 하나도 없는 경우
		if (!timeTable.length){
			return [new Date(), new Date()]
		}
		const orderedDate = timeTable.sort((a, b) => new Date(a.date) - new Date(b.date));
		const diffDate = new Date(orderedDate[orderedDate.length - 1].date).getTime() - new Date().getTime();
		const diff = Math.ceil(diffDate /(1000*60*60*24));
		// console.log(diff);

		// memo 지혜 : 오늘날짜보다 체험시간표의 끝 날짜가 더 이르다면 (전부 끝난 체험)
		if(diff < 0){ 
			return [new Date(),new Date()];
		}
		// memo 지혜 : 오늘날짜보다 체험시간표의 끝 날짜가 같다면 (오늘까지 있는체험)
		else if(diff == 0){ 
			return [new Date() , new Date()];
		}
		// 오늘날짜보다 체험시간표의 끝 날짜가 멀다면 (아직 체험이 남아있음)
		else {
			const end =  orderedDate[orderedDate.length - 1].date;
			return [new Date() , new Date(end)];
		}	
	}
};

const ReactCalender = (props) => {

	const [date, setDate] = useState(new Date());
	const dispatch = useDispatch();
	let [min,max] = [new Date(), new Date()]

	if (props.create) {
		min = props.period.start;
		max = null;
	} 
	else {
		const range = IsNotPay();
		if(range){
			min = range[0];
			max = range[1];
		}
	}

	useEffect(() => {
		const dateForm = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
		// console.log(dateForm);
		dispatch(getDate(dateForm));
	}, [date]);

	return (
		<Calendar
			calendarType="US"
			onChange={setDate}
			value={date}
			minDate={min}
			maxDate={max}
		/>
	);
};

export default ReactCalender;
