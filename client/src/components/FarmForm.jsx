import React from 'react';
import styled from 'styled-components';

const Tittle = styled.h1``;

const Form = styled.div`
	display: flex;
	flex-direction: column;
`;

const Label = styled.label``;

const Input = styled.input``;

const Context = styled.p``;

const Textarea = styled.textarea``;

//input이 true면 input창, false면 내용이 출력
function FarmInputForm({ onInput }) {
	return (
		<>
			{onInput ? (
				<div>
					<Tittle></Tittle>
					<Form>
						<Label>농장명</Label>
						<Input></Input>
						<Label>사업자등록번호</Label>
						<Input></Input>
						<Label>농장위치</Label>
						<Input></Input>
						<Label>전화번호</Label>
						<Input></Input>
						<Label>주소</Label>
						<Input></Input>
						<Label>농장 소개</Label>
						<Input></Input>
						<Label>전화번호</Label>
						<Input></Input>
						<Label>이미지</Label>
						<Input></Input>
						<Label>체험설명</Label>
						<Textarea></Textarea>
						<Label>농장주명</Label>
						<Input></Input>
					</Form>
				</div>
			) : (
				<div>
					<Tittle></Tittle>
					<Form>
						<Label>농장명</Label>
						<Context></Context>
						<Label>사업자등록번호</Label>
						<Context></Context>
						<Label>농장위치</Label>
						<Context></Context>
						<Label>전화번호</Label>
						<Context></Context>
						<Label>주소</Label>
						<Context></Context>
						<Label>농장 소개</Label>
						<Context></Context>
						<Label>전화번호</Label>
						<Context></Context>
						<Label>이미지</Label>
						<Context></Context>
						<Label>체험설명</Label>
						<Context></Context>
						<Label>농장주명</Label>
						<Context></Context>
					</Form>
				</div>
			)}
		</>
	);
}

export default FarmInputForm;
