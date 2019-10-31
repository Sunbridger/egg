'use strict';

const Service = require('egg').Service;

class HomeServicer extends Service {
  async find() {
    return {
        name: 'sunbeidgr',
        age: 20222
      };
  }
}

module.exports = HomeServicer;
