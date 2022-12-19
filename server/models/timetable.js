const TimeTables = (sequelize, DataTypes) => {
	const TimeTables = sequelize.define(
		'timeTables',
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

	TimeTables.associate = (db) => {
		db.TimeTables.belongsTo(db.Farms);
	};

	TimeTables.getAll = () => {
		return TimeTables.findAll();
	};

	TimeTables.getByDate = (date) => {};

	TimeTables.createTable = (tableInfo, farmId) => {
		return TimeTables.create(tableInfo, farmId);
	};

	return TimeTables;
};

export default TimeTables;
