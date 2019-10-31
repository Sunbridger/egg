const Controller = require('egg').Controller;

function toInt(str) {
  if (typeof str === 'number') return str;
  if (!str) return str;
  return parseInt(str, 10) || 0;
}

class UserController extends Controller {
  async index() {
    const ctx = this.ctx;
    ctx.body = await ctx.model.User.findAll();
  }

  async create() {
    const ctx = this.ctx;
    const { name, age } = ctx.request.query;
    const user = await ctx.model.User.create({ name, age });
    ctx.status = 201;
    ctx.body = user;
  }
}

module.exports = UserController;