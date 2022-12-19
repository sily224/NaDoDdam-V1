import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { RiErrorWarningLine } from 'react-icons/ri';
import styled from 'styled-components';
import StickyBox from 'react-sticky-box';
import Modal from '../components/Modal';
// import ReactCalender from '../components/ReactCalender';
// import TimeBtns from '../components/TimeBtns';

const Context = styled.div``;

const H1 = styled.h1``;

const H2 = styled.h2``;

const H3 = styled.h3``;

const Info = styled.p``;

const NameInfo = styled.p``;

const Button = styled.button``;

const Line = styled.div`
	content: '  ';
	display: block;
	width: 100%;
	height: 0.5px;
	background-color: blue;
	margin: 5% 0;
`;

const Image = styled.img`
	width: 100px;
	height: 100px;
`;

const Select = styled.select``;

const Option = styled.option``;

const P = styled.p``;

const SideBarDiv = styled.div`
	background: grey;
	width: 300px;
`;

const PayboxTop = styled.div`
	display: flex;
	flex-direction: row;
`;

const PayboxName = styled.div`
	display: flex;
	flex-direction: column;
`;

// 예약정보
const ReservationInfo = ({ data }) => {
	const [isEdit, setIsEdit] = useState(false);

	const EditHandler = () => {
		console.log('나와라');
		setIsEdit(!isEdit);
		<Modal>1</Modal>;
	};

	return (
		<>
			<H1>예약 및 결제</H1>
			<H2>예약 정보</H2>
			<H3>날짜</H3>
			<Info>{data.date}</Info>
			<H3>시간</H3>
			<Info>{data.time}</Info>
			<H3>인원</H3>
			<Info>{data.count}</Info>
			<Button onClick={() => EditHandler()}>예약정보수정</Button>
			{/* <ReactCalender></ReactCalender> */}
			{/* <TimeBtns></TimeBtns> */}
			{/* {isEdit ? <ReactCalender></ReactCalender> : null} */}
			<Line />
		</>
	);
};

//SideBar
const SideBar = ({ data }) => {
	const [totalPrice, setTotalPrice] = useState('');

	useEffect(() => {
		const { count, programPrice } = data;
		setTotalPrice(count * programPrice);
	}, [data]);

	return (
		<>
			{data && (
				<div>
					<PayboxTop>
						<Image src={data.img}></Image>
						<PayboxName>
							<NameInfo>{data.farmName}</NameInfo>
							<NameInfo>{data.programName}</NameInfo>
						</PayboxName>
					</PayboxTop>
					<H3>요금 세부정보</H3>
					<NameInfo>1인 체험권</NameInfo>
					<Info>
						{data.programPrice}원 X{data.count}
					</Info>
					<Info>{totalPrice || null}</Info>
					<Line />
					<Info>결제 예정 금액</Info>
					<Info>{totalPrice || null}</Info>
				</div>
			)}
		</>
	);
};

// 예약자 정보
const SubscriberInfo = ({ data }) => {
	const [nameOpen, setNameOpen] = useState(false);
	const [name, setName] = useState(data.name);
	const [phoneNumberOpen, setPhoneNumberOpen] = useState(false);
	const [phoneNumber, setPhoneNumber] = useState(data.phoneNumber);
	const [emailOpen, setEmailOpen] = useState(false);
	const [email, setEmail] = useState(data.email);

	useEffect(() => {
		setName(data.name);
		setPhoneNumber(data.phoneNumber);
		setEmail(data.email);
	}, [data]);

	return (
		<>
			<H2>예약자 정보</H2>
			<H3>예약자</H3>
			{nameOpen ? (
				<input
					type="text"
					value={name}
					onChange={(e) => setName(e.target.value)}
				/>
			) : (
				<Info>{name}</Info>
			)}
			{nameOpen ? (
				<Button onClick={() => setNameOpen(!nameOpen)}>완료</Button>
			) : (
				<Button onClick={() => setNameOpen(!nameOpen)}>수정</Button>
			)}
			<H3>연락처</H3>
			{phoneNumberOpen ? (
				<input
					type="text"
					value={phoneNumber}
					onChange={(e) => setPhoneNumber(e.target.value)}
				/>
			) : (
				<Info>{phoneNumber}</Info>
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
			{emailOpen ? (
				<input
					type="text"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
				/>
			) : (
				<Info>{email}</Info>
			)}
			{emailOpen ? (
				<Button onClick={() => setEmailOpen(!emailOpen)}>완료</Button>
			) : (
				<Button onClick={() => setEmailOpen(!emailOpen)}>수정</Button>
			)}

			<RiErrorWarningLine />
			<P>입력하신 예약자 정보로 결제 및 예약관련 정보가 발송됩니다.</P>
			<Line />
		</>
	);
};

//결제 수단
const PaymentInfo = () => {
	const openHandler = () => {
		// 모달창으로 구현할 예정
		alert(
			'취소 및 환불 규정\n예약일로부터 7일 전 : 100% 환불\n예약일로부터 3일 전 : 50% 환불\n예약일로부터 1일 전 : 환불 불가\n',
		);
	};
	return (
		<>
			<H3>결제 수단</H3>
			<Select name="cardOption">
				<Option value="card">신용카드 또는 체크카드</Option>
			</Select>
			<H3>정보제공 수집 및 제공 동의</H3>
			<P>
				예약 서비스 이용을 위한 개인정보 수집 및 제3자 제공, 취소/환불 규정에
				동의합니다.
			</P>
			<H3>환불 정책 동의</H3>
			<P>
				체험 특성상 7일 전부터 취소가 불가합니다.그 이후에는 취소 시점에 따라
				환불액이 결정됩니다.
			</P>
			<Button
				onClick={() => {
					openHandler();
				}}
			>
				More
			</Button>
			<Line />
			<P>주문 내용을 확인하였으며, 위 내용에 동의합니다.</P>
			<Button>확인 및 결제</Button>
		</>
	);
};

const Payment = () => {
	const [data, setData] = useState('');

	const GetData = async () => {
		try {
			const res = await axios.get('/pay.json');
			const data = await res.data;
			console.log(data);
			setData(data);
		} catch (e) {
			console.log(e);
		}
	};
	useEffect(() => {
		GetData();
	}, []);

	return (
		<>
			<div style={{ display: 'flex', alignItems: 'flex-start' }}>
				<Context>
					<ReservationInfo data={data}></ReservationInfo>
					<SubscriberInfo data={data}></SubscriberInfo>
					<PaymentInfo></PaymentInfo>
				</Context>
				<StickyBox offsetTop={20} offsetBottom={20}>
					<SideBarDiv>
						<SideBar data={data}></SideBar>
					</SideBarDiv>
				</StickyBox>
			</div>
		</>
	);
};

export default Payment;
