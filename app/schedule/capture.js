const puppeteer = require('puppeteer');
const path = p => require('path').resolve(__dirname, '../../assets', p);
async function scrape(imgname) {
    const browser = await puppeteer.launch({
        headless: true,
        dumpio: false,
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    const page = await browser.newPage();
    await page.goto('https://m.weibo.cn/p/index?containerid=106003type%3D25%26t%3D3%26disable_hot%3D1%26filter_type%3Drealtimehot&title=%E5%BE%AE%E5%8D%9A%E7%83%AD%E6%90%9C&extparam=pos%3D0_0%26mi_cid%3D100103%26cate%3D10103%26filter_type%3Drealtimehot%26c_type%3D30%26display_time%3D1574150135&luicode=10000011&lfid=231583', {
        timeout: 3000000
    });
    await page.setViewport({
        width: 375,
        height: 667
    });
    await page.content();
    await page.waitFor(3000);
    await page.screenshot({
        path: path(imgname)
    });
    await page.close();
    await browser.close();
}


module.exports = app => {
    return {
        schedule: {
            interval: '60m', // 6分钟间隔
            type: 'all', // 指定所有的 worker 都需要执行
            // cron: '0 0 2 * * *', //每天2点准时爬取一遍
          },
          async task(ctx) {
              const name = new Date().toString() + '.jpg';
              await scrape(name);
              const url = app.config.domain + name;
              await ctx.model.Imgs.create({url});
              ctx.logger.info('定时器任务执行完成');
          }
    }
};
