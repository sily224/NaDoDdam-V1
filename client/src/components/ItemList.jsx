import axios from 'axios';
import React, {useCallback} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setFavorite } from '../store/FavoriteSlice';
import { Link } from 'react-router-dom';
import styled, {css} from 'styled-components';

const handleButton = async (e) => {
	// 로그인 유무 확인
	if (!localStorage.getItem('token')){
		alert('찜 기능은 로그인이 필요합니다.');
		return;
	}

	const farmId = Number(e.target.id);
	console.log('입력된 농장 아이디', farmId);
	if (e.target.style.backgroundColor !== 'red')
		e.target.style.backgroundColor = 'red';
	else e.target.style.backgroundColor = 'white';

	const token = localStorage.getItem('token');
	const header = {
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${token}`,
		},
	};

	// 선택한 농장이 찜 목록에 있는지 확인
	await axios
		.get('http://localhost:3500/api/like', header)
		.then((res) => res.data)
		.then(async (data) => {
			console.log('찜 목록들', data);
			for (let i = 0; i < data.length; i++) {
				if (data[i].id === farmId) {
					console.log('찜 목록 있으니 삭제하겠음'); // 찜 목록에 있음

					// 찜 삭제
					await axios(`http://localhost:3500/api/like/${farmId}`, {
						method: 'DELETE',
						headers: {
							'Content-Type': 'application/json',
							Authorization: `Bearer ${localStorage.getItem('token')}`,
						},
					});
					return;
				}
			}

			console.log('찜 목록 없으니 등록하겠음'); // 찜 목록에 없음

			// 찜 등록
			await axios(`http://localhost:3500/api/like/${farmId}`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${localStorage.getItem('token')}`,
				},
			});
		});
};

const FarmList = React.memo(({ contents, favorite}) => {

	if (contents.length === 0) {
		return <Container>게시물 없음</Container>;
	} else {
		return (
			<Container>
				<ItemList className="itemList">
					{contents.map((content) => {
						return (
							<Item key={content.id}>
								<Button type="button" id={content.id} onClick={handleButton} color={favorite.includes(content.id).toString()} />
								<Link to={`/detail/${content.id}`}>
									<img src={content.url} alt={content.name} />
									<TextContainer>
										<div>농장 : {content.name}</div>
										<div>주소 : {content.address}</div>
										<div>가격 : {content.price}</div>
									</TextContainer>
								</Link>
							</Item>
						);
					})}
				</ItemList>
			</Container>
		);
	}
});

const FavoriteList = React.memo(({ contents }) => {
	
	const favorite = useSelector(state=>state.favorite.favorites);
	console.log('찜 목록', favorite);
	const dispatch = useDispatch();

	// const handleDelete = (e) => {
	// 	const deleteId = Number(e.target.id);
	// 	console.log(e.target.id);
	// 	dispatch(setFavorite(favorite.filter(x=>x!==deleteId)));
	// }

	if (contents.length === 0) {
		return <Container>게시물 없음</Container>;
	} else {
		return (
			<Container>
				<ItemList className="itemList">
					{contents.map((content) => {
						return (
							<Item key={content.id}>
								<Button
									type="button"
									id={content.id}
									onClick={handleButton}
									color={favorite.includes(content.id).toString()}
								/>
								<Link to={`/detail/${content.id}`}>
									<img src={content.url} alt={content.name} />
									<TextContainer>
										<div>농장 : {content.name}</div>
										<div>주소 : {content.address}</div>
										<div>가격 : {content.price}</div>
									</TextContainer>
								</Link>
							</Item>
						);
					})}
				</ItemList>
			</Container>
		);
	}
});

const Container = styled.div`
	box-sizing: border-box;
	display: flex;
	overflow: hidden;
	justify-content: center;
	width: 100%;
	margin: 0;
`;

const ItemList = styled.div`
	display: grid;
	grid-template-columns: repeat(auto-fill, minmax(400px, auto));
	grid-gap: 25px;
	width: auto;
	max-width: 2100px;
	width: 100%;
	height: 100%;
`;

const Item = styled.div`
	display: flex;
	flex-direction: column;
	flex-basis: auto;
	height: auto;
	width: auto;
	border: 1px solid black;
	position: relative;

	img {
		width: 100%;
		height: 240px;
	}
`;

const Button = styled.button`
	width: 30px;
	height: 30px;
	background-color: ${(props) => (props.color === 'true' ? 'red' : 'white')};
	position: absolute;
	top: 5%;
	right: 5%;

	&:hover {
	background-color: gray;
	}
`

const TextContainer = styled.div`
	display: grid;
	height: auto;
	object-fit: cover;
	grid-template-rows: 1fr 1fr 1fr;
`;

export { FarmList, FavoriteList };
