const puppeteer = require('puppeteer');
const Event = require('events');

let errList = [];
let browser = null;
async function watchJD(good_url, tit_price) {
    let page = await browser.newPage();
    try {
        await page.goto(good_url);
        await page.waitForSelector('#priceSale');
        const new_price = await page.evaluate(() => document.querySelector('#priceSale').innerText);
        await page.close();
        console.log('✅  页面爬取成功咯');
        if (new_price !== tit_price) {
            return {
                good_url,
                new_price
            }
        }
    } catch (err) {
        console.log('❌ 即将进入下一轮');
        await page.close();
        errList.push({
            good_url,
            tit_price
        });
        return false;
    }
}

module.exports = app => {
    return {
        schedule: {
            interval: '60m',
            type: 'all'
        },
        async task(ctx) {
            if (browser) {
                await browser.close();
            }
            const taobaos = await ctx.model.Taobao.findAll();
            if (taobaos.length) {
                browser = await puppeteer.launch({
                    headless: true,
                    dumpio: false,
                    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage']
                });
                if (taobaos.length > 7) {
                    Event.EventEmitter.defaultMaxListeners = taobaos.length + 10;
                }
                let needUpdateArr = await Promise.all(taobaos.map(async good => {
                    const { good_url, tit_price } = good.dataValues;
                    return await watchJD(good_url, tit_price);
                }));
                needUpdateArr = needUpdateArr.filter(el => el);
                while (errList.length) {
                    let arr = await Promise.all(errList.map(async (good, index) => {
                        const { good_url, tit_price } = good;
                        errList.splice(index, 1);
                        return await watchJD(good_url, tit_price);
                    }));
                    arr = arr.filter(el => el);
                    needUpdateArr.push(...arr);
                }
                await browser.close();
                needUpdateArr.forEach(async good => {
                    const thisgood = await ctx.model.Taobao.findByPk(good.good_url);
                    if (thisgood.dataValues.new_price && thisgood.dataValues.new_price.indexOf(good.new_price) === -1) {
                        const new_price = thisgood.dataValues.new_price ? `${thisgood.dataValues.new_price},${good.new_price}` : good.new_price;
                        await thisgood.update({
                            new_price
                        });
                        console.log('✅ 更新完成');
                    }
                });
            }
        }
    }
};
