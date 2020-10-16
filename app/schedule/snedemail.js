const sequelize = require('sequelize');
const sendMail = require('../core/sendEmail');
const Op = sequelize.Op;

module.exports = app => {
    return {
        schedule: {
            cron: '59 59 23 * * *',
            type: 'worker',
            immediate: true
        },
        async task(ctx) {
            const result = await ctx.model.Hots.findAll({
                raw: true,
                where: {
                    created_at: {
                        [Op.gt]: sequelize.literal('CURRENT_DATE')
                    }
                },
                limit: 10,
                order: [['num', 'DESC']]
            });
            let html = '';

            let textForDing = '';

            result.forEach(row => {
                html += `<p style="margin-bottom: 5px;">${row.text} <span style="color: blue; margin-left: 10px">${row.num}</span></p>`;
                textForDing += `${row.text}  ${row.num} \n\n`;
            });
            sendMail({
                from: '"乔乔乔小助手" <shuhaozhushou@163.com>',
                to: 'sunbridger@sina.com',
                subject: '来看看微博今日热点榜单都有哪些吧～',
                html
            });

            await ctx.curl('https://oapi.dingtalk.com/robot/send?access_token=d07cd5b0ce7f7ad5aff5627f92086299ac29c79d9825b2ccbefcdffd9f9174ff', {
                contentType: 'json',
                method: 'POST',
                data: {
                    "msgtype": "markdown",
                    "markdown": {
                        "title":"微博热搜通知",
                        "text": textForDing
                    }
                }
            });

            ctx.model.Hots.destroy({
                where: {
                    num: {
                        [Op.lt]: 10
                    }
                }
            });
        }
    }
};
