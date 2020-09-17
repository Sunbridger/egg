module.exports = app => {
    const { STRING, INTEGER } = app.Sequelize;
    const Bangjie = app.model.define('maidian', {
        id: { type: INTEGER, primaryKey: true, autoIncrement: true },
        ua: STRING(255),
        created_at: STRING(255),
        updated_at: STRING(255)
    }, {
        timestamps: true, //，默认情况下 自动维护时间戳
        freezeTableName: true //禁止修改表名，默认情况下，sequelize将自动将所有传递的模型名称（define的第一个参数）转换为复数
    });
    return Bangjie;
};
