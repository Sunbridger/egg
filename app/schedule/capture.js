const puppeteer = require('puppeteer');
const sendMail = require('../core/sendEmail');

async function gethotkey(browser) {
    let page = await browser.newPage();
    try {
        await page.goto('https://s.weibo.com/top/summary?cate=realtimehot');
        await page.waitForSelector('#pl_top_realtimehot');
        const result = await page.evaluate(() => {
            let hotsRow = [...document.querySelectorAll('.td-02')].slice(1, 21).map(ele => ({
                text: ele.firstElementChild.innerText,
                link: ele.firstElementChild.href,
                icon: ele.querySelector('img') ? ele.querySelector('img').src : ''
            }));
            return hotsRow;
        });
        await page.close();
        return result;
    } catch (error) {
        await page.close();
        console.log(error.name, 'xxxxxx爬取错误');
        sendMail({
            from: '"爬虫gethotkey发生错误" <739272884@qq.com>',
            to: 'sunbridger@sina.com',
            subject: '爬虫gethotkey发生错误',
            html: `<h2>${error.name}</h2><span>${JSON.stringify(error)}</span>`
        });
        return [];
    }
}

module.exports = app => {
    return {
        schedule: {
            interval: '30s',
            type: 'worker'
        },
        async task(ctx) {
            const browser = await puppeteer.launch({
                headless: true,
                dumpio: false,
                args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage']
            });
            const hots = await gethotkey(browser);
            await Promise.all(hots.map(async row => {
                const hasText = await ctx.model.Hots.findByPk(row.text);
                if (!hasText) {
                    try {
                        await ctx.model.Hots.create(row);
                    } catch (error) {
                        ctx.logger.info(error, '错误 sql一起写入了？？？');
                    }
                } else {
                    const num = hasText.dataValues.num + 1;
                    try {
                        await hasText.update({
                            num
                        });
                    } catch (error) {
                        ctx.logger.info(error, '更新错误？？？');
                    }
                }
            }));
            await browser.close();
        }
    }
};
