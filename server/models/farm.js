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
        type: DataTypes.STRING(64),
        allowNull: false,
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: '설명 없음',
      },
      owner: {
        type: DataTypes.STRING(32),
        allowNull: false,
      },
    },
    {
      charset: 'utf8',
      collate: 'utf8_general_ci', //한글 저장
      tableName: 'Farms',
      timestamps: true,
    }
  );

  // Farms.associate = (db) => {
  //   db.Farms.belongsTo(db.Users, {
  //     foreignKey: 'user_id',
  //     targetKey: 'id',
  //   });
  // };

  Farms.createFarm = (farmInfo) => {
    return Farms.create(farmInfo).then((data) => {
      console.log('콘솔로그', data.dataValues);
      return data;
    });
  };

  return Farms;
};

export default Farms;
