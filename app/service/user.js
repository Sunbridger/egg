'use strict';

const Service = require('egg').Service;

class HomeServicer extends Service {
    async get(params) {
        const { index, pageSize } = params;
        const result = await this.ctx.model.Bangjie.findAll({
            limit: parseInt(pageSize),
            offset: parseInt(index)*parseInt(pageSize)
        });
        return result;
    }
    async create() {
        const { ctx } = this;
        const { name, age } = ctx.request.query;
        return await ctx.model.Bangjie.create({ name, age });
    }
    async getme(params) {
        const { index, pageSize } = params;
        const result = await this.ctx.model.Sunbridger.findAll({
            limit: parseInt(pageSize),
            offset: parseInt(index)*parseInt(pageSize)
        });
        return result;
    }
    async gettaobao(params) {
        const { index, pageSize } = params;
        const result = await this.ctx.model.Taobao.findAll({
            limit: parseInt(pageSize),
            offset: parseInt(index)*parseInt(pageSize)
        });
        return result;
    }
}

module.exports = HomeServicer;
