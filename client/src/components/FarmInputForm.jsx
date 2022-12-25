import React, { useState } from 'react';
import styled from 'styled-components';
import Post from './daumApi';
import * as userApi from '../lib/userApi';
import Img from './ImgUpload';

const Tittle = styled.h1``;

const Form = styled.form`
	display: flex;
	flex-direction: column;
`;

const Label = styled.label``;

const Input = styled.input``;

const Textarea = styled.textarea``;

const Button = styled.button``;

function FarmInputForm({ farmData }) {
	console.log(farmData);
	const [type, setType] = useState(farmData.farmInfo.type);
	const [name, setName] = useState(farmData.farmInfo.name);
	const [address, setAddress] = useState(farmData.farmInfo.address);
	const [url, setUrl] = useState(farmData.farmInfo.url);
	const [description, setDescription] = useState(farmData.farmInfo.description);
	const [owner, setOwner] = useState(farmData.farmInfo.owner);
	const [disabled, setDisabled] = useState(false);
	const [isForm, setIsForm] = useState(true);
	const farmId = farmData.farmInfo.id;

	const handleSubmit = async (e) => {
		setDisabled(true);
		e.preventDefault();
		await new Promise((r) => setTimeout(r, 1000));
		putData();
		setDisabled(false);
		setIsForm(false);
	};
	const putData = async (e) => {
		try {
			const changeData = await userApi.put(
				`http://localhost:3500/api/farms/${farmId}`,
				{
					type: type,
					name: name,
					address: address,
					description: description,
					url: url,
					owner: owner,
				},
			);
			console.log(changeData);
		} catch (e) {
			console.log(e);
		}
	};
	return (
		<>
			<Tittle>농장 정보</Tittle>
			<Form onSubmit={handleSubmit}>
				<Label>과일종류</Label>
				<input
					type="text"
					name="type"
					value={type}
					onChange={(e) => setType(e.target.value)}
				></input>
				<Label>농장명</Label>
				<input
					type="text"
					name="name"
					value={name}
					onChange={(e) => setName(e.target.value)}
				></input>
				<Label>농장주소</Label>
				<Post></Post>
				<input
					type="text"
					name="address"
					value={address}
					placeholder="상세주소"
					onChange={(e) => setAddress(e.target.value)}
				></input>
				<Label>이미지</Label>
				<Img></Img>
				<input
					type="text"
					name="url"
					value={url}
					onChange={(e) => setUrl(e.target.value)}
				></input>
				<Button>대표 업로드</Button>
				<Label>체험설명</Label>
				<Textarea
					type="text"
					name="description"
					value={description}
					onChange={(e) => setDescription(e.target.value)}
				></Textarea>
				<Label>농장주명</Label>
				<input
					type="text"
					name="owner"
					value={owner}
					onChange={(e) => setOwner(e.target.value)}
				></input>
				<button type="submit" disabled={disabled}>
					완료
				</button>
			</Form>
		</>
	);
}

export default FarmInputForm;
