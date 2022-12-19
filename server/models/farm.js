import Sequelize from 'sequelize';
const Op = Sequelize.Op;

import db from '../models/index.js';

const Farms = (sequelize, DataTypes) => {
	const Farms = sequelize.define(
		'Farms',
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
				type: DataTypes.STRING,
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
			collate: 'utf8_general_ci', //한글 저장
			tableName: 'Farms',
			timestamps: true,
		},
	);

	Farms.findById = (id) => {
		return Farms.findByPk(id).then((data) => {
			console.log(data);
			return data;
		});
	};

	Farms.getAll = () => {
		return Farms.findAll();
	};

	Farms.getByType = (type) => {
		return Farms.findAll({ where: { type } });
	};

	Farms.getByAddress = (address) => {
		return Farms.findAll({
			where: {
				address: {
					[Op.like]: '%' + address + '%',
				},
			},
		});
	};

	Farms.updateFarm = (id, updateInfo) => {
		return Farms.update(updateInfo, { where: { id } }).then((data) => {
			return data;
		});
	};

	Farms.create = (farmInfo) => {
		return Farms.create(farmInfo);
	};

	Farms.remove = (id) => {
		return Farms.findByPk(id).then((farm) => farm.destroy());
	};

	return Farms;
};

export default Farms;
