const Controller = require('egg').Controller;
class PuppeteerController extends Controller {

    async getpriceAndName() {
        const { ctx } = this;
        ctx.body = await ctx.service.puppeteer.getpriceAndName(ctx.query);
    }
}

module.exports = PuppeteerController;
