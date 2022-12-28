import React, { useEffect, useState } from 'react';
import { RiErrorWarningLine } from 'react-icons/ri';
import styled from 'styled-components';
import StickyBox from 'react-sticky-box';
import { useLocation, useNavigate } from 'react-router-dom';
import Accordion from 'react-bootstrap/Accordion';
import 'bootstrap/dist/css/bootstrap.min.css';
import * as userApi from '../lib/userApi';
import ModalContainer from './../components/Modal';
import { showModal, closeModal } from '../store/ModalSlice';
import { useDispatch, useSelector } from 'react-redux';

const MomDiv = styled.div`
	display: flex;
	justify-content: center;
	align-items: start;
	min-width: 800px;
`;

const ContextDiv = styled.div`
	flex-direction: column;
`;

const H1 = styled.h1`
	font-weight: 800;
	margin-bottom: 20px;
`;

const H2 = styled.p`
	font-size: 130%;
	font-weight: 600;
`;

const Button = styled.button``;

const Line = styled.div`
	content: '  ';
	display: block;
	width: 100%;
	height: 0.5px;
	background-color: #808080;
	margin: 5% 0;
`;

const Select = styled.select``;

const Option = styled.option``;

const P = styled.p`
	font-size: 20px;
`;
const Input = styled.input`
	margin: 30px;
`;

const SideBarDiv = styled.div`
	background: #f4d815;
	width: 300px;
	border-radius: 10%;
	padding: 20px;
	margin: 50px;
`;

const ButtonDiv = styled.div`
	display: flex;
	justify-content: flex-end;
`;

const PayboxTop = styled.div`
	display: flex;
	flex-direction: row;
`;

const TextDiv = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: space-between;
`;
const RowDiv = styled.div`
	display: flex;
	flex-direction: row;
`;

const Box = styled.div`
	width: 100%;
	border-radius: 10px;
	overflow: hidden;
	margin: 20px;
	padding: 10px;
	transition: all 0.3s cubic-bezier(0.42, 0, 0.58, 1);

	&:hover {
		box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
		transform: translateY(-10px);
	}
	div {
		margin: 10px;
	}
`;
const ImportInfo = styled.p`
	font-size: 20px;
	font-weight: 600;
`;
const Span = styled.span`
	font-size: 20px;
