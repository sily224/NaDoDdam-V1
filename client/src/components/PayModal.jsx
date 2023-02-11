import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { closeModal } from '../store/ModalSlice';
import { useDispatch } from 'react-redux';
import { StyledSubTitle, StyledParagraph } from '../styles/Styled';

const ModalDiv = styled.div`
	height: 100%;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	margin-top: 1rem;
`;

const ModalTittle = styled(StyledSubTitle)`
	margin-bottom: 30px;
`;

const ModalBtn = styled.button`
	border: 1px black solid;
	border-radius: 10px;
	color: black;
	font-weight: 500;
	background-color: white;
	width: 120px;
	height: 40px;
	margin: 10px 0;
`;

const PaySuccessModal = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	return (
		<ModalDiv>
			<ModalTittle>결제완료</ModalTittle>
			<ModalBtn
				onClick={() => {
					dispatch(closeModal());
					navigate(`/`);
				}}
			>
				확인
			</ModalBtn>
			<ModalBtn
				onClick={() => {
					dispatch(closeModal());
					navigate(`/mypage/reservation`);
				}}
			>
				구매내역 보기
			</ModalBtn>
		</ModalDiv>
	);
};

const PayFailModal = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	return (
		<ModalDiv>
			<ModalTittle>결제실패</ModalTittle>
			<StyledParagraph>체험 인원 초과로 예약이 실패되었습니다</StyledParagraph>
			<StyledParagraph>다른 시간대로 예약해주세요</StyledParagraph>
			<ModalBtn
				type="button"
				onClick={() => {
					dispatch(closeModal());
					navigate(-1);
				}}
			>
				확인
			</ModalBtn>
		</ModalDiv>
	);
};
export { PaySuccessModal, PayFailModal };
