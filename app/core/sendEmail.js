const nodemailer = require('nodemailer');

let transporter = nodemailer.createTransport({
    service: '163',
    port: 465,
    secureConnection: true,
    auth: {
        user: 'shuhaozhushou@163.com',
        pass: 'QAWqaw123',
    }
});

//   let mailOptions = {
//       from: '"乔乔乔小助手" <739272884@qq.com>', // sender address
//       to: 'sunbridger@sina.com', // list of receivers
//       subject: '来看看微博今日热点榜单都有哪些吧～',
//       html: ''
//   };

module.exports = (mailOptions) => {
    transporter.sendMail(mailOptions, error => {
        error && console.log(error.stack, '---发送邮件错误！');
    });
}
