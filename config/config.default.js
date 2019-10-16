/* eslint valid-jsdoc: "off" */

'use strict';

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1571196274937_2647';

  // add your middleware config here
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
    // 使用原本mysql操作
  config.mysql = {
    // 单数据库信息配置
    client: {
        // host
        host: '127.0.0.1',
        // 端口号
        port: 3306,
        // 用户名
        user: 'root',
        // 密码
        password: '123456',
        // 数据库名
        database: 'egg',
    }
};

  return {
    ...config,
  };
};
