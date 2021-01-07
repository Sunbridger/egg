const puppeteer = require('puppeteer');
const pathTo = require('path').resolve(__dirname, '../../chrome-linux');
const fs = require('fs');


const clsObj = {
    clsName: '.wa-match-schedule-list-wrapper',
    dayClsName: '.date',
    itemsClsName: '.wa-match-schedule-list-item',
    openTimeClsName: '.c-gap-bottom-small',
    openStatusClsName: '.vs-info-status-linshi',
    teamNameClsName: '.vs-info-team-info .team-name',
    teamLogClsName: '.vs-info-team-info .team-row > .inline-block:nth-child(1)',
    teamScrollClsName: '.vs-info-team-info .team-score-num'
};


function getNbaList() {
    return new Promise(async (resolve, reject) => {
        const browser = await puppeteer.launch({
            headless: true,
            dumpio: false,
            args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage']
        });
        const page = await browser.newPage();
        await page.goto('https://tiyu.baidu.com/match/NBA/tab');
        const waps = await page.waitForSelector(clsObj.clsName);
        const result = await page.evaluate((clsObj) => {
            const {
                clsName, dayClsName, itemsClsName, openTimeClsName, openStatusClsName,
                teamNameClsName, teamLogClsName, teamScrollClsName
            } = clsObj;
            return [...document.querySelectorAll(clsName)].map((ondWarpBox) => {
                const day = ondWarpBox.querySelector(dayClsName).innerText;
                const items = [...ondWarpBox.querySelectorAll(itemsClsName)].map(rowItem => {
                    let openTime = rowItem.querySelector(openTimeClsName).innerText;
                    let openStatus = rowItem.querySelector(openStatusClsName).innerText;
                    let teamName1 = rowItem.querySelectorAll(teamNameClsName)[0].innerText;
                    let teamName2 = rowItem.querySelectorAll(teamNameClsName)[1].innerText;
                    let teamlog1 = rowItem.querySelectorAll(teamLogClsName)[0].style.backgroundImage.replace('url("', '').replace('")', '');
                    let teamlog2 = rowItem.querySelectorAll(teamLogClsName)[1].style.backgroundImage.replace('url("', '').replace('")', '');
                    let teamScroll1 = rowItem.querySelectorAll(teamScrollClsName)[0].innerText;
                    let teamScroll2 = rowItem.querySelectorAll(teamScrollClsName)[1].innerText;
                    return {
                        openTime,
                        openStatus,
                        teamName1,
                        teamName2,
                        teamlog1,
                        teamlog2,
                        teamScroll1,
                        teamScroll2
                    }
                });
                return {
                    day,
                    items
                }
            });
        }, clsObj);
        await page.close();
        await browser.close();
        resolve(result);
    });
}

async function handToDingTalk(res, ctx) {
    let textForDing = '';
    let OneDayHtml = res.map((row) => {
        const { day, items } = row;
        let itemHtml = '';
        items.forEach((e) => {
            const {
                openTime, openStatus, teamName1, teamName2, teamScroll1,
                teamlog1, teamlog2, teamScroll2
            } = e;
            itemHtml += `${openStatus} ${openTime} ${teamName1} (${teamScroll1}) VS ${teamName2} (${teamScroll2}) \n\n`;
        });
        return `${day}赛程安排\n\n ${itemHtml}`;

    });
    let dingText = '';
    OneDayHtml.forEach(e => {
        dingText += e;
    });

    await ctx.curl('https://oapi.dingtalk.com/robot/send?access_token=d07cd5b0ce7f7ad5aff5627f92086299ac29c79d9825b2ccbefcdffd9f9174ff', {
        contentType: 'json',
        method: 'POST',
        data: {
            "msgtype": "text",
            "text": {
                "content": dingText
            }
        }
    });

}

const checkCarTicket = async (ctx) => {
    const result = ctx.curl('https://kyfw.12306.cn/otn/leftTicket/queryT?leftTicketDTO.train_date=2021-02-05&leftTicketDTO.from_station=HGH&leftTicketDTO.to_station=YTG&purpose_codes=ADULT')
    console.log(result);
}

module.exports = app => {
    return {
        schedule: {
            cron: '30 30 16 * * *',
            type: 'worker',
            immediate: true
        },
        async task(ctx) {
            getNbaList().then((res) => {
                handToDingTalk(res, ctx);
            });

            // 12306 爬取接口数据
            checkCarTicket(ctx);
        }
    }
};
