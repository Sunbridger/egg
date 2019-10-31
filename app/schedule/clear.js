module.exports = {
    schedule: {
      interval: '60m', // 1 分钟间隔
      type: 'all', // 指定所有的 worker 都需要执行
      immediate: true
    },
    async task(ctx) {
        ctx.logger.info('定时器任务执行了');
    }
};