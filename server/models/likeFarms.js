const LikeFarms = (sequelize,DataTypes ) => {
    const LikeFarms = sequelize.define(
        'LikeFarms',
        {
            user_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
            }
        },
        {
            charset: 'utf8',
			collate: 'utf8_general_ci', //한글 저장
			timestamps: true,
        }
    );

    LikeFarms.associate = (db) => {
        db.LikeFarms.belongsTo(db.Farms, {
            foreignKey: 'farm_id',
            targetKey: 'id',
        });
    };

    LikeFarms.createLike = (like) => {
        return LikeFarms.create(like);
    }



    return LikeFarms;
};

export default LikeFarms;