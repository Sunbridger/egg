const sequelize = require('sequelize');
const sendMail = require('../core/sendEmail');
const Op = sequelize.Op;

module.exports = app => {
    return {
        schedule: {
            cron: '59 59 23 * * *',
            type: 'worker'
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
            result.forEach(row => {
                html += `<p style="margin-bottom: 5px;">${row.text} <span style="color: blue; margin-left: 10px">${row.num}</span></p>`
            });
            sendMail({
                from: '"乔乔乔小助手" <739272884@qq.com>',
                to: 'sunbridger@sina.com',
                subject: '来看看微博今日热点榜单都有哪些吧～',
                html
            });
            // ctx.model.Hots.destroy()
        }
    }
};
