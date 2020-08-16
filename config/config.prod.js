// 测试环境
module.exports = appInfo => {
    const config = exports = {};
    config.keys = appInfo.name + '_1571196274937_2647';
    config.middleware = [];
    // 使用sequelize操作数据库的
    config.sequelize = {
        dialect: 'mysql',
        host: 'tenxun-mysql',
        port: 3306,
        username: 'root',
        password: '123456',
        database: 'weibo',
        timezone: '+08:00'
    };

    config.cors = {
        origin: '*'',
        // origin: 'http://sunbridger.top',
        allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH,OPTIONS',
        credentials: true
    };
    // config.security = {
    //     csrf: {
    //         enable: false
    //     },
    //     domainWhiteList: ['*']
    // };
    config.static = {
        maxAge: 31536000,
        prefix: '',
        dir: require('path').resolve(__dirname, '../assets/'),
        dynamic: true
    };
    config.domain = 'http://sunbridger.top:7001/';

    config.middleware = [ 'compress' ];
    config.compress = {
        threshold: 1000,
    };

    return {
        ...config,
    };
};
