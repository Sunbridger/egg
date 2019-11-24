const Service = require('egg').Service;
const puppeteer = require('puppeteer');

async function getTBDeatil(good_url, timewait = 6000) {
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
    await page.waitFor(timewait);
    const result = await page.evaluate(() => {
        let tit_price = document.querySelector('.real-price').innerText;
        let good_title = document.querySelector('.main').innerText;
        let good_img = document.querySelector('.scroller.preview-scroller > a:nth-child(2) > img').src;

        return {
            tit_price,
            good_title,
            good_img
        };
    });
    await page.close();
    await browser.close();
    result.good_url = good_url;
    return result;
}

class Puppeteer extends Service {
    async getpriceAndName(params) {
        const { good_url } = params;
        const result = await getTBDeatil(good_url);
        const hasFlag = await this.ctx.model.Taobao.findByPk(good_url);
        if (!hasFlag) {
            await this.ctx.model.Taobao.create(result);
        }
        return result;
    }
}

module.exports = Puppeteer;
