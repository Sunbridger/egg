'use strict';

module.exports = app => {
    const { router, controller } = app;
    // router.get('/', controller.user.get);
    router.get('/add', controller.user.create);
    router.get('/me', controller.user.getme);
    router.get('/mall', controller.user.gettaobao);
    router.get('/getcap', controller.user.getcap);
    router.get('/getweibo', controller.user.getweibo);
    router.get('/gethot', controller.user.gethot);
    router.get('/getpriceAndName', controller.puppeteer.getpriceAndName);
    router.get('/getJDinfo', controller.puppeteer.getJDinfo);
    router.get('/deletetaobao', controller.user.deletetaobao);
    router.get('/todayhot', controller.user.todayhot);
    router.get('/getVirus', controller.user.getVirus);
    router.get('/sendEmail', controller.user.sendEmail);
    router.get('/getAllHots', controller.user.getAllHots);
};
