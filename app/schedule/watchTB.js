const puppeteer = require('puppeteer');
const path = p => require('path').resolve(__dirname, '../../assets', p);
async function watchTB(good_url, tit_price) {
    const browser = await puppeteer.launch({
        headless: true,
        dumpio: false,
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    const page = await browser.newPage();
    await page.goto(good_url, {
        timeout: 300000
    });
    await page.content();
    await page.waitFor(10000);
    const result = await page.evaluate(() => {
        let new_price = document.querySelector('#J_StrPriceModBox > dd > span').innerText;
        return {
            new_price
        };
    });
    await page.close();
    await browser.close();
    if (result.new_price !== tit_price) {
        console.log('❌ 价格不一样了');
        return {
            good_url,
            new_price: result.new_price
        }
    }
    console.log('✅ 正常结束咯');
}

module.exports = app => {
    return {
        schedule: {
            interval: '10m',
            type: 'all'
        },
        async task(ctx) {
            const taobaos = await ctx.model.Taobao.findAll();
            if (taobaos.length) {
                let needUpdateArr = await Promise.all(taobaos.map(async good => {
                    const { good_url, tit_price } = good.dataValues;
                    return await watchTB(good_url, tit_price);
                }));
                needUpdateArr = needUpdateArr.filter(el => el);
                needUpdateArr.forEach(async good => {
                    const thisgood = await ctx.model.Taobao.findByPk(good.good_url);
                    await thisgood.update({
                        new_price: `${thisgood.dataValues.new_price},${good.new_price}`
                    });
                    console.log('✅ 更新完成')
                });
            } else {
                console.log('暂无watch的😁');
            }
        }
    }
};
