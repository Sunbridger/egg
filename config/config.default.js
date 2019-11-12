// 测试环境
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
        database: 'weibo',
    };

    config.cors = {
        origin: '*',
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
