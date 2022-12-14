module.exports = (sequelize, DataTypes) => {
    const Users = sequelize.define("Users", {
        id: {
            type: DataTypes.UUID,
            defaultVlue: DataTypes.UUIDV4,
            primaryKey: true,
            comment: "고유번호 UUID"
        },
        email: {
            type: DataTypes.STRING(255),
            validate: {
                isEmail: true,
            },
            comment: "이메일",
        }, 
        password: {
            type: DataTypes.STRING(255),
            comment: "비밀번호"
        },
        name: {
            type: DataTypes.STRING(255),
            comment: "이름"
        },
        phone_number: {
            type: DataTypes.STRING(72),
            comment: "전화번호"
        },
        likefarms: {
            type: DataTypes.INTEGER(),
            comment: "관심농장"
        },
    }, {
        charset: "utf8",
        collate: "utf8_general_ci",
        tableName: "Users",
        timestamps: true,
        paranoid: true,
    });

    return Users;
}