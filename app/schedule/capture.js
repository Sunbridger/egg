const puppeteer = require('puppeteer');
const path = p => require('path').resolve(__dirname, '../../assets', p);
async function gethotkey(browser) {
    const page = await browser.newPage();
    await page.goto('https://m.weibo.cn/search?containerid=231583');
    await page.waitForSelector('#app > div:nth-child(1) > div:nth-child(1) > div.card.m-panel.card16.m-col-2 > div > div .m-item-box .m-text-cut');
    const result = await page.evaluate(() => {
        let hots = [...document.querySelectorAll('#app > div:nth-child(1) > div:nth-child(1) > div.card.m-panel.card16.m-col-2 > div > div .m-item-box .m-text-cut')].map(ele => ele.innerText);
        hots.pop();
        return hots;
    });
    await page.close();
    return result;
}

module.exports = app => {
    return {
        schedule: {
            interval: '20s',
            type: 'worker'
        },
        async task(ctx) {
            const browser = await puppeteer.launch({
                headless: true,
                dumpio: false,
                args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage']
            });
            const hots = await gethotkey(browser);
            await Promise.all(hots.map(async text => {
                const hasText = await ctx.model.Hots.findByPk(text);
                if (!hasText) {
                    try {
                        await ctx.model.Hots.create({ text });
                    } catch (error) {
                        ctx.logger.info(error, '错误 sql一起写入了？？？');
                    }
                } else {
                    const num = hasText.dataValues.num + 1;
                    await hasText.update({
                        num
                    });
                }
            }));
            await browser.close();
        }
    }
};
