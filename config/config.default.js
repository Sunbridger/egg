module.exports = appInfo => {
    const config = exports = {};
    config.keys = appInfo.name + '_1571196274937_2647';
    config.middleware = [];
    // 使用sequelize操作数据库的
    config.sequelize = {
        dialect: 'mysql',
        host: '127.0.0.1',
        port: 3306,
        username: 'root',
        password: '123456',
        database: 'egg',
    };
    return {
        ...config,
    };
};
