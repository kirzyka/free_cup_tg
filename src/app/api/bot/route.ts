import { Bot, Context, webhookCallback } from "grammy";
import { BOT_KEY } from "@/constServer";
import { BotCommand } from "./BotCommand";
import { Botmessage } from "./BotMessage";
import { botMainView } from "@/component/bot/view/main/BotMainView";
import { botInstructionsMainView } from "@/component/bot/view/instructions/BotInstructionsMainView";
import { botInstructionsBaristaView } from "@/component/bot/view/instructions/BotInstructionsBaristaView";
import { botInstructionsClientView } from "@/component/bot/view/instructions/BotInstructionsClientView";
import { botInstructionsSecurityView } from "@/component/bot/view/instructions/BotInstructionsSecurityView";
import { botOfflineView } from "@/component/bot/view/offline/BotOfflineView";

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

    switch (callbackData) {
        case BotCommand.SHOW_INSTRUCTIONS_MAIN:
            await botInstructionsMainView(ctx);
            break;
        case BotCommand.SHOW_INSTRUCTIONS_BARISTA:
            await botInstructionsBaristaView(ctx);
            break;
        case BotCommand.SHOW_INSTRUCTIONS_CLIENT:
            await botInstructionsClientView(ctx);
            break;
        case BotCommand.SHOW_INSTRUCTIONS_SECURITY:
            await botInstructionsSecurityView(ctx);
            break;
        case BotCommand.SHOW_MAIN:
            await botMainView(ctx);
            break;
        case BotCommand.SHOW_OFFLINE:
            await botOfflineView(ctx);
            break;
    }
});

export const POST = webhookCallback(bot, "std/http");
