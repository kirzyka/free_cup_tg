import { ROOT_URL } from "@/constClient";
import { BOT_KEY } from "@/constServer";
//import { getTranslationFn } from "@/i18n/LocalizationProvider";
import { Bot, webhookCallback } from "grammy";

const bot = new Bot(BOT_KEY);

bot.on("message:text", async (ctx) => {
  //const chatId = ctx.chat.id;
  const text = ctx.message.text;
  const lang = ctx.from.language_code;
  //const t = getTranslationFn(lang); 

  if (text === "/start") {
    const imgUrl: string = "https://free-cup-tg.vercel.app/images/cup_c_e.png";
    const btnText: string = "FreeCup";

    await ctx.replyWithPhoto(imgUrl, {
      caption: lang,// t("BOT_START_DESCRIPTION"),
      reply_markup: {
        inline_keyboard: [
          [
            {
              text: btnText,
              web_app: {
                url: ROOT_URL,
              },
            },
          ],
        ],
      },
    });
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

  await ctx.reply(ctx.message.text);
});

export const POST = webhookCallback(bot, "std/http");
