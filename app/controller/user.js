const Controller = require('egg').Controller;
class UserController extends Controller {
    async get() {
        const { ctx } = this;
        ctx.body = await ctx.service.user.get(ctx.query);
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

    async getweibo() {
        const { ctx } = this;
        ctx.body = await ctx.service.user.getweibo(ctx.query);
    }

    async gethot() {
        const { ctx } = this;
        ctx.body = await ctx.service.user.gethot(ctx.query);
    }

    async deletetaobao() {
        const { ctx } = this;
        ctx.body = await ctx.service.user.deletetaobao(ctx.query);
    }

    async todayhot() {
        const { ctx } = this;
        ctx.body = await ctx.service.user.todayhot(ctx.query);
    }

    async sendEmail() {
        const { ctx } = this;
        ctx.body = await ctx.service.user.sendEmail(ctx.query);
    }

    async getVirus() {
        const { ctx } = this;
        ctx.body = await ctx.service.user.getVirus(ctx.query);
    }

    async getAllHots() {
        const { ctx } = this;
        ctx.body = await ctx.service.user.getAllHots(ctx.query);
    }

    async sendmaidian() {
        const { ctx } = this;
        ctx.body = await ctx.service.user.sendmaidian(ctx.query);
    }
}

module.exports = UserController;
