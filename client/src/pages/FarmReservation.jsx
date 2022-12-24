import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import FarmFormat from '../components/FarmFormat';
import FarmReservationTable from '../components/FarmReservationTable';

const Subject = styled.h2`
	text-align: center;
	margin-top: 7%;
`;

const FarmReservation = () => {
	return (
		<>
			<FarmFormat>
				<Subject>예약관리</Subject>
				<FarmReservationTable />
			</FarmFormat>
		</>
	);
};

export default FarmReservation;
