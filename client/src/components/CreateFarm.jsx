import React, { useState } from 'react';
import FarmInputForm from './FarmInputForm';
import FarmNullInputForm from './FarmNullInputForm';
import FarmForm from './FarmForm';
import styled from 'styled-components';

const Button = styled.button``;

function CreateFarm({ farmData }) {
	const [isAddFarm, setIsAddFarm] = useState(false);
	const [onInput, setOnInput] = useState();
	const [saveInfo, setSaveInfo] = useState(false);

	const onEdit = () => {
		setIsAddFarm(true);
	};
	const NullFarm = () => {
		return (
			<>
				<p>
					농장이 없습니다.
					<br />
					새로 등록해주세요.
				</p>
				<button onClick={() => onAddFarm()}>등록하기</button>
			</>
		);
	};
	const onAddFarm = () => {
		setIsAddFarm(true);
	};
	return (
		<>
			{isAddFarm ? (
				<div>
					{saveInfo ? (
						<div>
							<FarmForm farmData={farmData}></FarmForm>
							<Button>수정</Button>
						</div>
					) : (
						<FarmNullInputForm />
					)}
				</div>
			) : (
				<NullFarm></NullFarm>
			)}
		</>
	);
}

export default CreateFarm;
