import React from 'react';
import styled from 'styled-components';
import FarmFormat from '../components/FarmFormat';
import axios from 'axios';
import { useState, useEffect } from 'react';

const Subject = styled.h2`
	text-align: center;
	margin-top: 7%;
`;

const FarmReview = () => {
	const [reviewData, setReviewData] = useState('');

	const fetchData = async () => {
		try {
			await axios.get('/FarmReview.json').then((res) => {
				console.log('리뷰데이터', res.data);
			});
		} catch (err) {
			console.log(err);
		}
	};

	useEffect(() => {
		fetchData();
	}, []);

	return (
		<>
			<FarmFormat>
				<Subject>후기 관리</Subject>
			</FarmFormat>
		</>
	);
};

export default FarmReview;
