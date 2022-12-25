import React, { useEffect, useState } from 'react';
import CreateFarm from '../components/CreateFarm';
import EditFarm from '../components/EditFarm';
import * as userApi from '../lib/userApi';
// import FarmInputForm from './FarmInputForm';
// import FarmForm from './FarmForm';
// import { createSlice, configureStore } from '@reduxjs/toolkit';
// import { configureStore } from '@reduxjs/toolkit';

// const initialState = {
// 	farmData: {},
// };
// const farmSlice = createSlice({
// 	name: 'farmSlice',
// 	initialState,
// 	reducers: {
// 		get(state) {
// 			state;
// 		},
// 		push(state) {},
// 	},
// });

function MyFarm() {
	const [farmid, setFarmid] = useState(null);
	const [farmData, setFarmData] = useState({});
	const [isAddFarm, setIsAddFarm] = useState(false);

	const GetFarmData = async () => {
		try {
			const res = await userApi.get(
				'http://localhost:3500/api/farms/farminformation',
			);
			const data = await res.data;
			console.log(data);
			console.log(data.farmInfo.id);
			setFarmid(data.farmInfo.id);
			setFarmData(data);
		} catch (e) {
			console.log(e);
		}
	};
	useEffect(() => {
		GetFarmData();
	}, []);

	// memo 혜실: farmid가 없으면 농장등록하고, 있으면 농장정보를 보여줌
	return (
		<>
			{farmid === null ? (
				// {isAddFarm === false ? (<NullFarm></NullFarm>):(<FarmInputForm></FarmInputForm>)}
				<CreateFarm farmData={farmData}></CreateFarm>
			) : (
				<EditFarm farmData={farmData}></EditFarm>
			)}
		</>
	);
}

export default MyFarm;
