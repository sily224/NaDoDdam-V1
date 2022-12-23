import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';

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

const Pages = styled.div``;

const PageBtn = styled.button``;

const FarmReservationTable = ({}) => {
	const statusList = ['전체', '예약대기', '예약완료', '예약취소', '체험완료'];
	const [originalData, setOriginalData] = useState(null);
	const [printData, setPrintData] = useState(null);
	const [statusOption, setStatusOption] = useState('전체');
	const [dateOption, setDateOption] = useState('최근순');
	const [page, setPage] = useState(1);
	let pages = [];

	// memo 지우: 초기에 모든 예약목록 받아오기
	const fetchData = async () => {
		try {
			await axios.get('/reservation.json').then((res) => {
				setPrintData(res.data);
				setOriginalData(res.data);
			});
		} catch (e) {
			console.log(e);
		}
	};

	const filterData = () => {
		let filteredData = [...originalData];

		// memo 지우: 예약 상태에 따라 거르기
		if (statusOption !== '전체') {
			filteredData = filteredData.filter((obj) => obj.status === statusOption);
		}

		// memo 지우: 최근순 or 오래된순으로 정렬
		if (dateOption === '최근순') {
			filteredData.sort((a, b) => {
				if (a.reservedTime > b.reservedTime) return -1;
				if (a.reservedTime == b.reservedTime) return 0;
				if (a.reservedTime < b.reservedTime) return 1;
			});
		} else {
			filteredData.sort((a, b) => {
				if (a.reservedTime > b.reservedTime) return 1;
				if (a.reservedTime == b.reservedTime) return 0;
				if (a.reservedTime < b.reservedTime) return -1;
			});
		}
		setPrintData(filteredData);
	};

	const showPages = () => {
		for (let i = 1; i <= printData.length / 10; i++) {
			pages.push(
				<PageBtn key={i} onClick={() => setPage(i)}>
					i
				</PageBtn>,
			);
		}
		console.log(pages);
	};

	useEffect(() => {
		fetchData();
	}, []);

	useEffect(() => {
		if (originalData) {
			filterData();
			showPages();
			setPrintData(printData.slice(10 * (page - 1), 10 * page));
		}
	}, [statusOption, dateOption]);

	useEffect(() => {
		console.log('들어오니', printData);
		if (printData) {
			console.log(printData.slice(10 * (page - 1), 10 * page));
		}
	}, [page]);

	if (printData) {
		return (
			<>
				<FilterWrapper>
					{statusList.map((status) => (
						<FilterBtn key={status} onClick={() => setStatusOption(status)}>
							{status}
						</FilterBtn>
					))}
					<FilterSelect onChange={(e) => setDateOption(e.target.value)}>
						<option value="최근순">최근순</option>
						<option value="오래된순">오래된순</option>
					</FilterSelect>
				</FilterWrapper>
				<Table>
					<Thead>
						<Tr>
							<Td scope="col">예약날짜</Td>
							<Td scope="col">예약번호</Td>
							<Td scope="col">예약자</Td>
							<Td scope="col">예약정보</Td>
							<Td scope="col">결제</Td>
							<Td scope="col">예약상태</Td>
						</Tr>
					</Thead>
					<tbody>
						{printData.map((oneReservation) => {
							const { reservedTime, id, user, content, pay, status } =
								oneReservation;
							return (
								<Tr key={id}>
									<Td>{reservedTime.slice(0, 10)}</Td>
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
					<Pages>{pages}</Pages>
				</Table>
			</>
		);
	}
};

export default FarmReservationTable;
