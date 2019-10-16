module.exports = {
    schedule: {
      interval: '5s', // 1 分钟间隔
      type: 'all', // 指定所有的 worker 都需要执行
      immediate: true
    },
    async task(ctx) {
        console.log(1, '------- 定时器任务-----');
    }
};