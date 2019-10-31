'use strict';

module.exports = app => {
    const { router, controller } = app;
    router.get('/', controller.user.get);
    router.get('/add', controller.user.create);
};
