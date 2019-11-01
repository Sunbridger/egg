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
    config.cors = {
        origin: 'http://47.96.149.250:3000', // 正式外网环境
        allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH,OPTIONS',
        credentials: true
    };
    config.security = {
        csrf: {
            enable: false
        },
        domainWhiteList: ['*']
    };
    return {
        ...config,
    };
};
