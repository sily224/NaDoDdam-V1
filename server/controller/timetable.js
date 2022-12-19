import 'express-async-errors';
import db from '../models/index.js';

export async function getTimeTables(req, res, next) {
	const { date } = req.query;
	const table = await (date
		? db.TimeTables.getByDate(date)
		: db.TimeTables.getAll());
	res.status(200).json(table);
}

export async function createTimeTable(req, res, next) {
	const { date, personnel, price, start_time, end_time } = req.body;
	const { id } = req.params;
	const tableInfo = {
		date,
		personnel,
		price,
		start_time,
		end_time,
		farm_id: id,
	};
	const farmId = await db.Farms.findById(id);
	const timeTable = await db.TimeTables.createTable(tableInfo, farmId);
	res.status(201).json(timeTable);
}
