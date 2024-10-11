import { Bot, Context, webhookCallback } from "grammy";
import { BOT_KEY } from "@/constServer";
import { BotCommand } from "./BotCommand";
import { Botmessage } from "./BotMessage";
import { botMainView } from "@/component/bot/view/main/BotMainView";
import { botInstructionsView } from "@/component/bot/view/instructions/BotInstructionsView";

const bot = new Bot(BOT_KEY);

bot.on("message:text", async (ctx: Context) => {
  const text = ctx.message?.text || Botmessage.START;

  if (text === Botmessage.START) {
    await botMainView(ctx);
    return;
  }
  /*
  if (text === "/link") {
    await ctx.reply("FreeCup: ", {
      reply_markup: new InlineKeyboard().url(
        "Android version",
        "https://free-cup-tg.vercel.app"
      ),
    });
    return;
  }
  */

  await botMainView(ctx);
});

bot.on("callback_query:data", async (ctx) => {
  const callbackData = ctx.callbackQuery.data;
  
  if (callbackData === BotCommand.SHOW_INSTRUCTION) {
    await botInstructionsView(ctx);
  }
});

export const POST = webhookCallback(bot, "std/http");
