const puppeteer = require('puppeteer');

async function pageEvaluate(page, index = 1) {
    await page.click(`#app > div.main-wrap > div.lite-topbar.main-top > div.nav-main > div > div.m-box-col.inner-box > div > div > ul > li:nth-child(${index})`);
    await page.waitFor(10000);
    const result = await page.evaluate(async () => {
        const result = Array.from(document.querySelectorAll('.f-weibo')).map(node => {
            console.log(node, 'nodejiedian');
            let ava_url = node.querySelector('.m-img-box > img').src;
            let name = node.querySelector('.m-text-cut').innerText;
            let text = node.querySelector('.weibo-text').innerHTML;
            let send_num = node.querySelector('footer > div:nth-child(1) > h4').innerText;
            let comment_num = node.querySelector('footer > div:nth-child(2) > h4').innerText;
            let goods_num = node.querySelector('footer > div:nth-child(3) > h4').innerText;
            let imgs = '';
            let imgFlag = node.querySelectorAll('article .m-img-box');
            if (imgFlag) {
                imgs = JSON.stringify(Array.from(imgFlag).map(el => el.querySelector('img').src));
            }
            return {
                name,
                ava_url,
                text,
                imgs,
                send_num,
                comment_num,
                goods_num
            }
        });
        return result
    });
    return result;
}

async function gethotnew() {
    const browser = await puppeteer.launch({
        headless: true,
        dumpio: false,
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    const page = await browser.newPage();
    // 设置浏览器信息
    const UA = 'Mozilla/5.0 (iPhone; CPU iPhone OS 11_0 like Mac OS X) AppleWebKit/604.1.38 (KHTML, like Gecko) Version/11.0 Mobile/15A372 Safari/604.1';
    await Promise.all([
        page.setCacheEnabled(false),
        page.setUserAgent(UA),
        page.setJavaScriptEnabled(true)
    ]);
    await page.goto(`https://m.weibo.cn/`);
    await page.waitFor(3000);
    const result1 = await pageEvaluate(page);
    const result3 = await pageEvaluate(page, 3);
    const result4 = await pageEvaluate(page, 4);
    const result5 = await pageEvaluate(page, 5);
    const result6 = await pageEvaluate(page, 6);
    const result7 = await pageEvaluate(page, 7);
    const result8 = await pageEvaluate(page, 8);
    const result9 = await pageEvaluate(page, 9);
    const result10 = await pageEvaluate(page, 10);
    const reaultall = result1.concat(result3, result4, result5, result6, result7, result8, result9, result10);
    await page.close();
    await browser.close();
    return reaultall;
}

module.exports = app => {
    return {
        schedule: {
            interval: '2m', // 6分钟间隔
            type: 'all', // 指定所有的 worker 都需要执行
        },
        async task(ctx) {
            const newsArr = await gethotnew();
            newsArr.forEach(async news => {
                await ctx.model.Sunbridger.create(news);
                console.log(`✅ ${news.name}的文章插入完成了`);
            })
        }
    }
};
