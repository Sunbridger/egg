const puppeteer = require('puppeteer');
const Event = require('events');

let errList = [];

async function watchTB(good_url, tit_price) {
    const browser = await puppeteer.launch({
        headless: true,
        dumpio: false,
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    const page = await browser.newPage();
    try {
        await page.goto(good_url);
        await page.waitForSelector('#J_StrPriceModBox > dd > span');
        const new_price = await page.evaluate(() => document.querySelector('#J_StrPriceModBox > dd > span').innerText);
        await page.close();
        await browser.close();
        console.log('✅ 爬取成功');
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
            interval: '10m',
            type: 'all',
            immediate: true
        },
        async task(ctx) {
            console.time('start');
            const taobaos = await ctx.model.Taobao.findAll();
            if (taobaos.length) {
                if (taobaos.length > 6) {
                    require('events').EventEmitter.defaultMaxListeners = taobaos.length + 10;
                }
                let needUpdateArr = await Promise.all(taobaos.map(async good => {
                    const { good_url, tit_price } = good.dataValues;
                    return await watchTB(good_url, tit_price);
                }));
                needUpdateArr = needUpdateArr.filter(el => el);
                while (errList.length) {
                    let arr = await Promise.all(errList.map(async (good, index) => {
                        const { good_url, tit_price } = good;
                        errList.splice(index, 1);
                        return await watchTB(good_url, tit_price);
                    }));
                    arr = arr.filter(el => el);
                    needUpdateArr.push(...arr);
                }
                needUpdateArr.forEach(async good => {
                    const thisgood = await ctx.model.Taobao.findByPk(good.good_url);
                    const new_price = thisgood.dataValues.new_price ? `${thisgood.dataValues.new_price},${good.new_price}` : good.new_price;
                    await thisgood.update({
                        new_price
                    });
                    console.log('✅ 更新完成');
                });
            }
        }
    }
};
