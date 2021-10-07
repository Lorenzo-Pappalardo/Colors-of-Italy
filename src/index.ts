import { Context, Telegraf } from 'telegraf';
import scrape from './scraper';

const token = process.env.TOKEN || 'UNDEFINED';

if (token === 'UNDEFINED') {
  console.log("You must define a 'TOKEN' environment variable that holds the bot's token");
} else {
  const bot: Telegraf<Context> = new Telegraf(token);

  bot.use(async (ctx: Context, next: Function) => {
    const start: Date = new Date();
    await next();
    const ms = new Date().getTime() - start.getTime();
    console.log('Response time: %sms', ms);
  });

  bot.start(ctx =>
    ctx.replyWithSticker('CAACAgIAAxkBAAIClV_g6QGPC23_jVb-FMy_YWbJ_XlEAAJvAAPb234AAZlbUKh7k4B0HgQ')
  );

  bot.hears(['Ciao', 'Hi', 'hi', 'Hello', 'hello'], ctx => ctx.reply('Hey xD'));

  bot.command('regioni', async ctx =>
    scrape()
      .then(res => ctx.replyWithMarkdownV2(res))
      .catch(err => console.error(err))
  );

  bot.launch().catch(err => {
    console.error(err);
  });

  console.log('Bot started!');

  process.once('SIGINT', () => bot.stop('SIGINT'));
  process.once('SIGTERM', () => bot.stop('SIGTERM'));
}
