import { useState, useEffect, useContext } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getHeadCount, getTotalPrice } from '../store/FormSlice';
import { useNavigate } from 'react-router-dom';
import { DetailContext } from '../pages/DetailPage';
import styled from 'styled-components';

const Form = styled.form`
	width: 50%;
	height: 200px;
	border: 1px solid black;
	padding: 5%;
	position: sticky;
	top: 20%;
`;
const SelectBox = styled.select``;

const FloatingForm = () => {
	const {farmData} = useContext(DetailContext);

	const [headCount, setHeadCount] = useState("none");
	const [totalPrice, setTotalPrice] = useState(undefined);

	const dispatch = useDispatch();
	const navigate = useNavigate();
	const formData = useSelector(({form}) => form);
	const {startTime, endTime, price, date, personnel, timeId} = formData;

	const handleHeadCount = (e) => {
		setHeadCount(e.target.value);
	};

	const handleSubmit = (e) => {
	// todo 지혜
	// 페이지 이동전, 인원이 초과 되는 지 확인을 위한 get 요청
	// 인원초과 되면 alert창 + return
	// + 동시접속에 대한 확인요청
		e.preventDefault();

		if(!timeId || !date){alert('날짜와 시간을 선택하세요'); return;} 
		if(headCount==="none"){alert('인원을 선택하세요'); return;} 
		

		navigate('/pay', {
			state: {
				id : timeId,
				date : date,
				farm: farmData.name,
				headCount : headCount,
				price: price,
				totalPrice: totalPrice,				
				startTime : startTime,
				endTime : endTime,
			},
		});
	};

	useEffect(() => {
		setTotalPrice(headCount * price);
		dispatch(getHeadCount(headCount));
	}, [headCount]);

	useEffect(() => {
		dispatch(getTotalPrice(totalPrice));
	}, [totalPrice]);

	return (
		<>
			<Form onSubmit={handleSubmit}>
				<p>{date||'날짜를 선택하세요'}</p>
				<p>{startTime || '시작시간'}~{endTime || '종료시간'}</p>
				<p>{price}원/명</p>

				<SelectBox onChange={handleHeadCount} value={headCount}>
					<option value="none">=선택=</option>

					{personnel && [...Array(personnel).keys()].map((n) => (
						<option key={`HeadCount-${n + 1}`} value={ n + 1 }>
							{ n + 1 }
						</option>
					))}
				</SelectBox>
				<span>명</span>
				<button type='submit'>예약하기</button>
				<p>결제금액 : {totalPrice || 0}원</p>
			</Form>
		</>
	);
};

export default FloatingForm;
