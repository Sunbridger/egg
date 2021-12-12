const lovePicsIcon = 'https://img.souche.com/f2e/0b0f755e8e57683c3281102c99c7013f.jpg';

const qiaoBarkURL = 'BkXhvz8ctcMK3nRxsWKXdG';

const minwenBarkURL = 'L8cz9PUpbfuCKn2H9DXYZH';

// 获取情话文案
const getWhispers = async () => {

}

module.exports = app => {
    return {
        schedule: {
            cron: '0 30 9 * * *',
            type: 'worker',
            immediate: true,
        },
        async task(ctx) {
          const textWhispers= await ctx.curl('https://api.vvhan.com/api/love?type=json');
          console.log(textWhispers, '-textWhispers-')
          await ctx.curl(`https://api.day.app/${qiaoBarkURL}/亲爱的文文宝贝：${textWhispers}?icon=${lovePicsIcon}`);
        }
    }
};
