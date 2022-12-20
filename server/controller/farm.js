import 'express-async-errors';
import db from '../models/index.js';

// 서비스가 확장되어 타입이 늘어나면 ex (딸기, 수박, 파인애플 등등) 특정타입을 받아 특정타입의 농장을 조회
export async function getFarms(req, res, next) {
	const { type } = req.query;
	const data = await (type
		? db.Farms.getByType(type) //
		: db.Farms.getAll());
	if (!data) {
		return res.status(404).json({ message: '해당 농장을 찾을 수 없습니다.' });
	}
	res.status(200).json(data);
}

export async function getByLocation(req, res, next) {
	const { address } = req.query;
	const data = await db.Farms.getByAddress(address);
	if (!data) {
		return res.status(404).json({ message: '해당지역에는 농장이 없습니다.' });
	}
	res.status(200).json(data);
}

export async function createFarm(req, res, next) {
	const { type, name, address, description, owner } = req.body;
	const farm = await db.Farms.createFarm({
		type,
		name,
		address,
		description,
		owner,
	});
	res.status(201).json(farm);
}

// 농장 소유자가 update를 해야함으로 농장소유자의 테이블을 만들고 농장소유자의 id 값을 확인 후
// 해당 농장 소유자가 맞으면 데이터 수정
// => 미구현
export async function updateFarm(req, res, next) {
	const { type, name, address, description, owner } = req.body;
	const { id } = req.params;
	const farmId = await db.Farms.findById(id);
	if (!farmId) {
		return res.status(404).json({ message: `Farm not found: ${id}` });
	}
	// if (farm.id !== req.userId) { // 해당 농장주의 소유 농장인지 확인
	// 	return res.sendStatus(403);
	// }
	const updateInfo = {
		...(type && { type }),
		...(name && { name }),
		...(address && { address }),
		...(description && { description }),
		...(owner && { owner }),
	};
	const updatedFarm = await db.Farms.updateFarm(id, updateInfo);
	res.status(200).json(updatedFarm);
}

export async function removeFarm(req, res, next) {
	const { id } = req.params;
	const farm = await db.Farms.findById(id);
	if (!farm) {
		return res.status(404).json({ message: `Farm not found ${id}` });
	}
	await db.Farms.remove(id);
	res.sendStatus(204);
}
