import { BOT_KEY } from "@/constServer";
import { Bot, InlineKeyboard, webhookCallback } from "grammy";

const bot = new Bot(BOT_KEY);

bot.on("message:text", async (ctx) => {
  //const chatId = ctx.chat.id;
  const text = ctx.message.text;
  const lang = ctx.from.language_code;
  const imgUrl: string = "https://free-cup-tg.vercel.app/images/cup_c_e.png";
  const description: string = `${lang} Hello, I am a bot. I can do anything you want me to. Just send me a message and I'll reply you!`;
  const btnText: string = "FreeCup";

  if (text === "/start") {
    await ctx.replyWithPhoto(imgUrl, {
      caption: description,
      reply_markup: {
        inline_keyboard: [
          [
            {
              text: btnText,
              web_app: {
                url: "https://free-cup-tg.vercel.app",
              },
            },
          ],
        ],
      },
    });
    return;
  }

  if (text === "/link") {
    await ctx.reply("FreeCup: ", {
      reply_markup: new InlineKeyboard().url(
        "Android version",
        "https://free-cup-tg.vercel.app"
      ),
    });
    return;
  }

  await ctx.reply(ctx.message.text);
});

export const POST = webhookCallback(bot, "std/http");
