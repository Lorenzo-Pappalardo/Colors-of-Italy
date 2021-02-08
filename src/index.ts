import { Context, Telegraf } from 'telegraf';
const config = require('../config.json');
import scrape from './scraper';

const bot: Telegraf<Context> = new Telegraf(config.BOT_TOKEN);
bot.use(async (ctx: Context, next: Function) => {
  const start: Date = new Date();
  await next();
  const ms = new Date().getTime() - start.getTime();
  console.log('Response time: %sms', ms);
});
bot.start(ctx =>
  ctx.replyWithSticker('CAACAgIAAxkBAAIClV_g6QGPC23_jVb-FMy_YWbJ_XlEAAJvAAPb234AAZlbUKh7k4B0HgQ')
);
bot.hears(['Hi', 'hi', 'Hello', 'hello'], ctx => ctx.reply('Hey xD'));
bot.command('news', async ctx => await scrape().then(res => ctx.reply(res.join('\n\n'))));
bot.launch();

console.log('Bot started!');
