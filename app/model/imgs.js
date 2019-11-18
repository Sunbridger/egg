module.exports = app => {
    const { STRING, INTEGER } = app.Sequelize;
    const imgs = app.model.define('imgs', {
        id: { type: INTEGER, primaryKey: true, autoIncrement: true },
        url: STRING(255),
    }, {
        timestamps: false,
        freezeTableName: true
    });
    return imgs;
};
