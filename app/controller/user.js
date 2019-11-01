const Controller = require('egg').Controller;

class UserController extends Controller {
    async get() {
        const { ctx } = this;
        ctx.body = await ctx.service.user.get();
    }

    async create() {
        const ctx = this.ctx;
        ctx.body = await ctx.service.user.create();
    }
}

module.exports = UserController;