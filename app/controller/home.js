'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
    async look() {
        const { ctx } = this;
        // const res = await ctx.service.home.find();
        const query = { id: 30};
        ctx.body = await ctx.model.User.findAll(query);
    }
    async add() {
        const { ctx } = this;
        const { name, age } = ctx.request.query; // get请求获取参数
        // const { name, age } = ctx.request.body; // post请求获取参数
        const user = await ctx.model.User.create({ name, age });
        ctx.status = 201;
        ctx.body = user;
    }
    async update() {
      const ctx = this.ctx;
      const id = toInt(ctx.params.id);
      const user = await ctx.model.User.findByPk(id);
      if (!user) {
        ctx.status = 404;
        return;
      }
  
      const { name, age } = ctx.request.body;
      await user.update({ name, age });
      ctx.body = user;
    }
  
    async destroy() {
      const ctx = this.ctx;
      const id = toInt(ctx.params.id);
      const user = await ctx.model.User.findByPk(id);
      if (!user) {
        ctx.status = 404;
        return;
      }
  
      await user.destroy();
      ctx.status = 200;
    }
}

module.exports = HomeController;
