const Service = require('egg').Service;
const puppeteer = require('puppeteer');

async function getTBDeatil(good_url) {
    const browser = await puppeteer.launch({
        headless: true,
        dumpio: false,
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    const page = await browser.newPage();
    await page.goto(good_url);
    await page.waitForSelector('#J_StrPriceModBox > dd > span');
    await page.waitForSelector('#J_DetailMeta > div.tm-clear > div.tb-property > div > div.tb-detail-hd > h1');
    await page.waitForSelector('#J_ImgBooth');
    const result = await page.evaluate(() => {
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
    return result;
}

async function getJDDetail(good_url) {
    const browser = await puppeteer.launch({
        headless: true,
        dumpio: false,
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    const page = await browser.newPage();
    try {
        await page.goto(good_url);
        await page.waitForSelector('#firstImg');
        const result = await page.evaluate(() => {
            let tit_price = document.querySelector('#priceSale').innerText;
            let good_title = document.querySelector('#itemName').innerText;
            let good_img = document.querySelector('#firstImg').src;
            return  {
                tit_price,
                good_title,
                good_img
            }
        });
        await page.close();
        await browser.close();
        return result;
    } catch (error) {
        console.log(error, '错误了');
        return '服务正忙 稍后再试';
    }
}

class Puppeteer extends Service {
    async getpriceAndName(params) {
        const { good_url } = params;
        const hasFlag = await this.ctx.model.Taobao.findByPk(good_url);
        if (!hasFlag) {
            const crawresult = await getTBDeatil(good_url);
            const result = await this.ctx.model.Taobao.create(Object.assign(crawresult, {good_url}));
            return result;
        }
        return hasFlag;
    }

    async getJDinfo(params) {
        const { good_url } = params;
        const hasFlag = await this.ctx.model.Taobao.findByPk(good_url);
        if (!hasFlag) {
            const crawresult = await getJDDetail(good_url);
            const result = await this.ctx.model.Taobao.create(Object.assign(crawresult, {good_url}));
            return result;
        }
        return hasFlag;
    }
}

module.exports = Puppeteer;
