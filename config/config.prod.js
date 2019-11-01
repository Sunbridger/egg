// 生产环境
module.exports = appInfo => {
    const config = exports = {};
    config.cors = {
        origin: '*',
        allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH,OPTIONS',
        credentials: true
    };
    return {
        ...config,
    };
};
