const puppeteer = require('puppeteer');
const path = p => require('path').resolve(__dirname, '../../assets', p);
async function scrape(imgname) {
    const browser = await puppeteer.launch({
        headless: true,
        dumpio: false,
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    const page = await browser.newPage();
    await page.goto('https://h5.m.taobao.com/', {
        timeout: 3000000
    });
    await page.setViewport({
        width: 375,
        height: 667
    });
    await page.screenshot({
        path: path(imgname),
        fullPage: true
    });
    await browser.close();
}


module.exports = {
    schedule: {
      interval: '1m', // 6分钟间隔
      type: 'all', // 指定所有的 worker 都需要执行
      immediate: true
    },
    async task(ctx) {
        const name = new Date().toString() + '.jpg';
        await scrape(name);
        const url = 'http://47.96.149.250:7001/' + name;
        await ctx.model.Imgs.create({url});
        ctx.logger.info('定时器任务执行完成');
    }
};
