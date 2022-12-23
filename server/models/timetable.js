import db from './index.js';

const TimeTables = (sequelize, DataTypes) => {
	const timeTable = sequelize.define(
		'timeTable',
		{
			id: {
				type: DataTypes.INTEGER,
				unique: true,
				primaryKey: true,
				autoIncrement: true,
			},
			date: {
				type: DataTypes.DATEONLY,
				allowNull: false,
			},
			personnel: {
				type: DataTypes.INTEGER,
				allowNull: false,
			},
			price: {
				type: DataTypes.INTEGER,
				allowNull: false,
			},
			start_time: {
				type: DataTypes.TIME,
				allowNull: false,
			},
			end_time: {
				type: DataTypes.TIME,
				allowNull: false,
			},
		},
		{
			charset: 'utf8',
			collate: 'utf8_general_ci', //한글 저장
		},
	);

	timeTable.associate = (db) => {
		db.TimeTables.belongsTo(db.Farms);
	};

	timeTable.getAll = () => {
		return timeTable.findAll({
			attributes: [
				'id',
				'date',
				'price',
				'start_time',
				'end_time',
				// [DataTypes.col('farm.type'), 'type'],
				// [DataTypes.col('farm.name'), 'name'],
			],
			include: {
				model: db.Farms,
				//attributes: [],
			},
		});
	};

	// timeTable.getByDate = (date) => {};

	timeTable.getById = (id) => {
		return timeTable.findOne({ id });
	};

	timeTable.createTable = (tableInfo) => {
		console.log(tableInfo);
		return timeTable.create(tableInfo).then((data) => {
			return data;
		});
	};

	timeTable.findFarmId = (id) => {
		return timeTable.findAll({ where: { farmId: id } });
	};

	timeTable.updateTable = (updateInfo, id) => {
		return timeTable.update(updateInfo, {
			where: { id },
		});
	};

	return timeTable;
};

export default TimeTables;
