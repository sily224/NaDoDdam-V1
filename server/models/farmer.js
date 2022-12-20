const Farmers = (sequelize, DataTypes) => {
	const farmer = sequelize.define(
		'farmer',
		{
			email: {
				type: DataTypes.STRING(255),
				allowNull: false,
				unique: true,
			},
			password: {
				type: DataTypes.STRING(255),
				allowNull: false,
			},
			name: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			phoneNum: {
				type: DataTypes.STRING(64),
				allowNull: false,
			},
			role: {
				type: DataTypes.STRING(32),
				allowNull: true,
				defaultValue: 'farmer',
			},
		},
		{
			charset: 'utf8',
			collate: 'utf8_general_ci', //한글 저장
		},
	);

	farmer.findByUserId = (id) => {
		return farmer.findOne({ where: { id } });
	};

	farmer.findByFarmerEmail = (email) => {
		return farmer.findOne({ where: { email } });
	};

	farmer.getUsers = () => {
		return farmer.findAll();
	};

	farmer.findById = (id) => {
		return farmer.findByPk(id);
	};

	farmer.createFarmer = (user) => {
		return farmer.create(user).then((data) => data.dataValues.id);
	};

	farmer.updateUser = ({ userId, update }) => {
		return farmer.update(update, { where: { id: userId } });
	};

	farmer.deleteUser = (userId) => {
		return farmer.destroy({ where: { id: userId } });
	};

	return farmer;
};
export default Farmers;
