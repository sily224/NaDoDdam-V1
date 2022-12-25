import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
// import Postcode from './AddressApi';
// import Post from './daumApi';
// import SignUp from './test';
import * as userApi from '../lib/userApi';
// import Img from './ImgUpload';

// todo 혜실 : 수정중으로 주석이 많으나 추후 삭제 예정
const Tittle = styled.h1``;

const Form = styled.form`
	display: flex;
	flex-direction: column;
`;

const Label = styled.label``;

const Input = styled.input``;

const Textarea = styled.textarea``;

const Button = styled.button``;

function FarmNullInputForm() {
	const [type, setType] = useState('');
	const [name, setName] = useState('');
	const [address, setAddress] = useState('');
	const [url, setUrl] = useState('');
	const [description, setDescription] = useState('');
	const [owner, setOwner] = useState('');
	const [disabled, setDisabled] = useState(false);

	const handleSubmit = async (e) => {
		setDisabled(true);
		e.preventDefault();
		await new Promise((r) => setTimeout(r, 1000));
		postData();
		setDisabled(false);
	};
	const postData = async (e) => {
		try {
			const changeData = await userApi.post('http://localhost:3500/api/farms', {
				type: type,
				name: name,
				address: address,
				description: description,
				url: url,
				owner: owner,
			});
			console.log(changeData);
		} catch (e) {
			console.log(e);
		}
	};

	return (
		<>
			<div>
				{/* <SignUp>주소검색</SignUp> */}
				{/* <Post></Post> */}
				<Tittle>농장 정보111</Tittle>
				<Form onSubmit={handleSubmit}>
					<Label>과일종류</Label>
					<Input
						type="text"
						value={type}
						onChange={(e) => setType(e.target.value)}
					></Input>
					<Label>농장명</Label>
					<Input
						type="text"
						value={name}
						onChange={(e) => setName(e.target.value)}
					></Input>
					<Label>농장주소</Label>
					<Input
						type="text"
						value={address}
						onChange={(e) => setAddress(e.target.value)}
					></Input>
					{/* <Postcode>주소검색</Postcode> */}
					<Label>이미지</Label>
					<Label>체험설명</Label>
					<Textarea
						type="text"
						value={description}
						onChange={(e) => setDescription(e.target.value)}
					></Textarea>
					<Label>농장주명</Label>
					<Input
						type="text"
						value={owner}
						onChange={(e) => setOwner(e.target.value)}
					></Input>
					<Button type="submit" disabled={disabled}>
						완료
					</Button>
				</Form>
			</div>
		</>
	);
}

export default FarmNullInputForm;
