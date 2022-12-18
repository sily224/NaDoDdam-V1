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

	// Farms.associate = (db) => {
	// 	db.Farms.hasMany(db.TimeTables, {
	// 		foreignKey: 'farm_id',
	// 		targetKey: 'id',
	// 	});
	// };

	Farms.findById = (id) => {
		return db.Users.findByPk(id).then((data) => {
			return data.dataValues.id;
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

	// Farms.update = (id, type, name, address, description, owner) => {
	//   return Farms.findByPk(id).then((data) => {
	//     return (
	//       (data.type = type),
	//       (data.name = name),
	//       (data.address = address),
	//       (data.description = description),
	//       (data.owner = owner)
	//     );
	//   });
	// };

	Farms.create = (farmInfo) => {
		return Farms.create(farmInfo).then((data) => {
			return data;
		});
	};

	return Farms;
};

export default Farms;
