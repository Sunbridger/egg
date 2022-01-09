const lovePicsIcon = 'https://img.souche.com/f2e/0b0f755e8e57683c3281102c99c7013f.jpg';

const qiaoBarkURL = 'BkXhvz8ctcMK3nRxsWKXdG';

const minwenBarkURL = 'L8cz9PUpbfuCKn2H9DXYZH';

module.exports = app => {
    return {
        schedule: {
            cron: '0 30 9 * * *',
            type: 'worker',
            immediate: false,
        },
        async task(ctx) {
          const { data: { ishan: textWhispers } }  = await ctx.curl('https://api.vvhan.com/api/love?type=json', {
             // 自动解析 JSON response
             dataType: 'json',
             // 10 秒超时
             timeout: 10000,
           });
	console.log(textWhispers, '-textWhispers-')
          await ctx.curl(`https://api.day.app/${minwenBarkURL}/亲爱的文文宝贝：${textWhispers}?icon=${lovePicsIcon}`);
        }
    }
};