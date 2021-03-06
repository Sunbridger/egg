const puppeteer = require('puppeteer');
const Event = require('events');
// const sendMail = require('../core/sendEmail');

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
            interval: '300s',
            type: 'worker'
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
                    Event.EventEmitter.defaultMaxListeners = taobaos.length + 12;
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
                    const new_price = JSON.parse(thisgood.dataValues.new_price || '{}');
                    const priceArr = Object.keys(new_price);
                    if (priceArr.length) {
                        if (!priceArr.includes(good.new_price)) {
                            await thisgood.update({
                                new_price: JSON.stringify({
                                    ...new_price,
                                    [good.new_price]: new Date().getTime()
                                })
                            });
                            ctx.logger.info('✅ 更新完成');
                            // sendMail({
                            //     from: '"爬虫京东价格👀👀👀" <739272884@qq.com>',
                            //     to: 'sunbridger@sina.com',
                            //     subject: '爬虫watchJD发生错误',
                            //     html: `<h2>${good.new_price}</h2> <a href='${good.good_url}'>这个商品最新价格有波动</a>`
                            // });
                        }
                    } else {
                        await thisgood.update({
                            new_price: JSON.stringify({
                                [good.new_price]: new Date().getTime()
                            })
                        });
                        ctx.logger.info('✅ 更新完成');
                    }
                });
            }
        }
    }
};
