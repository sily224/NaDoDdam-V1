import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import FarmForm from './FarmForm';

function EditFarm({ farmData }) {
	// console.log(farmData);
	return (
		<>
			<FarmForm farmData={farmData}></FarmForm>
		</>
	);
}

export default EditFarm;
