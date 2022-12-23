import React, { useState, useEffect } from 'react';
import FarmForm from './FarmForm';
import styled from 'styled-components';
import ModalContainer from './../components/Modal';
import { showModal } from '../store/ModalSlice';
import { useDispatch, useSelector } from 'react-redux';
import { closeModal } from '../store/ModalSlice';
import EditFarm from '../components/EditFarm';

const Button = styled.button``;

const ModalLayout = styled.div`
	display: felx;
`;

function CreateFarm() {
	const [farmInfo, setFarmInfo] = useState(false);
	const modalOpen = useSelector((state) => state.modal.modal);
	const dispatch = useDispatch();
	const [onInput, setOnInput] = useState();

	const onEdit = () => {
		setFarmInfo(true);
	};

	const NullFarm = () => {
		return (
			<>
				<p>
					농장이 없습니다.
					<br />
					새로 등록해주세요.
				</p>
				<button onClick={() => onEdit()}>등록하기</button>
			</>
		);
	};
	const onSave = () => {
		setFarmInfo(false);
		setFarmInfo(true);
		setOnInput(false);
		console.log(1);
		console.log(onInput);
	};

	return (
		<>
			{farmInfo ? (
				<div>
					<FarmForm onInput={true}></FarmForm>
					<Button onClick={() => onSave()}>완료</Button>
					{/* 구현미완료 */}
					{/* {modalOpen && (
						<ModalContainer>
							<ModalLayout>
								<h1>농장 등록 완료!</h1>
								<button onClick={() => onSave()}>확인</button>
							</ModalLayout>
						</ModalContainer>
					)} */}
				</div>
			) : (
				<NullFarm></NullFarm>
			)}
		</>
	);
}

export default CreateFarm;
