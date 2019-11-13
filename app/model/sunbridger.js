module.exports = app => {
    const { STRING, INTEGER } = app.Sequelize;
    const Sunbridger = app.model.define('sunbridger', {
        id: { type: INTEGER, primaryKey: true, autoIncrement: true },
        name: STRING(255),
        ava_url: STRING(255),
        text: STRING(255),
        time: STRING(255),
        from: STRING(255),
        send_num: STRING(255),
        comment_num: STRING(255),
        goods_num: STRING(255)
    }, {
        timestamps: false, //，默认情况下 自动维护时间戳
        freezeTableName: true //禁止修改表名，默认情况下，sequelize将自动将所有传递的模型名称（define的第一个参数）转换为复数
    });
    return Sunbridger;
};
