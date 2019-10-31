'use strict';

module.exports = app => {
    const { router, controller } = app;
    // router.get('/', controller.home.look);
    router.resources('users', '/users', controller.users);
};
