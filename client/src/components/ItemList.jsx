import axios from 'axios';
import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const FarmList = React.memo(({ contents, favorite, setFavorite}) => {

	const handleButton = async (e) => {
		// 로그인 유무 확인
		if (!localStorage.getItem('token')){
			alert('찜 기능은 로그인이 필요합니다.');
			return;
		}

		const farmId = Number(e.target.id);
		const element =	e.target;

		if (element.getAttribute('color') === 'true') element.setAttribute('color', 'false');
		else if (element.getAttribute('color') === 'false') element.setAttribute('color', 'true');

		console.log('입력된 농장 아이디', farmId);

		if (favorite.includes(farmId)){
			await axios(`http://localhost:3500/api/like/${farmId}`, {
				method: 'DELETE',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${localStorage.getItem('token')}`,
				},
			});
			setFavorite(favorite.filter(x=>x!==farmId));
		} else {
			await axios(`http://localhost:3500/api/like/${farmId}`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${localStorage.getItem('token')}`,
				},
			});
			setFavorite([...favorite, farmId]);
		}
	};

	if (contents.length === 0) {
		return <Container>게시물 없음</Container>;
	} else {
		return (
			<Container>
				<ItemList className="itemList">
					{contents.map((content) => {
						return (
							<Item key={content.id}>
								<Button type="button" id={content.id} onClick={(e) => handleButton(e)} color={favorite.includes(content.id).toString()} />
								<Link to={`/detail/${content.id}`}>
									<img src={content.url} alt={content.name} />
									<TextContainer>
										<div>농장 : {content.name}</div>
										<div>주소 : {content.address}</div>
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

const FavoriteList = React.memo(({ contents, setContents}) => {

	const handleButton = async (e) => {
		// 로그인 유무 확인
		if (!localStorage.getItem('token')){
			alert('찜 기능은 로그인이 필요합니다.');
			return;
		}
	
		const farmId = Number(e.target.id);
		console.log('입력된 농장 아이디', farmId);
		const element = e.target;
		element.setAttribute('color', 'false');

		await axios(`http://localhost:3500/api/like/${farmId}`, {
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${localStorage.getItem('token')}`,
			},
		});
		setContents(contents.filter(x=>x.id!==farmId));
	};

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
									color="true"
								/>
								<Link to={`/detail/${content.id}`}>
									<img src={content.url} alt={content.name} />
									<TextContainer>
										<div>농장 : {content.name}</div>
										<div>주소 : {content.address}</div>
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
	background-color: white;
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
	height: 400px;
	width: auto;
	border: 1px solid black;
	position: relative;
	border-radius: 10px;
	overflow:hidden;

	img {
		width: 100%;
		height: 330px;
		border-radius: 10px 10px 0 0;
	}

	&:hover {
		transition: 0.5s;
		border: solid 5px #FF0000;
		img {
			transition: 0.5s;
			height: 400px;
			width: 100%;
		}
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
		transition: .5s;
		transform:scale(1.5);
	background-color: gray;
	}
`

const TextContainer = styled.div`
	display: grid;
	height: auto;
	object-fit: cover;
	grid-template-rows: 1fr 1fr 1fr;
	border-radius: 0 0 10px 10px;
	background-color: #f4d815;

	&hover: {
		transition: 0.5s;
		display:hidden;
	}
`;

export { FarmList, FavoriteList };
