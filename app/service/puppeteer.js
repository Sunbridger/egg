const Service = require('egg').Service;
const puppeteer = require('puppeteer');

async function getTBDeatil(good_url, timewait = 16000) {
    const browser = await puppeteer.launch({
        headless: false,
        dumpio: false,
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    const page = await browser.newPage();
    await page.goto(good_url, {
        timeout: 300000
    });
    await page.waitFor(timewait);
    console.log('✅ 正常打开了页面了啊');
    const result = await page.evaluate(() => {
        console.log(document.querySelector('#J_StrPriceModBox > dd > span'), 'sdasdasdadasd');
        let tit_price = document.querySelector('#J_StrPriceModBox > dd > span').innerText;
        let good_title = document.querySelector('#J_DetailMeta > div.tm-clear > div.tb-property > div > div.tb-detail-hd > h1').innerText;
        let good_img = document.querySelector('#J_ImgBooth').src;
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
        const hasFlag = await this.ctx.model.Taobao.findByPk(good_url);
        if (!hasFlag) {
            const crawresult = await getTBDeatil(good_url);
            const result = await this.ctx.model.Taobao.create(crawresult);
            return result;
        }
        return hasFlag;
    }
}

module.exports = Puppeteer;
