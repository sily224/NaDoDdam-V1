import 'express-async-errors';
import db from '../models/index.js';

export async function reserve(req, res, next) {
	const { time_id, total_price, personnel, payment, name, phoneNum, email } =
		req.body;
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
	const userId = req.userId;
	const id = req.params.id;
	try {
		const found = await db.Reservations.findByUserId(userId);
		const reservation = await db.Reservations.findByReserveId(id, userId);
		if (!found) {
			throw new Error('해당 유저의 예약 내역은 없습니다.');
		}
		if (!reservation) {
			throw new Error('유저의 해당 예약이 없습니다.');
		}

		const reserve = await db.Reservations.deleteReserve(id);

		res.status(200).json({ id: id, message: 'delete !' });
	} catch (err) {
		next(err);
	}
}

export async function getReserveData(req, res, next) {
	const id = req.userId;

	try {
		const reserve = await db.Reservations.findByUserId(id);
		res.status(200).json(reserve);
	} catch (err) {
		next(err);
	}
}

export async function getFarmerData(req, res, next) {
	const id = req.farmerId;

	try {
		const farm = await db.Farmers.getFarmIdFromFarmer(id); //해당 농장주의 농장아이디 찾음
		if (!farm) {
			throw new Error('해당 농장주는 등록된 농장이 없습니다.');
		}

		const data = []; // 해당 농장이 저장해둔 타임테이블 id
		const datas = []; // 해당 농장 주인의 타임테이블에 있는 값 중 예약 건 수가 있는 id

		const result = await db.TimeTables.findFarmId(farm);
		if (!result) {
			throw new Error('해당 농장아이디의 시간표가 없습습니다.');
		}

		result.forEach((time) => data.push(time.id));

		for (let i = 0; i < data.length; i++) {
			const reserve = await db.Reservations.findByTimeId(data[i]);
			reserve.forEach((res) => datas.push(res));
		}

		res.status(200).json(datas);
	} catch (err) {
		next(err);
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
	const userId = req.userId;

	const found = await db.Reservations.findByUserId(userId);
	const reservation = await db.Reservations.findByReserveId(id, userId);
	if (!found) {
		throw new Error('해당 유저의 예약 내역은 없습니다.');
	}
	if (!reservation) {
		throw new Error('유저의 해당 예약이 없습니다.');
	}

	const { time_id, total_price,personnel, status, payment, name, phoneNum, email} = req.body;

	try {
		const reserveInfo = { id };

		const toUpdate = {
			...(time_id && { time_id }),
			...(total_price && { total_price }),
			...(personnel && { personnel }),
			...(status && { status }),
			...(payment && { payment }),
			...(name && { name }),
			...(email && {email}),
			...(phoneNum && {phoneNum}),
		};
		const updateReserveInfo = await setReserve(reserveInfo, toUpdate);
		res.status(200).json(updateReserveInfo);
	} catch (err) {
		next(err);
	}
}
