import 'express-async-errors';
import db from '../models/index.js';

export async function reserve(req, res, next) {
	const { time_id, total_price, personnel, payment, name, phoneNum, email } = req.body;
	const user_id = req.userId;

	try {
		const new_reserve = await db.Reservations.createReserve({
			total_price,
			user_id,
			time_id,
			payment,
			name,
			phoneNum,
			email,
			personnel,
		});
		res.status(201).json(new_reserve);
	} catch (err) {
		next(err);
	}
}

export async function reserveDrop(req, res, next) {
	const userId = req.userId
	const id  = req.params.id;
	try {

		const found = await db.Reservations.findByUserId(userId);
		const reservation = await db. Reservations.findByReserveId(id, userId);
		if(!found) {
			throw new Error("해당 유저의 예약 내역은 없습니다.")
		}
		if(!reservation) {
			throw new Error("유저의 해당 예약이 없습니다.")
		}

		const reserve = await db.Reservations.deleteReserve(id);

		res.status(200).json({ id: id, message: 'delete !' });
	} catch (err) {
		next(err);
	}
}

export async function getReserveData(req, res, next) {
	const id = req.userId

	try {
		const reserve = await db.Reservations.findByUserId(id);
		res.status(200).json(reserve);
	} catch (err) {
		next(err);
	}
}

export async function getFarmerData(req, res, next) {
	const id = req.farmerId;
	const timeId = req.timeId;
	
	try {
	
		const farm = await db.Farmers.findById(id); //해당 농장주의 농장 찾음
		const time = await db.TimeTables.getById(timeId); // body로 들어온 timeId의 농장번호 

		if(time.dataValues.farmId !== farm.dataValues.farmId) {
			throw new Error("해당 농장주가 가진 농장과 조회한 농장의 정보가 다릅니다.")
		}

		const result = await db.Reservations.findByTimeId (timeId);
		res.status(200).json(result);

	} catch(err) {
		next(err)
	}

}

async function setReserve(reserveInfo, toUpdate) {
	const { id } = reserveInfo;

	let reserve = await db.Reservations.findByReserveId(id);

	if (!reserve) {
		throw new Error('해당 예약이 없습니다. 다시 한 번 확인해 주세요.');
	}

	reserve = await db.Reservations.updateReserve({
		id,
		update: toUpdate,
	});

	return reserve;
}

export async function reserveUpdate(req, res, next) {
	const id = req.params.id;
	const { date, total_price, status, time, farm_id, personnel } = req.body;

	try {
		const reserveInfo = { id };

		const toUpdate = {
			...(date && { date }),
			...(total_price && { total_price }),
			...(status && { status }),
			...(time && { time }),
			...(farm_id && { farm_id }),
			...(personnel && { personnel }),
		};
		const updateReserveInfo = await setReserve(reserveInfo, toUpdate);
		res.status(200).json(updateReserveInfo);
	} catch (err) {
		next(err);
	}
}
