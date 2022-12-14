const Users = (sequelize, DataTypes) => {
  const Users = sequelize.define(
    "Users",
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
        type: DataTypes.STRING(64),
        allowNull: false,
        unique: true
      },
      phoneNum: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      role: {
        type: DataTypes.STRING(32),
        allowNull: false,
        defaultValue: "member"
      },
    }, 
    {
      sequelize,
      charset: "utf8",
      collate: "utf8_general_ci",//한글 저장
      tableName: "Users",
      timestamps: true,
      paranoid: true,
    }
  );
  Users.associate = (db) => {
    db.Users.hasMany(db.Reservations, {foreignKey: "user_id", targetKey: "id"});
  };
  return Users;
}

export default Users;