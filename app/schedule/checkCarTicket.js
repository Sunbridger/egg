const sendMail = require('../core/sendEmail');

let stopSend = false;
let nowTime = 0;

const handZero = (n) => {
    return n > 9 ? n : `0${n}`;
};

const getDayNumber = () => {
    const date = new Date();
    const year = date.getFullYear();
    const month = handZero(date.getMonth() + 1);
    const day = handZero(date.getDay());
    return Number(`${year}${month}${day}`);
}

const getThirtyLater = () => {
    let date = new Date();
    date.setDate(date.getDate() + 29);
    const year = date.getFullYear();
    const month = handZero(date.getMonth() + 1);
    const day = handZero(date.getDay());
    return `${year}-${month}-${day}`;
};

const checkCarTicket = async (ctx) => {
    const time = getThirtyLater();
    if (stopSend && (nowTime ===  getDayNumber())) return;
    const result = await ctx.curl(`https://kyfw.12306.cn/otn/leftTicket/queryT?leftTicketDTO.train_date=${time}&leftTicketDTO.from_station=HGH&leftTicketDTO.to_station=YTG&purpose_codes=ADULT`, {
        dataType: 'json',
        method: 'GET',
        headers: {
            'Cookie': '_uab_collina=160488793265541491548447; JSESSIONID=D1534A49A86DCAD1739B4A82D5CE0571; _jc_save_wfdc_flag=dc; BIGipServerpool_passport=98828810.50215.0000; route=6f50b51faa11b987e576cdb301e545c4; _jc_save_fromStation=%u676D%u5DDE%u4E1C%2CHGH; _jc_save_toStation=%u9E70%u6F6D%2CYTG; _jc_save_fromDate=2021-02-05; _jc_save_toDate=2021-01-07; RAIL_EXPIRATION=1610279023669; RAIL_DEVICEID=q_50Q5qf-rp6oQmhlx9Rjtc4ozMqdgsN_WLSPuZBwmx4YEGF0Idq6LEpOzgtkWGzpJkHt_rdR8raVT1zgGYugDoNtctyLIsJO26acvsZuXwZ0SQZCSLeM0W8yRWR7mXkxOgopwbJh420AlYgZrgWS6cqjGT4ltpn; BIGipServerotn=837812746.50210.0000; BIGipServerportal=3067347210.16671.0000'
        }
    });
    if (result.data.data && result.data.data.result.length) {
        sendMail({
            from: '"乔乔乔小助手" <shuhaozhushou@163.com>',
            to: 'sunbridger@sina.com',
            subject: '来看看微博今日热点榜单都有哪些吧～',
            html: `${time}可以开始抢票啦`
        });
        stopSend = true;
        nowTime = getDayNumber();
    } else {
        stopSend = false;
    }
}

module.exports = app => {
    return {
        schedule: {
            interval: '60s',
            type: 'worker'
            immediate: true
        },
        async task(ctx) {
            // 12306 爬取接口数据
            checkCarTicket(ctx);
        }
    }
};
