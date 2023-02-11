import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import StickyBox from 'react-sticky-box';
import ScrollToTop from './../components/ScrollTop';
import * as userApi from '../lib/userApi';
import { PaySuccessModal, PayFailModal } from './../components/PayModal';
import { PayForm, SideBar } from './../components/PayForm';
import ModalContainer from './../components/Modal';
import styled from 'styled-components';

const Container = styled.div`
	display: flex;
	justify-content: center;
	align-items: start;
	min-width: 800px;
	width: 100%;
`;

const Payment = () => {
	const location = useLocation();
	const modalOpen = useSelector((state) => state.modal.modal);
	const [payData, setPayData] = useState({});
	const [userData, setUserData] = useState({});
	const [paySuccess, setPaySuccess] = useState(false);

	useEffect(() => {
		setPayData(location.state);
		getUserData();
	}, []);

	const getUserData = async () => {
		try {
			const res = await userApi.get(`/api/myInfo`);
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

	return (
		<>
			<Container>
				<ScrollToTop />
				<PayForm
					payData={payData}
					userData={userData}
					setPaySuccess={setPaySuccess}
				/>
				<StickyBox offsetTop={20} offsetBottom={20}>
					<SideBar payData={payData} />
				</StickyBox>
				{modalOpen && (
					<ModalContainer w="500px" h="280px">
						{paySuccess ? <PaySuccessModal /> : <PayFailModal />}
					</ModalContainer>
				)}
			</Container>
		</>
	);
};

export default Payment;
