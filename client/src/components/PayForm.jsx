import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { RiErrorWarningLine } from 'react-icons/ri';
import styled from 'styled-components';
import { Accordion, Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import * as userApi from '../lib/userApi';
import { showModal } from '../store/ModalSlice';
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
					<StyledSubTitle>?????? ??????</StyledSubTitle>
					<FlexStartDiv>
						<Tittle>??????</Tittle>
						<StyledParagraph>{payData.date}</StyledParagraph>
					</FlexStartDiv>
					<FlexStartDiv>
						<Tittle>??????</Tittle>
						<StyledParagraph>
							{payData.startTime} - {payData.endTime}
						</StyledParagraph>
					</FlexStartDiv>
					<FlexStartDiv>
						<Tittle>??????</Tittle>
						<StyledParagraph>{payData.headCount}???</StyledParagraph>
					</FlexStartDiv>
					<ButtonDiv>
						<GreenBtn onClick={() => navigate(-1)}>???????????? ??????</GreenBtn>
					</ButtonDiv>
				</Box>
				<Box>
					<StyledSubTitle>????????? ??????</StyledSubTitle>
					<Tittle>?????????</Tittle>
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
							<YellowBtn onClick={() => setNameOpen(!nameOpen)}>??????</YellowBtn>
						) : (
							<YellowBtn onClick={() => setNameOpen(!nameOpen)}>??????</YellowBtn>
						)}
					</TextDiv>
					<Tittle>?????????</Tittle>
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
								??????
							</YellowBtn>
						) : (
							<YellowBtn onClick={() => setPhoneNumberOpen(!phoneNumberOpen)}>
								??????
							</YellowBtn>
						)}
					</TextDiv>
					<Tittle>?????????</Tittle>
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
								??????
							</YellowBtn>
						) : (
							<YellowBtn onClick={() => setEmailOpen(!emailOpen)}>
								??????
							</YellowBtn>
						)}
					</TextDiv>
					<RowDiv>
						<div>
							<RiErrorWarningLine size="20" />
						</div>
						<StyledParagraph>
							???????????? ????????? ????????? ?????? ??? ???????????? ????????? ???????????????.
						</StyledParagraph>
					</RowDiv>
				</Box>
				<Box>
					<TextDiv>
						<StyledSubTitle>?????? ??????</StyledSubTitle>
						<Form.Select
							onChange={handlePaymentMethod}
							value={paymentMethod}
							style={{ width: '200px' }}
						>
							<option value="card" key="card">
								????????????
							</option>
							<option value="transfer" key="transfer">
								????????????
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
								<Tittle>???????????? ?????? ??? ?????? ??????</Tittle>
							</Accordion.Header>
							<Accordion.Body>
								<StyledParagraph>
									?????? ????????? ????????? ?????? ???????????? ?????? ??? ???3??? ??????, ??????/??????
									????????? ???????????????.
								</StyledParagraph>
							</Accordion.Body>
						</Accordion.Item>
						<Accordion.Item eventKey="1">
							<Accordion.Header>
								<Tittle>?????? ?????? ??????</Tittle>
							</Accordion.Header>
							<Accordion.Body>
								<StyledParagraph>
									?????? ????????? 7??? ????????? ????????? ???????????????.??? ???????????? ??????
									????????? ?????? ???????????? ???????????????.
									<br />
									<br /> *?????? ??? ?????? ??????*
									<br />
									?????????????????? 7??? ??? : 100% ??????
									<br />
									?????????????????? 3??? ??? : 50% ??????
									<br />
									?????????????????? 1??? ??? : ?????? ??????
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
							?????? ????????? ??????????????????, ??? ????????? ???????????????.
						</StyledParagraph>
					</RowDiv>
				</Box>
				<ButtonDiv>
					<ConfirmBtn onClick={handlePayment}>?????? ??? ??????</ConfirmBtn>
				</ButtonDiv>
			</ContextDiv>
		</>
	);
};

const SideBar = ({ payData }) => {
	return (
		<SideBarDiv>
			<StyledSubTitle>{payData.farm}</StyledSubTitle>
			<Tittle>?????? ????????????</Tittle>
			<StyledParagraph>1??? ?????????</StyledParagraph>
			<TextDiv>
				<StyledParagraph>
					{payData.price ? payData.price.toLocaleString('ko-KR') : 0}??? X
					{payData.headCount}
				</StyledParagraph>
				<StyledParagraph>
					{payData.totalPrice ? payData.totalPrice.toLocaleString('ko-KR') : 0}
					???
				</StyledParagraph>
			</TextDiv>
			<Line />
			<TextDiv>
				<StyledSubTitle>?????? ?????? ??????</StyledSubTitle>
				<StyledSubTitle>
					{payData.totalPrice ? payData.totalPrice.toLocaleString('ko-KR') : 0}
					???
				</StyledSubTitle>
			</TextDiv>
		</SideBarDiv>
	);
};
export { PayForm, SideBar };
