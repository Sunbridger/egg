const Service = require('egg').Service;
const sequelize = require('sequelize');
const sendMail = require('../core/sendEmail');
const Op = sequelize.Op;

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
            limit: parseInt(pageSize) || 100,
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
    async todayhot(params) {
        const result = await this.ctx.model.Hots.findAll({
            where: {
                created_at: {
                    [Op.gt]: sequelize.literal('CURRENT_DATE')
                }
            },
            limit: params.limit || 20,
            order: [['num', 'DESC']]
        });
        return result;
    }
    async getVirus() {
        const result = await this.ctx.model.Hots.findAll({
            where: {
                text: {
                    [Op.like]: sequelize.literal('"%病毒%"')
                }
            },
            order: [['num', 'DESC']]
        });
        return result;
    }
    async sendEmail(params) {
        const { email, name } = params;
        await sendMail({
            from: '"乔乔乔小助手" <739272884@qq.com>',
            to: `sunbridger@sina.com, ${email}`,
            subject: `亲爱的${name}你好: `,
            html: `亲爱的${name}你好，欢迎注册数好助手👏👏👏`
        })
        return true;
    }

}

module.exports = HomeServicer;
