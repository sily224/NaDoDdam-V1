const TimeTables = (sequelize, DataTypes) => {
	const TimeTables = sequelize.define(
		'TimeTables',
		{
			timetable_id: {
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
				type: DataTypes.DATE,
				allowNull: false,
			},
			end_time: {
				type: DataTypes.DATE,
				allowNull: false,
			},
		},
		{
			charset: 'utf8',
			collate: 'utf8_general_ci', //한글 저장
			tableName: 'TimeTables',
			timestamps: false,
		},
	);

	TimeTables.associate = (db) => {
		db.TimeTables.belongsTo(db.Farms, {
			foreignKey: 'farm_id',
			targetKey: 'id',
		});
	};

	return TimeTables;
};

export default TimeTables;
