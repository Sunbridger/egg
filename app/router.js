'use strict';

module.exports = app => {
    const { router, controller } = app;
    router.get('/', controller.user.get);
    router.get('/add', controller.user.create);
    router.get('/me', controller.user.getme);
    router.get('/mall', controller.user.gettaobao);
};
