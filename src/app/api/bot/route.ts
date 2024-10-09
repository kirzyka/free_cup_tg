//export const dynamic = 'force-dynamic';
//export const fetchCache = 'force-no-store';

import { BOT_KEY } from '@/constServer';
import { Bot, InlineKeyboard, webhookCallback } from 'grammy';

const bot = new Bot(BOT_KEY);

bot.on('message:text', async (ctx) => {
  const chatId = ctx.chat.id;
  const text = ctx.message.text;

  if (text === '/start') {
    await ctx.reply('Hello, I am a bot. I can do anything you want me to. Just send me a message and I\'ll reply you!');
    return;
  }

  if (text === '/stop') {
    await ctx.reply('Bye!');
    bot.stop();
    return;
  }

  if (text === '/chat') {
    await ctx.reply(`Your chat id: ${chatId}`);
    return;
  }

  if (text === '/link') {
    await ctx.reply('FreeCup: ', {
      reply_markup: new InlineKeyboard().url('Link', 'https://free-cup-tg.vercel.app'),
    });
    return;
  }

  await ctx.reply(ctx.message.text);
})

export const POST = webhookCallback(bot, 'std/http');