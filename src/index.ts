import { Context, Telegraf } from 'telegraf';
import scrape from './scraper';

const config = require('../config.json');

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
bot.command('regioni', async ctx =>
  scrape()
    .then(res => ctx.reply(res))
    .catch(err => console.error(err))
);
bot.launch().catch(err => {
  console.error(err);
});

console.log('Bot started!');
