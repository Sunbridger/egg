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
}

module.exports = HomeController;
