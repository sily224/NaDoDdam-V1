import { useState, useEffect, useContext } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getHeadCount, getTotalPrice } from '../store/FormSlice';
import { useNavigate } from 'react-router-dom';
import { DetailContext } from '../pages/DetailPage';
import styled from 'styled-components';
import {StyledParagraph, SubmitButton} from '../styles/Styled'

const Form = styled.form`
	width: 70%;
	height: 270px;
	padding: 8% 8%;
	margin-top : 5%;
	border: 1px solid black;
	top: 40%;
	position: sticky;
	border-radius: 15px;
`;
const SubmitBtn = styled(SubmitButton)`
	margin: 15% 0 5%;
	width: 100%;
	background-color: #83d644;
`;
const SelectBox = styled.select``;
const Hr = styled.hr`
	margin : 5% 0 ;
`
const FloatingForm = () => {
	const {farmData} = useContext(DetailContext);
	const {name, id} = farmData;
	const [headCount, setHeadCount] = useState('none');
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
		if(headCount==='none'){alert('인원을 선택하세요'); return;} 
		
		navigate('/pay', {
			state: {
				farmId : id,
				timeId : timeId,
				date : date,
				farm: name,
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
				<StyledParagraph>{date||'날짜를 선택하세요'}</StyledParagraph>
				<StyledParagraph>{startTime || '시작시간'}~{endTime || '종료시간'}</StyledParagraph>
				<StyledParagraph>{price}원/명</StyledParagraph>

				<SelectBox onChange={handleHeadCount} value={headCount}>
					<option value='none'>=선택=</option>

					{personnel && [...Array(personnel).keys()].map((n) => (
						<option key={`HeadCount-${n + 1}`} value={ n + 1 }>
							{ n + 1 }
						</option>
					))}
				</SelectBox>
				<span>명</span>
				<br />
				<SubmitBtn type='submit'>예약하기</SubmitBtn>
				<Hr />
				<StyledParagraph>결제금액 : {totalPrice || 0}원</StyledParagraph>
			</Form>
		</>
	);
};

export default FloatingForm;
