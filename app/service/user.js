'use strict';

const Service = require('egg').Service;

class HomeServicer extends Service {
    async get(params) {
        const { index, pageSize } = params;
        const result = await this.ctx.model.Bangjie.findAll({
            limit: parseInt(pageSize),
            offset: parseInt(index)*parseInt(pageSize),
            order: [['id', 'DESC']]
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
            offset: parseInt(index)*parseInt(pageSize),
            order: [['id', 'DESC']]
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
    async getweibo(params) {
        const { index, pageSize } = params;
        const result = await this.ctx.model.Imgs.findAll({
            limit: parseInt(pageSize),
            offset: parseInt(index)*parseInt(pageSize),
            order: [['id', 'DESC']]
        });
        return result;
    }
    async gethot(params) {
        const { index, pageSize } = params;
        const result = await this.ctx.model.Hots.findAll({
            limit: parseInt(pageSize) || 20,
            offset: parseInt(index)*parseInt(pageSize) || 0,
            order: [['num', 'DESC']]
        });
        return result;
    }
    async deletetaobao(params) {
        const { good_url } = params;
        const good = await this.ctx.model.Taobao.findByPk(good_url);
        return await good.destroy();
    }

}

module.exports = HomeServicer;
