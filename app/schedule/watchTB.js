const puppeteer = require('puppeteer');
const path = p => require('path').resolve(__dirname, '../../assets', p);
async function watchTB(good_url, tit_price) {
    const browser = await puppeteer.launch({
        headless: true,
        dumpio: false,
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    const page = await browser.newPage();
    await page.setViewport({
        width: 375,
        height: 667
    });
    await page.setUserAgent('Mozilla/5.0 (iPhone; CPU iPhone OS 11_0 like Mac OS X) AppleWebKit/604.1.38 (KHTML, like Gecko) Version/11.0 Mobile/15A372 Safari/604.1');
    await page.goto(good_url);
    await page.content();
    await page.waitFor(6000);
    const result = await page.evaluate(() => {
        console.log(document.querySelector('.real-price'),'sadadas');
        let new_price = document.querySelector('.real-price').innerText;
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
            interval: '2m',
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
