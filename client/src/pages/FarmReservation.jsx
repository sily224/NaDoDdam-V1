import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import FarmFormat from '../components/FarmFormat';

const Subject = styled.h2`
	text-align: center;
	margin-top: 7%;
	margin-bottom: 3%;
`;
const FilterWrapper = styled.div`
	display: flex;
	align-items: center;
	margin-bottom: 20px;
`;

const FilterBtn = styled.button`
	width: 5rem;
	margin-right: 0.5rem;
`;

const FilterSelect = styled.select`
	margin-left: auto;
`;

const Table = styled.table`
	width: 100%;
	height: 100%;
	border: 1px solid black;
	border-collapse: collapse;
`;

const Thead = styled.thead``;

const Tr = styled.tr`
	border: 1px solid black;
	padding: 10px;
`;
const Td = styled.td`
	border: 1px solid black;
	padding: 10px;
`;

const BtnTd = styled.td`
	height: 100%;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: space-around;
`;

const Button = styled.button``;

const FarmManagement = () => {
	const [data, setData] = useState(null);
	const [filteredStatus, setFilteredStatus] = useState('전체');
	const [filteredDate, setFilteredDate] = useState('최근순');

	const fetchData = async () => {
		if (filteredStatus === '전체') {
			try {
				await axios.get('/reservation.json').then((res) => {
					console.log(res.data);
					setData(res.data);
				});
			} catch (e) {
				console.log(e);
			}
		}
		if (filteredStatus === '예약대기') {
			try {
				await axios.get('/reservation.json').then((res) => {
					console.log(res.data);
					setData(res.data);
				});
			} catch (e) {
				console.log(e);
			}
		}
		if (filteredStatus === '예약완료') {
			try {
				await axios.get('/reservation.json').then((res) => {
					console.log(res.data);
					setData(res.data);
				});
			} catch (e) {
				console.log(e);
			}
		}
		if (filteredStatus === '예약취소') {
			try {
				await axios.get('/reservation.json').then((res) => {
					console.log(res.data);
					setData(res.data);
				});
			} catch (e) {
				console.log(e);
			}
		}
		if (filteredStatus === '체험완료') {
			// 여기 수정하는 중임
			try {
				await axios.get('/reservation.json').then((res) => {
					console.log(res.data);
					setData(res.data);
				});
			} catch (e) {
				console.log(e);
			}
		}
	};

	useEffect(() => {
		fetchData();
	}, [filteredStatus, filteredDate]);

	return (
		<>
			{data && (
				<FarmFormat>
					<Subject>예약관리</Subject>
					<FilterWrapper>
						<FilterBtn>전체</FilterBtn>
						<FilterBtn>예약대기</FilterBtn>
						<FilterBtn>예약완료</FilterBtn>
						<FilterBtn>예약취소</FilterBtn>
						<FilterBtn>체험완료</FilterBtn>
						<FilterSelect>
							<option>최근순</option>
							<option>오래된순</option>
						</FilterSelect>
					</FilterWrapper>
					<Table>
						<Thead>
							<Tr>
								<Td scope="col">예약번호</Td>
								<Td scope="col">예약자</Td>
								<Td scope="col">예약정보</Td>
								<Td scope="col">결제</Td>
								<Td scope="col">예약상태</Td>
							</Tr>
						</Thead>
						<tbody>
							{data.map((oneReservation) => {
								const { id, user, content, pay, status } = oneReservation;
								return (
									<Tr key={id}>
										<Td>{id}</Td>
										<Td>
											{user.name}
											<br />
											{user.userId}
											<br />
											{user.phone}
										</Td>
										<Td>
											{content.date}
											<br />
											{content.time}
											<br />
											인원: {content.headCount}명
										</Td>
										<Td>
											{pay.cost.toLocaleString('ko-KR')}원<br />
											{pay.method}
										</Td>
										<BtnTd>
											{status}
											{status === '예약대기' && <Button>예약 확정</Button>}
											{(status === '예약대기' || status === '예약완료') && (
												<Button>예약 취소</Button>
											)}
										</BtnTd>
									</Tr>
								);
							})}
						</tbody>
					</Table>
				</FarmFormat>
			)}
		</>
	);
};

export default FarmManagement;
