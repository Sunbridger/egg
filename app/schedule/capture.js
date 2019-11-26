const puppeteer = require('puppeteer');
const path = p => require('path').resolve(__dirname, '../../assets', p);
async function gethotkey() {
    const browser = await puppeteer.launch({
        headless: true,
        dumpio: false,
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    const page = await browser.newPage();
    await page.goto('https://m.weibo.cn/search?containerid=231583');
    await page.waitForSelector('#app > div:nth-child(1) > div:nth-child(1) > div.card.m-panel.card16.m-col-2 > div > div .m-item-box .m-text-cut');
    const result = await page.evaluate(() => {
        let hots = Array.from(document.querySelectorAll('#app > div:nth-child(1) > div:nth-child(1) > div.card.m-panel.card16.m-col-2 > div > div .m-item-box .m-text-cut')).map(ele => ele.innerText);
        hots.pop();
        return hots;
    });
    await page.close();
    await browser.close();
    return result;
}

module.exports = app => {
    return {
        schedule: {
            interval: '30s', // 6分钟间隔
            type: 'all' // 指定所有的 worker 都需要执行
        },
        async task(ctx) {
            const hots = await gethotkey();
            hots.forEach(async text => {
                const hasText = await ctx.model.Hots.findByPk(text);
                if (!hasText) {
                    await ctx.model.Hots.create({text});
                } else {
                    const num = hasText.dataValues.num + 1;
                    await hasText.update({
                        num
                    });
                }
            })
        }
    }
};
