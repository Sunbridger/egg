module.exports = app => {
    const { STRING, INTEGER, TEXT } = app.Sequelize;
    const taoBao = app.model.define('taobao', {
        id: { type: INTEGER, primaryKey: true, autoIncrement: true },
        good_title: STRING(255),
        good_url: TEXT(255),
        good_img: TEXT(255),
        tit_price: STRING(15),
    }, {
        timestamps: false, //，默认情况下 自动维护时间戳
        freezeTableName: true //禁止修改表名，默认情况下，sequelize将自动将所有传递的模型名称（define的第一个参数）转换为复数
    });
    return taoBao;
};
