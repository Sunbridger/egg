module.exports = app => {
    const { STRING, INTEGER } = app.Sequelize;
    const hots = app.model.define('hots', {
        text: { type: STRING(255), primaryKey: true },
        num: INTEGER(255)
    }, {
        timestamps: false,
        freezeTableName: true
    });
    return hots;
};
