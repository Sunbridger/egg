const nodemailer = require('nodemailer');
const sequelize = require('sequelize');
const Op = sequelize.Op;

let transporter = nodemailer.createTransport({
  service: 'QQ',
  port: 465,
  secureConnection: true,
  auth: {
    user: '739272884@qq.com',
    pass: 'jnbofdxrorzcbdid',
  }
});

let mailOptions = {
    from: '"乔乔乔小助手" <739272884@qq.com>', // sender address
    to: 'sunbridger@sina.com', // list of receivers
    subject: '来看看微博今日热点榜单都有哪些吧～',
    html: ''
};



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
            result.forEach(row => {
                mailOptions.html += `<p style="margin-bottom: 5px;">${row.text} <span style="color: blue; margin-left: 10px">${row.num}</span></p>`
            });
            transporter.sendMail(mailOptions, error => {
                error && ctx.logger.info(error.stack, '---发送邮件错误！');
            });
            // ctx.model.Hots.destroy()
        }
    }
};
