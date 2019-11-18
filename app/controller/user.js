const Controller = require('egg').Controller;
class UserController extends Controller {
    async get() {
        const { ctx } = this;
        // ctx.body = await ctx.service.user.get(ctx.query);
        ctx.body = {
            msg: '服务开启'
        }
    }

    async create() {
        const ctx = this.ctx;
        ctx.body = await ctx.service.user.create();
    }

    async getme() {
        const { ctx } = this;
        ctx.body = await ctx.service.user.getme(ctx.query);
    }

    async gettaobao() {
        const { ctx } = this;
        ctx.body = await ctx.service.user.gettaobao(ctx.query);
    }

    async getcap() {
        const { ctx } = this;
        ctx.set('Content-Type', 'image/svg+xml');
        ctx.body = require('svg-captcha').create();
    }
}

module.exports = UserController;
