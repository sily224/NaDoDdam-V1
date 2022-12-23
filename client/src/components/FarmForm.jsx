import React from 'react';
import styled from 'styled-components';

const Tittle = styled.h1``;

const Form = styled.div`
	display: flex;
	flex-direction: column;
`;

const Label = styled.label``;

const Context = styled.p``;

const Textarea = styled.textarea``;

const Button = styled.button``;

function FarmForm({ farmData }) {
	console.log(farmData);
	return (
		<>
			{farmData && (
				<div>
					<Tittle></Tittle>
					<Form>
						<Tittle></Tittle>
						<Form>
							<Label>과일종류</Label>
							<Context></Context>
							<Label>농장명</Label>
							<Context></Context>
							<Label>농장주소</Label>
							<Context></Context>
							<Label>이미지</Label>
							<Context></Context>
							<Context></Context>
							<Context></Context>
							<Label>체험설명</Label>
							<Context></Context>
							<Label>농장주명</Label>
							<Context></Context>
						</Form>
					</Form>
				</div>
			)}
		</>
	);
}

export default FarmForm;
