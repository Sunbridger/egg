module.exports = app => {
    const { STRING, INTEGER, DATE } = app.Sequelize;
    const hots = app.model.define('hots', {
        text: { type: STRING(255), primaryKey: true },
        num: INTEGER(255),
        created_at: DATE,
        updated_at: DATE
    }, {
        timestamps: true,
        freezeTableName: true
    });
    return hots;
};
