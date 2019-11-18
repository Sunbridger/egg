const puppeteer = require('puppeteer');
const path = p => require('path').resolve(__dirname, '../../assets', p);
async function scrape() {
    const browser = await puppeteer.launch({headless: true});
    const page = await browser.newPage();
    await page.goto('https://m.weibo.cn/p/index?containerid=106003type%3D25%26t%3D3%26disable_hot%3D1%26filter_type%3Drealtimehot&title=%E5%BE%AE%E5%8D%9A%E7%83%AD%E6%90%9C', {
        timeout: 3000000
    });
    await page.setViewport({
        width: 375,
        height: 667
    });
    const imgname = new Date().toString() + '.jpg';
    await page.screenshot({
        path: path(imgname),
        fullPage: true
    });
    await browser.close();
}


module.exports = {
    schedule: {
      interval: '60m', // 1 分钟间隔
      type: 'all', // 指定所有的 worker 都需要执行
      immediate: true
    },
    async task(ctx) {
        await scrape();
        ctx.logger.info('定时器任务执行完成');
    }
};
