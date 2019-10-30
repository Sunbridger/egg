'use strict';

const Controller = require('egg').Controller;
const project = require('../model/project');
const fs = require('fs');

class HomeController extends Controller {
    async look() {
        const { ctx } = this;
        // const query = { id: 30};
        ctx.body = await ctx.service.home.find();
        // ctx.body = await ctx.model.User.findAll(query);
    }
    async add() {
        const { ctx, app } = this;
        const { name, age } = ctx.request.query; // get请求获取参数
        // const { name, age } = ctx.request.body; // post请求获取参数
        const user = await ctx.model.User.create({ name, age });
        // 只能这样动态创建表么？？？？
        await this.app.mysql.query(project.createTable('xxxxxxx'))
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
    async get() {
        // fs读取默认是项目的根目录
        const results = await fs.readFileSync('./README.md');
        this.ctx.body = results;
    }
    async newTable() {
        const { ctx } = this;
        const u = await ctx.model.User.create({
            name: 'xxxx',
            age: 22
        });
        ctx.body = u;
    }
}

module.exports = HomeController;
