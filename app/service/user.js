'use strict';

const Service = require('egg').Service;

class HomeServicer extends Service {
    async get() {
        const result = await this.ctx.model.User.findAll();
        return result;
    }
    async create() {
        const { ctx } = this;
        const { name, age } = ctx.request.query;
        return await ctx.model.User.create({ name, age });
    }
}

module.exports = HomeServicer;
