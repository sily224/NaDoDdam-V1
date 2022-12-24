import axios from 'axios';
import { FavoriteList } from '../components/ItemList';
import { useState } from 'react';
import React, { useEffect, useCallback } from 'react';
import { useSelector } from 'react-redux';

const Favorite = () => {
  const favorite = useSelector((state) => state.favorite.favorites);

	const [contents, setContents] = useState([]);

	// 찜 목록 데이터 조회
	const getFavoriteFarms = useCallback(async () => {
		const token = localStorage.getItem('token');
		const header = {
			headers: {
				authorization: `Bearer ${token}`,
				'Content-Type': 'application/json',
			},
		};

		await axios
			.get('http://localhost:3500/api/like', header)
			.then((res) => res.data)
			.then((data) => {
				console.log('찜목록 조회', data);
				setContents(data);
			});
	});

	useEffect(() => {
		getFavoriteFarms(); // 찜 목록 조회 후 favorite에 저장
		console.log('favorite 변경', favorite);
	}, []);

	return (
		<div>
			<h2>찜 목록</h2>
			<FavoriteList contents={contents} />
		</div>
	);
};

export default Favorite;
