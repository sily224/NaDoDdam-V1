import Sequelize from 'sequelize';
const Op = Sequelize.Op;

const Farms = (sequelize, DataTypes) => {
	const farm = sequelize.define(
		'farm',
		{
			type: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			name: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			address: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			description: {
				type: DataTypes.TEXT,
				allowNull: false,
				defaultValue: '설명 없음',
			},
			owner: {
				type: DataTypes.STRING,
				allowNull: false,
			},
		},
		{
			charset: 'utf8',
			collate: 'utf8_general_ci',
		},
	);

	farm.findById = (id) => {
		return farm.findByPk(id);
	};

	farm.getAll = () => {
		return farm.findAll(); // 내림차순으로 정렬해야하나 오름차순으로 정렬해야하나
	};

	farm.getByType = (type) => {
		return farm.findAll({ where: { type } });
	};

	farm.getByAddress = (address) => {
		return farm.findAll({
			where: {
				address: {
					[Op.like]: '%' + address + '%',
				},
			},
		});
	};

	farm.updateFarm = (id, updateInfo) => {
		return farm.update(updateInfo, { where: { id } });
	};

	farm.createFarm = (farmInfo) => {
		return farm.create(farmInfo);
	};

	farm.remove = (id) => {
		return farm.findByPk(id).then((farm) => farm.destroy());
	};

	return farm;
};

export default Farms;
