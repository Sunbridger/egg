'use strict';

const Service = require('egg').Service;

class HomeServicer extends Service {
  async find() {
    return {
        name: 'xxx',
        age: 20
      };
  }
}

module.exports = HomeServicer;
