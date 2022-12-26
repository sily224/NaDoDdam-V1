import React from 'react';
import styled from 'styled-components';
import FarmFormat from '../components/FarmFormat';
import axios from 'axios';
import { useState, useEffect } from 'react';
import ModalContainer from './../components/Modal';
import { useDispatch, useSelector } from 'react-redux';
import { showModal } from '../store/ModalSlice';
import * as API from '../lib/userApi';

const Subject = styled.h2`
	text-align: center;
	margin-top: 7%;
`;

const ReviewBox = styled.div`
	display: flex;
	position: relative;
	flex-direction: column;
	margin-bottom: 3rem;
	border: solid 1px #d9d9d9;
	border-radius: 10px;
	width: 100%;
	padding: 1rem;
`;

const InfoWrapper = styled.div``;
const Info = styled.p``;

const InfoText = styled.p`
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
	width: 15rem;
	height: 20px;
`;

const InfoTextInMadal = styled.div``;

const Button = styled.button`
	position: absolute;
	top: 1rem;
	right: 1rem;
`;

const FarmReview = () => {
	const dispatch = useDispatch();
	const modalOpen = useSelector((state) => state.modal.modal);
	const [data, setdata] = useState('');
	const [selectData, setSelectData] = useState('');

	const fetchData = async () => {
		try {
			await API.get('//localhost:3500/api/review/farmer').then((res) => {
				let fixedData = res.data.map(({ review, reserve }) => {
					return {
						id: review.id,
						date: `${reserve.date} ${reserve.start_time.slice(
							0,
							5,
						)}-${reserve.end_time.slice(0, 5)}`,
						people: '4',
						createDate: `${review.createdAt.slice(
							0,
							10,
						)} ${review.createdAt.slice(11, 16)}`,
						content: review.content,
					};
				});
				setdata(fixedData);
			});
		} catch (err) {
			console.log(err);
		}
	};

	const onClickBtn = (e) => {
		const temp = data.filter((obj) => obj.id === parseInt(e.target.name))[0];
		setSelectData(temp);
		dispatch(showModal());
	};

	useEffect(() => {
		fetchData();
	}, []);

	return (
		<>
			<FarmFormat>
				<Subject>후기 관리</Subject>
				{data &&
					data.map((review) => {
						return (
							<ReviewBox key={review.id}>
								<InfoWrapper>
									<Info>작성일: {review.createDate}</Info>
									<Info>예약일: {review.date}</Info>
									<Info>인원: 4명</Info>
								</InfoWrapper>
								<InfoText>{review.content}</InfoText>
								<Button name={review.id} onClick={(e) => onClickBtn(e)}>
									더보기
								</Button>
							</ReviewBox>
						);
					})}
				{modalOpen && (
					<ModalContainer>
						<InfoWrapper>
							<Info>작성일: {selectData.createDate}</Info>
							<Info>예약일: {selectData.date}</Info>
							<Info>인원: {selectData.people}명</Info>
							<InfoText>{selectData.content}</InfoText>
						</InfoWrapper>
						<InfoTextInMadal></InfoTextInMadal>
					</ModalContainer>
				)}
			</FarmFormat>
		</>
	);
};

export default FarmReview;
