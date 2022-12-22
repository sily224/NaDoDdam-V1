const Reservations = (sequelize, DataTypes) => {
	const Reservations = sequelize.define(
		'Reservations',
		{
			total_price: {
				type: DataTypes.INTEGER,
				allowNull: false,
			},
			status: {
				type: DataTypes.STRING(64),
				allowNull: false,
				defaultValue: '예약 대기',
			},
			personnel: {
				type: DataTypes.INTEGER,
				allowNull: false,
			},
			payment: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			name: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			email: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			phoneNum: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			time_id: {
				type: DataTypes.INTEGER,
				allowNull: false
			}

		},
		{
			charset: 'utf8',
			collate: 'utf8_general_ci', //한글 저장
			tableName: 'Reservations',
			timestamps: true,
		},
	);
	Reservations.associate = (db) => {
		db.Reservations.belongsTo(db.Users, {
			foreignKey: 'user_id',
			targetKey: 'id',
		});
	};

	Reservations.createReserve = (reserve) => {
		return Reservations.create(reserve);
	};

	Reservations.findByReserveId = (id) => {
		return Reservations.findOne({ where: { id } });
	};

	Reservations.getReserve = () => {
		return Reservations.findAll();
	};

	Reservations.deleteReserve = (id) => {
		return Reservations.destroy({ where: { id } });
	};

	Reservations.updateReserve = ({ id, update }) => {
		return Reservations.update(update, { where: { id } });
	};

	return Reservations;
};

export default Reservations;
