'use strict';

module.exports = app => {
    const { router, controller } = app;
    router.get('/', controller.users.index);
    router.get('/add', controller.users.create);
};
