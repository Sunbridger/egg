// 生产环境
module.exports = appInfo => {
    const config = exports = {};
    config.cors = {
        origin: 'http://47.96.149.250:3000', 
        allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH,OPTIONS',
        credentials: true
    };
    return {
        ...config,
    };
};
