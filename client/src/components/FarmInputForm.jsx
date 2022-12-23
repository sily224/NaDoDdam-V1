import React from 'react';
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

function FarmInputForm() {
	return (
		<>
			<Tittle></Tittle>
			<Form>
				<Label>과일종류</Label>
				<Input></Input>
				<Label>농장명</Label>
				<Input></Input>
				<Label>농장주소</Label>
				<div>
					<Input></Input>
					<Button>검색</Button>
				</div>
				<Label>이미지</Label>
				<div>
					<Input></Input>
					<Button>대표 업로드</Button>
				</div>
				<div>
					<Input></Input>
					<Button>업로드</Button>
				</div>
				<div>
					<Input></Input>
					<Button>업로드</Button>
				</div>
				<Label>체험설명</Label>
				<Textarea></Textarea>
				<Label>농장주명</Label>
				<Input></Input>
			</Form>
		</>
	);
}

export default FarmInputForm;
