import { Sequelize } from "sequelize";

export default class Users extends Sequelize.Model{
    static init(sequielize) {
        return super.init(
            {
                id: {
                    type: Sequelize.UUID,
                    defaultVlue: Sequelize.UUIDV4,
                    allowNull: false,
                    unique: true,
                    primaryKey: true,
                    comment: "고유번호 UUID"
                },
                email: {
                    type: Sequelize.STRING(255),
                    validate: {
                        isEmail: true,
                    },
                    comment: "이메일",
                }, 
                password: {
                    type: Sequelize.STRING(255),
                    comment: "비밀번호"
                },
                name: {
                    type: Sequelize.STRING(255),
                    comment: "이름"
                },
                phone_number: {
                    type: Sequelize.STRING(72),
                    comment: "전화번호"
                },
                likefarms: {
                    type: Sequelize.INTEGER(),
                    comment: "관심농장"
                },
            }, {
                sequielize,
                underscored: false,
                modelNmae: "Users",
                tableName: "Users",
                charset: "utf8",
                collate: "utf8_general_ci",
                tableName: "Users",
                timestamps: true,
                paranoid: true, //deletedAt 컬럼 생성
            }
        );
    }
    static associate(db){}
};
