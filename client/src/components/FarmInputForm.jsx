import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const Tittle = styled.h1``;

const Form = styled.div`
	display: flex;
	flex-direction: column;
`;

const Label = styled.label``;

const Input = styled.input``;

const Textarea = styled.textarea``;

const Button = styled.button``;

function FarmInputForm({ farmData }) {
	const [data, setdata] = useState();
	console.log(farmData);

	useEffect(() => {
		setdata(farmData);
	}, []);
	return (
		<>
			{farmData && (
				<div>
					<Tittle>농장 정보 조회</Tittle>
					<Form>
						<Label>과일종류</Label>
						<Input>{farmData.type || null}</Input>
						<Label>농장명</Label>
						<Input>{farmData.name || null}</Input>
						<Label>농장주소</Label>
						<div>
							<Input>{farmData.address || null}</Input>
							<Button>검색</Button>
						</div>
						<Label>이미지</Label>
						<div>
							<Input>{farmData.url[0] || null}</Input>
							<Button>대표 업로드</Button>
						</div>
						<div>
							<Input>{farmData.url[1] || null}</Input>
							<Button>업로드</Button>
						</div>
						<div>
							<Input>{farmData.url[2] || null}</Input>
							<Button>업로드</Button>
						</div>
						<Label>체험설명</Label>
						<Textarea>{farmData.description || null}</Textarea>
						<Label>농장주명</Label>
						<Input>{farmData.owner || null}</Input>
					</Form>
				</div>
			)}
		</>
	);
}

export default FarmInputForm;
