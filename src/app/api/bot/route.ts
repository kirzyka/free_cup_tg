export const dynamic = 'force-dynamic';
export const fetchCache = 'force-no-store';

import { BOT_KEY } from '@/constant';
import { Bot, webhookCallback } from 'grammy';

const bot = new Bot(BOT_KEY);

bot.on('message:text', async (ctx) => {
  await ctx.reply(ctx.message.text);
})

export const POST = webhookCallback(bot, 'std/http');