`;
// 예약정보
const ReservationInfo = ({ payData }) => {
	const navigate = useNavigate();

	return (
		<>
			{payData && (
				<>
					<H1>예약 정보</H1>
					<TextDiv>
						<H2>날짜</H2>
						<ImportInfo>{payData.date}</ImportInfo>
					</TextDiv>
					<TextDiv>
						<H2>시간</H2>
						<ImportInfo>
							{payData.startTime} ~ {payData.endTime}
						</ImportInfo>
					</TextDiv>
					<TextDiv>
						<H2>인원</H2>
						<ImportInfo>{payData.headCount}명</ImportInfo>
					</TextDiv>
					<ButtonDiv>
						<Button onClick={() => navigate(-1)}>예약정보수정</Button>
					</ButtonDiv>
				</>
			)}
		</>
	);
};

//SideBar
const SideBar = ({ payData }) => {
	const { farm, price, headCount, totalPrice } = payData;

	return (
		<>
			{payData && (
				<div>
					<H1>{farm}</H1>
					<H2>요금 세부정보</H2>
					<ImportInfo>1인 체험권</ImportInfo>
					<TextDiv>
						<ImportInfo>
							{price}원 X{headCount}
						</ImportInfo>
						<ImportInfo>{totalPrice || null}</ImportInfo>
					</TextDiv>
					<Line />
					<TextDiv>
						<ImportInfo>결제 예정 금액</ImportInfo>
						<ImportInfo>{totalPrice || null}</ImportInfo>
					</TextDiv>
				</div>
			)}
		</>
	);
};

//결제 수단
const PaymentInfo = () => {
	return (
		<>
			<Accordion>
				<Accordion.Item eventKey="0">
					<Accordion.Header>
						<H2>정보제공 수집 및 제공 동의</H2>
					</Accordion.Header>
					<Accordion.Body>
						<P>
							예약 서비스 이용을 위한 개인정보 수집 및 제3자 제공, 취소/환불
							규정에 동의합니다.
						</P>
					</Accordion.Body>
				</Accordion.Item>
				<Accordion.Item eventKey="1">
					<Accordion.Header>
						<H2>환불 정책 동의</H2>
					</Accordion.Header>
					<Accordion.Body>
						<P>
							체험 특성상 7일 전부터 취소가 불가합니다.그 이후에는 취소 시점에
							따라 환불액이 결정됩니다.
							<br />
							<br /> *취소 및 환불 규정*
							<br />
							예약일로부터 7일 전 : 100% 환불
							<br />
							예약일로부터 3일 전 : 50% 환불
							<br />
							예약일로부터 1일 전 : 환불 불가
						</P>
					</Accordion.Body>
				</Accordion.Item>
			</Accordion>
			<Line />
			<RowDiv>
				<RiErrorWarningLine size="25" />
				<Span>주문 내용을 확인하였으며, 위 내용에 동의합니다.</Span>
			</RowDiv>
		</>
	);
};

const Payment = () => {
	const location = useLocation();
	const modalOpen = useSelector((state) => state.modal.modal);
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const [payData, setPayData] = useState({});
	const [userData, setUserData] = useState({});
	const [selected, setSelected] = useState('card');
	const [nameOpen, setNameOpen] = useState(false);
	const [name, setName] = useState(userData.name);
	const [phoneNumberOpen, setPhoneNumberOpen] = useState(false);
	const [phoneNumber, setPhoneNumber] = useState(userData.phoneNum);
	const [emailOpen, setEmailOpen] = useState(false);
	const [email, setEmail] = useState(userData.email);
	const [resData, setResData] = useState([]);
	const [personnel, setPersonnel] = useState(0);
	const [pay, setPay] = useState(false);

	useEffect(() => {
		setPayData(location.state);
		getUserData();
	}, []);

	useEffect(() => {
		window.scrollTo(0, 0);
	}, [payData]);

	const getUserData = async () => {
		try {
			const res = await userApi.get('//localhost:3500/api/myInfo');
			const userData = await res.data;
			setUserData({
				name: userData.name,
				phoneNum: userData.phoneNum,
				email: userData.email,
			});
		} catch (e) {
			console.log(e);
		}
	};

	const submitHandler = async () => {
		getReserveData();
	};

	const postData = async (e) => {
		try {
			const reserData = await userApi.post(
				'http://localhost:3500/api/reserve',
				{
					total_price: payData.totalPrice,
					payment: selected,
					name: name,
					phoneNum: phoneNumber,
					email: email,
					personnel: payData.headCount,
					time_id: payData.timeId,
				},
			);
		} catch (e) {
			console.log(e);
		}
	};
	useEffect(() => {
		if (payData.headCount <= personnel) {
			postData();
			setPay(true);
			dispatch(showModal());
		} else if (payData.headCount > personnel) {
			// dispatch(showModal());
		}
	}, [resData]);

	const getReserveData = async () => {
		try {
			const res = await userApi.get(
				`http://localhost:3500/api/timetables/${payData.farmId}`,
			);
			const resData = await res.data;
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

	const handleSelect = (e) => {
		setSelected(e.target.value);
	};

	useEffect(() => {
		setName(userData.name);
		setPhoneNumber(userData.phoneNum);
		setEmail(userData.email);
	}, [userData]);

	return (
		<>
			<MomDiv>
				<ContextDiv>
					<Box>
						<ReservationInfo payData={payData}></ReservationInfo>
					</Box>
					<Box>
						<H1>예약자 정보</H1>
						<H2>예약자</H2>
						<TextDiv>
							{nameOpen ? (
								<Input
									type="text"
									value={name}
									onChange={(e) => setName(e.target.value)}
								/>
							) : (
								<ImportInfo>{name}</ImportInfo>
							)}
							{nameOpen ? (
								<Button onClick={() => setNameOpen(!nameOpen)}>완료</Button>
							) : (
								<Button onClick={() => setNameOpen(!nameOpen)}>수정</Button>
							)}
						</TextDiv>
						<H2>연락처</H2>
						<TextDiv>
							{phoneNumberOpen ? (
								<Input
									type="text"
									value={phoneNumber}
									onChange={(e) => setPhoneNumber(e.target.value)}
								/>
							) : (
								<ImportInfo>{phoneNumber}</ImportInfo>
							)}
							{phoneNumberOpen ? (
								<Button onClick={() => setPhoneNumberOpen(!phoneNumberOpen)}>
									완료
								</Button>
							) : (
								<Button onClick={() => setPhoneNumberOpen(!phoneNumberOpen)}>
									수정
								</Button>
							)}
						</TextDiv>
						<H2>이메일</H2>
						<TextDiv>
							{emailOpen ? (
								<Input
									type="text"
									value={email}
									onChange={(e) => setEmail(e.target.value)}
								/>
							) : (
								<ImportInfo>{email}</ImportInfo>
							)}
							{emailOpen ? (
								<Button onClick={() => setEmailOpen(!emailOpen)}>완료</Button>
							) : (
								<Button onClick={() => setEmailOpen(!emailOpen)}>수정</Button>
							)}
						</TextDiv>
						<RowDiv>
							<RiErrorWarningLine size="25" />
							<Span>
								입력하신 예약자 정보로 결제 및 예약관련 정보가 발송됩니다.
							</Span>
						</RowDiv>
					</Box>
					<Box>
						<TextDiv>
							<H1>결제 수단</H1>
							<Select onChange={handleSelect} value={selected}>
								<Option value="card" key="card">
									카드결제
								</Option>
								<Option value="transfer" key="transfer">
									계좌이체
								</Option>
							</Select>
						</TextDiv>
						<PaymentInfo></PaymentInfo>
					</Box>
					<ButtonDiv>
						<Button onClick={submitHandler}>확인 및 결제</Button>
					</ButtonDiv>
				</ContextDiv>
				<StickyBox offsetTop={20} offsetBottom={20}>
					<SideBarDiv>
						<SideBar payData={payData}></SideBar>
					</SideBarDiv>
				</StickyBox>
				{modalOpen && (
					<ModalContainer>
						{pay ? (
							<div>
								<H1>결제완료</H1>
								<Button
									onClick={() => {
										dispatch(closeModal());
										navigate(`/`);
									}}
								>
									확인
								</Button>
								<Button
									onClick={() => {
										dispatch(closeModal());
										navigate(`/myreservation`);
									}}
								>
									구매내역보기
								</Button>
							</div>
						) : (
							<div>
								<H1>결제실패</H1>
								<P>체험 인원 초과로 예약이 실패되었습니다</P>
								<P>다른 시간대로 예약해주세요</P>
								<Button
									type="button"
									onClick={() => {
										dispatch(closeModal());
										navigate(-1);
									}}
								>
									확인
								</Button>
							</div>
						)}
					</ModalContainer>
				)}
			</MomDiv>
		</>
	);
};

export default Payment;
