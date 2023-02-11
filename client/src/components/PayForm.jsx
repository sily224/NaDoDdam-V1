import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RiErrorWarningLine } from 'react-icons/ri';
import styled from 'styled-components';
import { Accordion, Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import * as userApi from '../lib/userApi';
import { showModal, closeModal } from '../store/ModalSlice';
import { yellow } from '../global-variables';
import {
	SubmitButton,
	ConfirmButton,
	DeleteButton,
	Input,
	StyledSubTitle,
	StyledParagraph,
} from '../styles/Styled';

const ContextDiv = styled.div`
	flex-direction: column;
	justify-content: center;
	width: 40%;
`;

const Box = styled.div`
	width: 100%;
	border-radius: 10px;
	overflow: hidden;
	justify-content: center;
	padding: 10px;
	transition: all 0.3s cubic-bezier(0.42, 0, 0.58, 1);

	&:hover {
		box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
		transform: translateY(-10px);
	}
`;

const FlexStartDiv = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: flex-start;
	align-items: center;
	margin: 20px, 0;
	div {
		margin: 5px;
	}
`;

const TextDiv = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
	margin: 20px, 0;
	div {
		margin: 5px;
	}
`;

const RowDiv = styled.div`
	display: flex;
	flex-direction: row;
`;

const SideBarDiv = styled.div`
	background: ${yellow};
	width: 250px;
	border-radius: 10%;
	padding: 20px;
	margin-left: 0.5rem;
`;

const ButtonDiv = styled.div`
	display: flex;
	justify-content: flex-end;
	width: 100%;
`;

const Tittle = styled.p`
	font-weight: 700;
	margin-right: 1rem;
`;

const Inp = styled(Input)`
	margin-bottom: 5px;
`;

const Line = styled.div`
	content: '  ';
	display: block;
	width: 100%;
	height: 0.5px;
	background-color: #808080;
	margin: 2% 0;
`;

const GreenBtn = styled(SubmitButton)`
	margin-top: 0;
	padding: 1rem;
`;

const YellowBtn = styled(ConfirmButton)`
	margin-top: 0;
	padding: 0.8rem;
`;

const ConfirmBtn = styled(DeleteButton)`
	margin-top: 0;
	padding: 10px;
`;

const PayForm = ({ payData, userData, setPaySuccess }) => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const [paymentMethod, setPaymentMethod] = useState('card');
	const [nameOpen, setNameOpen] = useState(false);
	const [name, setName] = useState(userData.name);
	const [phoneNumberOpen, setPhoneNumberOpen] = useState(false);
	const [phoneNumber, setPhoneNumber] = useState(userData.phoneNum);
	const [emailOpen, setEmailOpen] = useState(false);
	const [email, setEmail] = useState(userData.email);
	const [resData, setResData] = useState([]);
	const [personnel, setPersonnel] = useState(0);

	useEffect(() => {
		setName(userData.name);
		setPhoneNumber(userData.phoneNum);
		setEmail(userData.email);
	}, [userData]);

	const handlePayment = async () => {
		getReserveData();
	};

	const getReserveData = async () => {
		try {
			const res = await userApi.get(`/api/timetables/${payData.farmId}`);
			const resData = await res.data;
			// console.log(resData);
			setResData(resData);
			for (let i = 0; i < resData.length; i++) {
				if (resData[i].id === payData.timeId) {
					setPersonnel(resData[i].personnel);
				}
			}
		} catch (e) {
			console.log(e);
		}
	};

	const postData = async (e) => {
		try {
			const reqData = await userApi.post(`/api/reserve`, {
				total_price: payData.totalPrice,
				payment: paymentMethod,
				name: name,
				phoneNum: phoneNumber,
				email: email,
				personnel: payData.headCount,
				time_id: payData.timeId,
			});
			// console.log(reqData);
		} catch (e) {
			console.log(e);
		}
	};

	useEffect(() => {
		if (payData.headCount <= personnel) {
			postData();
			setPaySuccess(true);
			dispatch(showModal());
		} else if (payData.headCount > personnel) {
			dispatch(showModal());
		}
	}, [resData]);

	const handlePaymentMethod = (e) => {
		setPaymentMethod(e.target.value);
	};

	return (
		<>
			<ContextDiv>
				<Box>
					<StyledSubTitle>예약 정보</StyledSubTitle>
					<FlexStartDiv>
						<Tittle>날짜</Tittle>
						<StyledParagraph>{payData.date}</StyledParagraph>
					</FlexStartDiv>
					<FlexStartDiv>
						<Tittle>시간</Tittle>
						<StyledParagraph>
							{payData.startTime} ~ {payData.endTime}
						</StyledParagraph>
					</FlexStartDiv>
					<FlexStartDiv>
						<Tittle>인원</Tittle>
						<StyledParagraph>{payData.headCount}명</StyledParagraph>
					</FlexStartDiv>
					<ButtonDiv>
						<GreenBtn onClick={() => navigate(-1)}>예약정보수정</GreenBtn>
					</ButtonDiv>
				</Box>
				<Box>
					<StyledSubTitle>예약자 정보</StyledSubTitle>
					<Tittle>예약자</Tittle>
					<TextDiv>
						{nameOpen ? (
							<Input
								type="text"
								value={userData.name}
								onChange={(e) => setName(e.target.value)}
							/>
						) : (
							<StyledParagraph>{userData.name}</StyledParagraph>
						)}
						{nameOpen ? (
							<YellowBtn onClick={() => setNameOpen(!nameOpen)}>완료</YellowBtn>
						) : (
							<YellowBtn onClick={() => setNameOpen(!nameOpen)}>수정</YellowBtn>
						)}
					</TextDiv>
					<Tittle>연락처</Tittle>
					<TextDiv>
						{phoneNumberOpen ? (
							<Input
								type="text"
								value={userData.phoneNum}
								onChange={(e) => setPhoneNumber(e.target.value)}
							/>
						) : (
							<StyledParagraph>{userData.phoneNum}</StyledParagraph>
						)}
						{phoneNumberOpen ? (
							<YellowBtn onClick={() => setPhoneNumberOpen(!phoneNumberOpen)}>
								완료
							</YellowBtn>
						) : (
							<YellowBtn onClick={() => setPhoneNumberOpen(!phoneNumberOpen)}>
								수정
							</YellowBtn>
						)}
					</TextDiv>
					<Tittle>이메일</Tittle>
					<TextDiv>
						{emailOpen ? (
							<Input
								type="text"
								value={userData.email}
								onChange={(e) => setEmail(e.target.value)}
							/>
						) : (
							<StyledParagraph>{userData.email}</StyledParagraph>
						)}
						{emailOpen ? (
							<YellowBtn onClick={() => setEmailOpen(!emailOpen)}>
								완료
							</YellowBtn>
						) : (
							<YellowBtn onClick={() => setEmailOpen(!emailOpen)}>
								수정
							</YellowBtn>
						)}
					</TextDiv>
					<RowDiv>
						<div>
							<RiErrorWarningLine size="20" />
						</div>
						<StyledParagraph>
							입력하신 예약자 정보로 결제 및 예약관련 정보가 발송됩니다.
						</StyledParagraph>
					</RowDiv>
				</Box>
				<Box>
					<TextDiv>
						<StyledSubTitle>결제 수단</StyledSubTitle>
						<Form.Select
							onChange={handlePaymentMethod}
							value={paymentMethod}
							style={{ width: '200px' }}
						>
							<option value="card" key="card">
								카드결제
							</option>
							<option value="transfer" key="transfer">
								계좌이체
							</option>
						</Form.Select>
					</TextDiv>
					<Accordion
						style={{
							width: '100%',
							justifyContent: 'center',
							marginTop: '10px',
						}}
					>
						<Accordion.Item eventKey="0">
							<Accordion.Header>
								<Tittle>정보제공 수집 및 제공 동의</Tittle>
							</Accordion.Header>
							<Accordion.Body>
								<StyledParagraph>
									예약 서비스 이용을 위한 개인정보 수집 및 제3자 제공, 취소/환불
									규정에 동의합니다.
								</StyledParagraph>
							</Accordion.Body>
						</Accordion.Item>
						<Accordion.Item eventKey="1">
							<Accordion.Header>
								<Tittle>환불 정책 동의</Tittle>
							</Accordion.Header>
							<Accordion.Body>
								<StyledParagraph>
									체험 특성상 7일 전부터 취소가 불가합니다.그 이후에는 취소
									시점에 따라 환불액이 결정됩니다.
									<br />
									<br /> *취소 및 환불 규정*
									<br />
									예약일로부터 7일 전 : 100% 환불
									<br />
									예약일로부터 3일 전 : 50% 환불
									<br />
									예약일로부터 1일 전 : 환불 불가
								</StyledParagraph>
							</Accordion.Body>
						</Accordion.Item>
					</Accordion>
					<Line />
					<RowDiv>
						<div>
							<RiErrorWarningLine size="20" />
						</div>
						<StyledParagraph>
							주문 내용을 확인하였으며, 위 내용에 동의합니다.
						</StyledParagraph>
					</RowDiv>
				</Box>
				<ButtonDiv>
					<ConfirmBtn onClick={handlePayment}>확인 및 결제</ConfirmBtn>
				</ButtonDiv>
			</ContextDiv>
		</>
	);
};

const SideBar = ({ payData }) => {
	return (
		<SideBarDiv>
			<StyledSubTitle>{payData.farm}</StyledSubTitle>
			<Tittle>요금 세부정보</Tittle>
			<StyledParagraph>1인 체험권</StyledParagraph>
			<TextDiv>
				<StyledParagraph>
					{payData.price ? payData.price.toLocaleString('ko-KR') : 0}원 X
					{payData.headCount}
				</StyledParagraph>
				<StyledParagraph>
					{payData.totalPrice ? payData.totalPrice.toLocaleString('ko-KR') : 0}
					원
				</StyledParagraph>
			</TextDiv>
			<Line />
			<TextDiv>
				<StyledSubTitle>결제 예정 금액</StyledSubTitle>
				<StyledSubTitle>
					{payData.totalPrice ? payData.totalPrice.toLocaleString('ko-KR') : 0}
					원
				</StyledSubTitle>
			</TextDiv>
		</SideBarDiv>
	);
};
export { PayForm, SideBar };
