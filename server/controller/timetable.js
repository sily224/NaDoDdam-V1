import 'express-async-errors';
import db from '../models/index.js';

export async function getTimeTables(req, res, next) {
	const { date } = req.query;
	const table = await (date
		? db.TimeTables.getByDate(date) // 미구현
		: db.TimeTables.getAll());
	res.status(200).json(table);
}

export async function createTimeTable(req, res, next) {
	const { date, personnel, price, start_time, end_time } = req.body;
	try {
		const farmId = await db.Farmers.findById(req.farmerId).then((data) => {
			return data.dataValues.farmId;
		});
		const tableInfo = {
			date,
			personnel,
			price,
			start_time,
			end_time,
			farmId,
		};
		const timeTable = await db.TimeTables.createTable(tableInfo);
		res.status(201).json(timeTable);
	} catch (err) {
		next(err);
	}
}

export async function updateTimeTable(req, res, next) {
	const { date, personnel, price, start_time, end_time } = req.body;
	const { id } = req.params;
	const found = await db.TimeTables.getById(id);
	if (!found) {
		return res.status(404).json(`해당 시간표 ${id}를 찾지 못 했습니다 `);
	}
	const toUpdate = {
		...(date && { date }),
		...(personnel && { personnel }),
		...(price && { price }),
		...(start_time && { start_time }),
		...(end_time && { end_time }),
	};
	const updatedTiemTable = await db.TimeTables.updateTable(toUpdate, id);
	res.status(200).json(updatedTiemTable);
}
